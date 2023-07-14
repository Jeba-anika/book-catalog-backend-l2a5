import { JwtPayload, Secret } from 'jsonwebtoken'
import config from '../../../config'
import ApiError from '../../../errors/ApiError'
import { jwtHelpers } from '../../../helpers/jwtHelpers'
import {
  IGenericLoginInfo,
  IGenericLoginResponse,
} from '../../../interfaces/common'
import { IUser } from './users.interface'
import { User } from './users.model'
import bcrypt from 'bcrypt'

const createUser = async (payload: IUser): Promise<Partial<IUser>> => {
  if (payload.role === 'seller') {
    payload.budget = 0
    payload.income = payload.income ? payload.income : 0
  } else if (payload.role === 'buyer') {
    if (!payload.budget) {
      throw new ApiError(400, 'Budget is required for buyer')
    }
    payload.income = 0
  }
  const result = await User.create(payload)
  // eslint-disable-next-line no-unused-vars
  const { password, ...others } = result.toObject()
  return others
}

const getUserProfile = async (
  userInfo: JwtPayload | null
): Promise<Partial<IUser> | null> => {
  const result = await User.findOne(
    { _id: userInfo?._id },
    { name: 1, phoneNumber: 1, address: 1 }
  )
  return result
}

const userLogin = async (
  payload: IGenericLoginInfo
): Promise<IGenericLoginResponse> => {
  const { phoneNumber, password } = payload
  const isUserExist = await User.isUserExist(phoneNumber)
  if (!isUserExist) {
    throw new ApiError(404, 'User does not exist')
  }

  if (
    isUserExist.phoneNumber &&
    !(await User.isPasswordMatched(password, isUserExist.password))
  ) {
    throw new ApiError(401, 'Password is incorrect')
  }

  const { _id, role } = isUserExist
  const accessToken = jwtHelpers.createToken(
    { _id, role },
    config.jwt.jwt_secret as Secret,
    config.jwt.jwt_expires_in as string
  )

  const refreshToken = jwtHelpers.createToken(
    { _id, role },
    config.jwt.jwt_refresh_secret as Secret,
    config.jwt.jwt_refresh_expires_in as string
  )
  return {
    accessToken,
    refreshToken,
  }
}

const userRefreshToken = async (
  token: string
): Promise<Partial<IGenericLoginResponse>> => {
  let verifiedToken = null
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.jwt_refresh_secret as Secret
    )
  } catch (err) {
    throw new ApiError(403, 'Invalid refresh token')
  }

  const { _id } = verifiedToken
  const isUserExist = await User.findOne({ _id })
  if (!isUserExist) {
    throw new ApiError(404, 'User does not exist')
  }

  const { _id: id, role } = isUserExist
  const newAccessToken = jwtHelpers.createToken(
    { id, role },
    config.jwt.jwt_secret as Secret,
    config.jwt.jwt_expires_in as string
  )
  return {
    accessToken: newAccessToken,
  }
}

const getAllUsers = async (): Promise<IUser[] | null> => {
  const result = await User.find({})
  return result
}

const getSingleUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findById(id)
  return result
}

const updateUser = async (
  id: string,
  updatedData: Partial<IUser>
): Promise<IUser | null> => {
  const result = await User.findOneAndUpdate({ _id: id }, updatedData, {
    new: true,
  })
  return result
}
const updateUserProfile = async (
  userInfo: JwtPayload | null,
  updatedData: Partial<IUser>
): Promise<Partial<IUser> | null> => {
  if (updatedData.password) {
    updatedData.password = await bcrypt.hash(
      updatedData.password,
      Number(config.bcrypt_salt_rounds)
    )
  }
  const result = await User.findByIdAndUpdate(
    { _id: userInfo?._id },
    updatedData,
    { new: true }
  )

  if (result !== null) {
    // eslint-disable-next-line no-unused-vars
    const { password, ...others } = result.toObject()
    return others
  } else {
    return result
  }
}

const deleteUser = async (id: string) => {
  const result = await User.findOneAndDelete(
    { _id: id },
    {
      new: true,
    }
  )
  return result
}

export const UserService = {
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
