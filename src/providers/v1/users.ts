import type { NextFunction, Request, Response } from 'express'
import { ValidationError } from '../../services/validator.ts'
import * as UserModel from '../../models/Users.ts'

export const postUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await UserModel.create(req.body)
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
    const users = await UserModel.findAll()
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
    const user = await UserModel.findById(req.params.id)
    if (!user) throw new ValidationError('User not found')
    const updated = await UserModel.update(user.id, req.body)
    res.jsend.success({ user: updated })
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
    const user = await UserModel.findById(req.params.id)
    if (!user) throw new ValidationError('User not found')
    const deleted = await UserModel.softDelete(user.id)
    res.jsend.success({ user: deleted })
  } catch (error) {
    next(error)
  }
}
