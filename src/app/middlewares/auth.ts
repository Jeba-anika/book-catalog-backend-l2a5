import { NextFunction, Request, Response } from 'express'
import ApiError from '../../errors/ApiError'
import { jwtHelpers } from '../../helpers/jwtHelpers'
import config from '../../config'
import { Secret } from 'jsonwebtoken'

const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization
      if (!token) {
        throw new ApiError(401, 'Unauthorized access')
      }

      let verifiedUser = null
      verifiedUser = await jwtHelpers.verifyToken(
        token,
        config.jwt.jwt_secret as Secret
      )
      console.log(verifiedUser)
      req.user = verifiedUser
      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        throw new ApiError(403, 'Forbidden')
      }
      next()
    } catch (error) {
      next(error)
    }
  }

export default auth
