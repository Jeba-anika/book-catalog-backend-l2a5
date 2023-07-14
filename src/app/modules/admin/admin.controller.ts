import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { AdminService } from './admin.service'
import sendResponse from '../../../shared/sendResponse'
import { IAdmin } from './admin.interface'
import config from '../../../config'

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const { ...adminData } = req.body
  const result = await AdminService.createAdmin(adminData)
  sendResponse<Partial<IAdmin>>(res, {
    statusCode: 200,
    success: true,
    message: 'Admin created successfully',
    data: result,
  })
})

const adminLogin = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body
  const result = await AdminService.adminLogin(loginData)
  const { refreshToken, ...others } = result
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  }

  res.cookie('refreshToken', refreshToken, cookieOptions)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Admin Logged In Successfully',
    data: others,
  })
})

const adminRefreshToken = catchAsync(async (req: Request, res: Response) => {
  console.log(req.cookies)
  const { refreshToken } = req.cookies
  const result = await AdminService.refreshAdminToken(refreshToken)

  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  }

  res.cookie('refreshToken', refreshToken, cookieOptions)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Admin Logged In Successfully',
    data: result,
  })
})

const getAdminProfile = catchAsync(async (req: Request, res: Response) => {
  const userInfo = req.user
  const result = await AdminService.getAdminProfile(userInfo)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Admin profile retrieved successfully',
    data: result,
  })
})

const updateAdminProfile = catchAsync(async (req: Request, res: Response) => {
  const userInfo = req.user
  const updatedProfile = req.body
  const result = await AdminService.updateAdminProfile(userInfo, updatedProfile)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Admin's information updated successfully",
    data: result,
  })
})

export const AdminController = {
  createAdmin,
  adminLogin,
  adminRefreshToken,
  getAdminProfile,
  updateAdminProfile,
}
