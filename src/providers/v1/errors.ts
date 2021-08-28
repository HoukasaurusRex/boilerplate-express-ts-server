import { NextFunction, Request, Response } from 'express'
import logger from '../../services/logger'

interface GenericErrorWithStatus extends Error {
  status?: number
}

class ResponseError extends Error {
  public status = 500

  constructor(message: string, status?: number) {
    super(message)
    this.name = 'ResponseError'
    if (status) {
      this.status = status
    }
  }
}

export const notFound = (
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  res.status(404).jsend.error('Resource not found')
}

export const handleError = (
  err: GenericErrorWithStatus,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  logger.error(err)
  const error = new ResponseError(err.message, err.status)
  res.status(error.status).jsend.error(err.message || 'Something went wrong')
}
