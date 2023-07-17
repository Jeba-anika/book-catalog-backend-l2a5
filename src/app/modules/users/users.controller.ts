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

const getUser = catchAsync(async (req: Request, res: Response) => {
  const userInfo = req.user

  const result = await UserService.getUser(userInfo)

  sendResponse<IUser>(res, {
    statusCode: 200,
    success: true,
    message: 'User fetched successfully !',
    data: result,
  })
})

export const UserController = {
  createUser,
  userLogin,
  userRefreshToken,
  getUser,
}
