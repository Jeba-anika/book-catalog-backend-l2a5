import { SortOrder } from 'mongoose'
import { paginationHelpers } from '../../../helpers/paginationHelpers'
import { IpaginationOptions } from '../../../interfaces/pagination'
import { cowSearchableFields } from './cow.constants'
import { ICow, ICowFilters } from './cow.interface'
import { Cow } from './cow.model'
import { IGenericResponse } from '../../../interfaces/common'
import ApiError from '../../../errors/ApiError'
import { JwtPayload } from 'jsonwebtoken'

const createCow = async (payload: ICow): Promise<ICow> => {
  const result = await Cow.create(payload)
  return result
}

const getAllCows = async (
  filters: ICowFilters,
  paginationOptions: IpaginationOptions
): Promise<IGenericResponse<ICow[]>> => {
  const { searchTerm, minPrice, maxPrice, ...filtersData } = filters
  const andConditions = []
  if (searchTerm) {
    andConditions.push({
      $or: cowSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }
  if (minPrice) {
    andConditions.push({
      price: { $gte: minPrice },
    })
  }
  if (maxPrice) {
    andConditions.push({
      price: { $lte: maxPrice },
    })
  }
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions)
  const sortConditions: { [key: string]: SortOrder } = {}
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }

  const whereCondition = andConditions.length > 0 ? { $and: andConditions } : {}

  const result = await Cow.find(whereCondition)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
    .populate('seller')
  const total = await Cow.countDocuments()
  return {
    data: result,
    meta: {
      page,
      limit,
      total,
    },
  }
}

const getSingleCow = async (id: string): Promise<ICow | null> => {
  const result = await Cow.findById(id).populate('seller')
  return result
}

const updateCow = async (
  id: string,
  updatedData: Partial<ICow>,
  sellerInfo: JwtPayload | null
): Promise<ICow | null> => {
  const selectedCow = await Cow.findOne({ _id: id, seller: sellerInfo?._id })
  if (!selectedCow) {
    throw new ApiError(401, 'Unauthorized access')
  }
  const result = await Cow.findOneAndUpdate({ _id: id }, updatedData, {
    new: true,
  }).populate('seller')
  return result
}

const deleteCow = async (id: string, sellerInfo: JwtPayload | null) => {
  const selectedCow = await Cow.findOne({ _id: id, seller: sellerInfo?._id })
  if (!selectedCow) {
    throw new ApiError(401, 'Unauthorized access')
  }
  const result = await Cow.findOneAndDelete(
    { _id: id },
    {
      new: true,
    }
  )
  return result
}

export const CowService = {
  createCow,
  getAllCows,
  getSingleCow,
  updateCow,
  deleteCow,
}
