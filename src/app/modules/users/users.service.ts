import { Secret } from 'jsonwebtoken'
import config from '../../../config'
import ApiError from '../../../errors/ApiError'
import { jwtHelpers } from '../../../helpers/jwtHelpers'
import {
  IGenericLoginInfo,
  IGenericLoginResponse,
} from '../../../interfaces/common'
import { IUser } from './users.interface'
import { User } from './users.model'

const createUser = async (payload: IUser): Promise<Partial<IUser>> => {
  const result = await User.create(payload)
  // eslint-disable-next-line no-unused-vars
  const { password, ...others } = result.toObject()
  return others
}

const userLogin = async (payload: IGenericLoginInfo): Promise<object> => {
  const { email: userEmail, password } = payload
  const isUserExist = await User.isUserExist(userEmail)
  if (!isUserExist) {
    throw new ApiError(404, 'User does not exist')
  }

  if (
    isUserExist.email &&
    !(await User.isPasswordMatched(password, isUserExist.password))
  ) {
    throw new ApiError(401, 'Password is incorrect')
  }

  const { _id, email, role } = isUserExist
  const accessToken = jwtHelpers.createToken(
    { _id, email, role },
    config.jwt.jwt_secret as Secret,
    config.jwt.jwt_expires_in as string
  )

  const refreshToken = jwtHelpers.createToken(
    { _id, email },
    config.jwt.jwt_refresh_secret as Secret,
    config.jwt.jwt_refresh_expires_in as string
  )
  return {
    accessToken,
    refreshToken,
    email,
    _id,
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

  const { _id: id, email, role } = isUserExist
  const newAccessToken = jwtHelpers.createToken(
    { id, email, role },
    config.jwt.jwt_secret as Secret,
    config.jwt.jwt_expires_in as string
  )
  return {
    accessToken: newAccessToken,
  }
}

export const UserService = {
  createUser,
  userLogin,
  userRefreshToken,
}
