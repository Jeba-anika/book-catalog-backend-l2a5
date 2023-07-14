import { Model, ObjectId, Types } from 'mongoose'
import { ICow } from '../cow/cow.interface'
import { IUser } from '../users/users.interface'

export type IOrder = {
  cow: Types.ObjectId | ICow
  buyer: Types.ObjectId | IUser
}

export type OrderModel = Model<IOrder, object>
export type IUserInfo = {
  _id: ObjectId
  role: string
}
