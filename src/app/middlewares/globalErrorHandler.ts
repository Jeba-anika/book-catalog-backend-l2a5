/* eslint-disable no-unused-vars */
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express'
import { IGenericErrorMessage } from '../../interfaces/error'
import ApiError from '../../errors/ApiError'
import config from '../../config'
import handleValidationError from '../../errors/handleValidationError'
import handleCastError from '../../errors/handleCastError'

const globalErrorHandler: ErrorRequestHandler = (
  err,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500
  let message = 'Something went wrong'
  let errorMessages: IGenericErrorMessage[] = []

  if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessages
  } else if (err?.name === 'CastError') {
    const simplifiedError = handleCastError(err)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessages
  } else if (err?.code === 11000) {
    console.log(err)
    statusCode = 409 // Conflict status code
    message = err.message
    errorMessages = [{ path: '', message: err.message }]
  } else if (err instanceof ApiError) {
    statusCode = err?.statusCode
    message = err?.message
    errorMessages = err.message
      ? [
          {
            path: '',
            message: err.message,
          },
        ]
      : []
  } else if (err instanceof Error) {
    message = err?.message
    errorMessages = err.message ? [{ path: '', message: err.message }] : []
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? err?.stack : undefined,
  })
}
export default globalErrorHandler
