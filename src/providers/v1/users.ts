import { NextFunction, Request, Response } from 'express'
import { ValidationError } from '../../services/validator'
import { Users } from '../../db'

export const postUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await Users.create(req.body)
    res.jsend.success({ user })
  } catch (error) {
    next(error)
  }
}
export const getUsers = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const users = await Users.findAll()
    res.jsend.success({ users })
  } catch (error) {
    next(error)
  }
}
export const putUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await Users.findByPk(req.params.id)
    if (!user) throw new ValidationError('User not found')
    await user.update(req.body)
    res.jsend.success({ user })
  } catch (error) {
    next(error)
  }
}
export const deleteUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await Users.findByPk(req.params.id)
    if (!user) throw new ValidationError('User not found')
    await user.destroy()
    res.jsend.success({ user })
  } catch (error) {
    next(error)
  }
}
