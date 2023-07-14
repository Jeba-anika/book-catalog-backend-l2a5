import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { IBook } from './book.interface'
import { BookService } from './book.service'
import pick from '../../../shared/pick'
import { cowFilterableFields } from './book.constants'
import { paginationFields } from '../../../constants/pagination'
import ApiError from '../../../errors/ApiError'

const createBook = catchAsync(async (req: Request, res: Response) => {
  const userInfo = req.user
  const { ...bookData } = req.body
  const result = await BookService.createBook(bookData, userInfo)
  sendResponse<IBook>(res, {
    success: true,
    message: 'Book created successfully',
    statusCode: 200,
    data: result,
  })
})

const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, cowFilterableFields)
  const paginationOptions = pick(req.query, paginationFields)
  const result = await BookService.getAllBooks(filters, paginationOptions)
  sendResponse<IBook[]>(res, {
    statusCode: 200,
    success: true,
    message: 'Books retrieved successfully',
    data: result.data,
    meta: result.meta,
  })
})

// const getSingleCow = catchAsync(async (req: Request, res: Response) => {
//   const id = req.params.id
//   const result = await CowService.getSingleCow(id)
//   sendResponse<ICow>(res, {
//     statusCode: 200,
//     success: true,
//     message: 'Cow retrieved successfully',
//     data: result,
//   })
// })

// const updateCow = catchAsync(async (req: Request, res: Response) => {
//   const sellerInfo = req.user
//   const id = req.params.id

//   const updatedCow = req.body
//   const result = await CowService.updateCow(id, updatedCow, sellerInfo)
//   sendResponse<ICow>(res, {
//     statusCode: 200,
//     success: true,
//     message: 'Cow updated successfully',
//     data: result,
//   })
// })

// const deleteCow = catchAsync(async (req: Request, res: Response) => {
//   const id = req.params.id
//   const sellerInfo = req.user
//   const result = await CowService.deleteCow(id, sellerInfo)
//   sendResponse<ICow>(res, {
//     statusCode: 200,
//     success: true,
//     message: 'Cow deleted successfully',
//     data: result,
//   })
// })

export const BookController = {
  createBook,
  getAllBooks,
}
