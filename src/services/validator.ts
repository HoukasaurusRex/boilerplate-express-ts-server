import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'

export class ValidationError extends Error {
  public status = 400
  constructor(message: string, status?: number) {
    super(message)
    this.name = 'ValidationError'
    this.status = status || this.status
  }
}

export default (req: Request, _res: Response, next: NextFunction): void => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const message = `Error validating request: ${errors.array()[0].msg}`
    const error = new ValidationError(message)
    next(error)
  }
  next()
}
