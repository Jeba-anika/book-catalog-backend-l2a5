import { JwtPayload, Secret } from 'jsonwebtoken'
import config from '../../../config'
import ApiError from '../../../errors/ApiError'
import { jwtHelpers } from '../../../helpers/jwtHelpers'
import {
  IGenericLoginInfo,
  IGenericLoginResponse,
  IGenericRefreshTokenResponse,
} from '../../../interfaces/common'
import { IAdmin } from './admin.interface'
import { Admin } from './admin.model'
import bcrypt from 'bcrypt'

const createAdmin = async (payload: IAdmin): Promise<Partial<IAdmin>> => {
  const result = await Admin.create(payload)
  // eslint-disable-next-line no-unused-vars
  const { password, ...others } = result.toObject()
  return others
}

const adminLogin = async (
  payload: IGenericLoginInfo
): Promise<IGenericLoginResponse> => {
  const { phoneNumber, password } = payload
  const isAdminExist = await Admin.isAdminExist(phoneNumber)
  if (!isAdminExist) {
    throw new ApiError(404, 'Admin does not exist')
  }
  if (
    isAdminExist.password &&
    !(await Admin.isPasswordMatched(password, isAdminExist?.password))
  ) {
    throw new ApiError(401, 'Password is incorrect')
  }

  const { _id, role } = isAdminExist
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

const refreshAdminToken = async (
  token: string
): Promise<IGenericRefreshTokenResponse> => {
  let verifiedToken = null
  try {
    verifiedToken = await jwtHelpers.verifyToken(
      token,
      config.jwt.jwt_refresh_secret as Secret
    )
  } catch (err) {
    throw new ApiError(403, 'Invalid Refresh token')
  }

  const { _id } = verifiedToken
  const isAdminExist = await Admin.findOne({ _id })
  if (!isAdminExist) {
    throw new ApiError(404, 'User does not exist')
  }
  const newAccessToken = jwtHelpers.createToken(
    {
      _id: isAdminExist._id,
      role: isAdminExist.role,
    },
    config.jwt.jwt_secret as Secret,
    config.jwt.jwt_expires_in as string
  )

  return {
    accessToken: newAccessToken,
  }
}

const getAdminProfile = async (
  userInfo: JwtPayload | null
): Promise<IAdmin | null> => {
  const adminProfile = await Admin.findOne({
    _id: userInfo?._id,
  })
  return adminProfile
}

const updateAdminProfile = async (
  userInfo: JwtPayload | null,
  updatedData: Partial<IAdmin>
) => {
  if (updatedData.password) {
    updatedData.password = await bcrypt.hash(
      updatedData.password,
      Number(config.bcrypt_salt_rounds)
    )
  }
  const result = await Admin.findByIdAndUpdate(
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

export const AdminService = {
  createAdmin,
  adminLogin,
  refreshAdminToken,
  getAdminProfile,
  updateAdminProfile,
}
