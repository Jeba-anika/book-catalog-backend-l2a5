import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { IUser } from './users.interface'
import { UserService } from './users.service'
import config from '../../../config'
import { IGenericLoginResponse } from '../../../interfaces/common'

const createUser = catchAsync(async (req: Request, res: Response) => {
  const { ...userData } = req.body
  const result = await UserService.createUser(userData)
  sendResponse<Partial<IUser>>(res, {
    statusCode: 200,
    success: true,
    message: 'User created successfully',
    data: result,
  })
})

const getUserProfile = catchAsync(async (req: Request, res: Response) => {
  const userInfo = req.user
  const result = await UserService.getUserProfile(userInfo)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User's information retrieved successfully",
    data: result,
  })
})
const updateUserProfile = catchAsync(async (req: Request, res: Response) => {
  const userInfo = req.user
  const updatedProfile = req.body
  const result = await UserService.updateUserProfile(userInfo, updatedProfile)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User's information updated successfully",
    data: result,
  })
})

const userLogin = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body
  const result = await UserService.userLogin(loginData)
  const { refreshToken, ...others } = result
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  }
  res.cookie('refreshToken', refreshToken, cookieOptions)
  sendResponse<Partial<IGenericLoginResponse>>(res, {
    statusCode: 200,
    success: true,
    message: 'User Logged In successfully',
    data: others,
  })
})

const userRefreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies
  const result = await UserService.userRefreshToken(refreshToken)
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  }
  res.cookie('refreshToken', refreshToken, cookieOptions)
  sendResponse<Partial<IGenericLoginResponse>>(res, {
    statusCode: 200,
    success: true,
    message: 'User Logged In successfully',
    data: result,
  })
})

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getAllUsers()
  sendResponse<IUser[]>(res, {
    statusCode: 200,
    success: true,
    message: 'Users retrieved successfully',
    data: result,
  })
})

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await UserService.getSingleUser(id)
  sendResponse<IUser>(res, {
    statusCode: 200,
    success: true,
    message: 'User retrieved successfully',
    data: result,
  })
})

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const updateUser = req.body
  const result = await UserService.updateUser(id, updateUser)
  sendResponse<IUser>(res, {
    statusCode: 200,
    success: true,
    message: 'User updated successfully',
    data: result,
  })
})

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await UserService.deleteUser(id)
  sendResponse<IUser>(res, {
    statusCode: 200,
    success: true,
    message: 'User deleted successfully',
    data: result,
  })
})

export const UserController = {
  createUser,
  getSingleUser,
  getAllUsers,
  updateUser,
  deleteUser,
  userLogin,
  userRefreshToken,
  getUserProfile,
  updateUserProfile,
}
