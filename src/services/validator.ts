import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'

export class ValidationError extends Error {
  public status = 400

  constructor(message: string, status?: number) {
    super(message)
    this.name = 'ValidationError'
    if (status) {
      this.status = status
    }
  }
}

export default (req: Request, _res: Response, next: NextFunction): void => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const message = errors.array()[0].msg
    const error = new ValidationError(message)
    next(error)
  }
  next()
}
