import { IGenericErrorMessage } from './error'

export type IGenericErrorResponse = {
  statusCode: number
  message: string
  errorMessages: IGenericErrorMessage[]
}

export type IGenericResponse<T> = {
  meta: {
    page?: number
    limit: number
    total: number
  }
  data: T
}

export type IGenericLoginInfo = {
  email: string
  password: string
}
export type IGenericLoginResponse = {
  accessToken: string
  refreshToken?: string
}

export type IGenericRefreshTokenResponse = {
  accessToken: string
}
