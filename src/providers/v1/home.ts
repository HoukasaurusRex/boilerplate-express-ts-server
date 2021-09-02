import { NextFunction, Request, Response } from 'express'

export const getGreeting = (
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  res.send('Server is healthy')
}
