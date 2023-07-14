import { SortOrder } from 'mongoose'
import { paginationHelpers } from '../../../helpers/paginationHelpers'
import { IpaginationOptions } from '../../../interfaces/pagination'
import { bookSearchableFields } from './book.constants'
import { IBook, IBookFilters } from './book.interface'
import { Book } from './book.model'
import { IGenericResponse } from '../../../interfaces/common'
import ApiError from '../../../errors/ApiError'
import { JwtPayload } from 'jsonwebtoken'
import { IUser } from '../users/users.interface'

const createBook = async (
  payload: IBook,
  userInfo: JwtPayload | null
): Promise<IBook> => {
  console.log(userInfo)
  if (!userInfo) {
    throw new ApiError(401, 'Unauthorized access')
  }
  const result = await Book.create(payload)
  return result
}

const getAllBooks = async (
  filters: IBookFilters,
  paginationOptions: IpaginationOptions
): Promise<IGenericResponse<IBook[]>> => {
  const { searchTerm, ...filtersData } = filters
  const andConditions = []
  if (searchTerm) {
    andConditions.push({
      $or: bookSearchableFields.map(field => ({
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

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions)
  const sortConditions: { [key: string]: SortOrder } = {}
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }

  const whereCondition = andConditions.length > 0 ? { $and: andConditions } : {}

  const result = await Book.find(whereCondition)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)

  const total = await Book.countDocuments()
  return {
    data: result,
    meta: {
      page,
      limit,
      total,
    },
  }
}

// const getSingleCow = async (id: string): Promise<ICow | null> => {
//   const result = await Cow.findById(id).populate('seller')
//   return result
// }

// const updateCow = async (
//   id: string,
//   updatedData: Partial<ICow>,
//   sellerInfo: JwtPayload | null
// ): Promise<ICow | null> => {
//   const selectedCow = await Cow.findOne({ _id: id, seller: sellerInfo?._id })
//   if (!selectedCow) {
//     throw new ApiError(401, 'Unauthorized access')
//   }
//   const result = await Cow.findOneAndUpdate({ _id: id }, updatedData, {
//     new: true,
//   }).populate('seller')
//   return result
// }

// const deleteCow = async (id: string, sellerInfo: JwtPayload | null) => {
//   const selectedCow = await Cow.findOne({ _id: id, seller: sellerInfo?._id })
//   if (!selectedCow) {
//     throw new ApiError(401, 'Unauthorized access')
//   }
//   const result = await Cow.findOneAndDelete(
//     { _id: id },
//     {
//       new: true,
//     }
//   )
//   return result
// }

export const BookService = {
  createBook,
  getAllBooks,
}
