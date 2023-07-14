import mongoose from 'mongoose'
import ApiError from '../../../errors/ApiError'
import { User } from '../users/users.model'
import { IOrder, IUserInfo } from './orders.interface'
import { Cow } from '../book/book.model'
import { Order } from './orders.model'
import { JwtPayload } from 'jsonwebtoken'
import { IUser } from '../users/users.interface'

const createOrder = async (order: IOrder) => {
  const buyerInfo: IUser | null = await User.findById(order.buyer)
  const cowInfo = await Cow.findById(order.cow)
  const sellerInfo = await User.findById(cowInfo?.seller)
  if (cowInfo?.label === 'sold out') {
    throw new ApiError(500, `The cow ${cowInfo.name} is sold out`)
  }

  if (Number(cowInfo?.price) > Number(buyerInfo?.budget)) {
    throw new ApiError(400, 'You do not have enough budget to buy this cow.')
  }

  let newOrderData = null
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    const newOrder = await Order.create([order], { session })
    if (!newOrder.length) {
      throw new ApiError(500, 'Failed to create order')
    }
    const updatedCowInfo = {
      label: 'sold out',
    }
    await Cow.findOneAndUpdate({ _id: order.cow }, updatedCowInfo)
    const updatedBuyerInfo = {
      budget: Number(buyerInfo?.budget) - Number(cowInfo?.price),
    }
    await User.findOneAndUpdate({ _id: order.buyer }, updatedBuyerInfo)
    const updatedSellerInfo = {
      income: Number(sellerInfo?.income) + Number(cowInfo?.price),
    }

    // eslint-disable-next-line no-unused-vars
    const updatedSeller = await User.findOneAndUpdate(
      {
        _id: sellerInfo?._id,
      },
      updatedSellerInfo
    )
    newOrderData = newOrder[0]
    await session.commitTransaction()
    await session.endSession()
  } catch (err) {
    await session.abortTransaction()
    await session.endSession()
    throw err
  }

  if (newOrderData) {
    newOrderData = await Order.findOne({ _id: newOrderData._id })
      .populate('cow')
      .populate('buyer')
  }
  return newOrderData
}

const getAllOrders = async (): Promise<IOrder[] | null> => {
  const result = await Order.find({}).populate('buyer').populate('cow')
  return result
}

const getSingleOrder = async (
  id: string,
  userInfo: JwtPayload | null | IUserInfo
): Promise<IOrder | null> => {
  const selectedOrder = await Order.findOne({ _id: userInfo?._id })
  if (userInfo?.role === 'buyer') {
    if (selectedOrder?.buyer.toString() !== userInfo?._id) {
      throw new ApiError(403, 'Forbidden')
    }
  }
  if (userInfo?.role === 'seller') {
    const selectedCow = await Cow.findOne({ _id: selectedOrder?.cow })
    if (selectedCow && selectedCow.seller.toString() !== userInfo?._id) {
      throw new ApiError(403, 'Forbidden')
    }
  }
  const result = await Order.findOne({ _id: id })
    .populate('buyer')
    .populate({
      path: 'cow',
      populate: [
        {
          path: 'seller',
        },
      ],
    })
  return result
}

export const OrderService = {
  createOrder,
  getAllOrders,
  getSingleOrder,
}
