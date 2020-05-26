import db from '../../db'

const { Users } = db.models

export default {
  async postUsers(req, res, next): Promise<void> {
    try {
      const user = await Users.create(req.body)
      res.jsend.success({ user })
    } catch (error) {
      error.status = error.status || 400
      next(error)
    }
  },
  async getUsers(req, res, next): Promise<void> {
    try {
      const users = await Users.findAll()
      res.jsend.success({ users })
    } catch (error) {
      error.status = error.status || 400
      next(error)
    }
  },
  async putUsers(req, res, next): Promise<void> {
    try {
      const user = await Users.findByPk(req.params.id)
      await user.update(req.body)
      res.jsend.success({ user })
    } catch (error) {
      error.status = error.status || 400
      next(error)
    }
  },
  async deleteUsers(req, res, next): Promise<void> {
    try {
      const user = await Users.findByPk(req.params.id)
      await user.destroy()
      res.jsend.success({ user })
    } catch (error) {
      error.status = error.status || 400
      next(error)
    }
  },
}
