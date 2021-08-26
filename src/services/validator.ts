import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'

class ValidationError extends Error {
  status?: number
}

export default (req: Request, _res: Response, next: NextFunction): void => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const message = errors.array()[0].msg
    const error = new ValidationError(message)
    error.status = 400
    next(error)
  }
  next()
}
