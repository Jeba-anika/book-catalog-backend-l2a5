import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { ICow } from './cow.interface'
import { CowService } from './cow.service'
import pick from '../../../shared/pick'
import { cowFilterableFields } from './cow.constants'
import { paginationFields } from '../../../constants/pagination'

const createCow = catchAsync(async (req: Request, res: Response) => {
  const { ...cowData } = req.body
  const result = await CowService.createCow(cowData)
  sendResponse<ICow>(res, {
    success: true,
    message: 'Cow created successfully',
    statusCode: 200,
    data: result,
  })
})

const getAllCows = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, cowFilterableFields)
  const paginationOptions = pick(req.query, paginationFields)
  const result = await CowService.getAllCows(filters, paginationOptions)
  sendResponse<ICow[]>(res, {
    statusCode: 200,
    success: true,
    message: 'Cows retrieved successfully',
    data: result.data,
    meta: result.meta,
  })
})

const getSingleCow = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await CowService.getSingleCow(id)
  sendResponse<ICow>(res, {
    statusCode: 200,
    success: true,
    message: 'Cow retrieved successfully',
    data: result,
  })
})

const updateCow = catchAsync(async (req: Request, res: Response) => {
  const sellerInfo = req.user
  const id = req.params.id

  const updatedCow = req.body
  const result = await CowService.updateCow(id, updatedCow, sellerInfo)
  sendResponse<ICow>(res, {
    statusCode: 200,
    success: true,
    message: 'Cow updated successfully',
    data: result,
  })
})

const deleteCow = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const sellerInfo = req.user
  const result = await CowService.deleteCow(id, sellerInfo)
  sendResponse<ICow>(res, {
    statusCode: 200,
    success: true,
    message: 'Cow deleted successfully',
    data: result,
  })
})

export const CowController = {
  createCow,
  getAllCows,
  getSingleCow,
  updateCow,
  deleteCow,
}
