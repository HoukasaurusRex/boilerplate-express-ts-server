import { validationResult } from 'express-validator'

export default (req, _res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const message = errors.array()[0].msg
    const error = new Error(message)
    // @ts-ignore
    error.status = 400
    next(error)
  }
  next()
}
