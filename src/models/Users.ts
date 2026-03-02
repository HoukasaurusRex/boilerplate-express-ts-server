import type { Prisma } from '@prisma/client'
import { hash, compare } from 'bcrypt'
import prisma from '../db.ts'

const SALT_ROUNDS = process.env.NODE_ENV === 'test' ? 1 : 8

export const hashPassword = (password: string): Promise<string> => hash(password, SALT_ROUNDS)

export const validPassword = (password: string, hashedPassword: string): Promise<boolean> =>
  compare(password, hashedPassword)

export const findAll = () =>
  prisma.user.findMany({ where: { deletedAt: null } })

export const findById = (id: string) =>
  prisma.user.findFirst({ where: { id, deletedAt: null } })

export const findByEmail = (email: string) =>
  prisma.user.findFirst({ where: { email, deletedAt: null } })

export const create = async (data: Prisma.UserCreateInput) => {
  const password = await hashPassword(data.password)
  return prisma.user.create({ data: { ...data, password } })
}

export const update = async (id: string, data: Prisma.UserUpdateInput) => {
  if (data.password && typeof data.password === 'string') {
    data.password = await hashPassword(data.password)
  }
  return prisma.user.update({ where: { id }, data })
}

export const softDelete = (id: string) =>
  prisma.user.update({ where: { id }, data: { deletedAt: new Date() } })
