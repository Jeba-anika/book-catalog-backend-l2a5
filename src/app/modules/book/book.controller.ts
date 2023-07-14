import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { IBook } from './book.interface'
import { BookService } from './book.service'
import pick from '../../../shared/pick'
import { cowFilterableFields } from './book.constants'
import { paginationFields } from '../../../constants/pagination'

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

const getSingleBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await BookService.getSingleBook(id)
  sendResponse<IBook>(res, {
    statusCode: 200,
    success: true,
    message: 'Book retrieved successfully',
    data: result,
  })
})

const updateBook = catchAsync(async (req: Request, res: Response) => {
  const ownerInfo = req.user
  const id = req.params.id

  const updatedBook = req.body
  const result = await BookService.updateBook(id, updatedBook, ownerInfo)
  sendResponse<IBook>(res, {
    statusCode: 200,
    success: true,
    message: 'Book edited successfully',
    data: result,
  })
})

const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const ownerInfo = req.user
  const result = await BookService.deleteBook(id, ownerInfo)
  sendResponse<IBook>(res, {
    statusCode: 200,
    success: true,
    message: 'Cow deleted successfully',
    data: result,
  })
})

export const BookController = {
  createBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
}
