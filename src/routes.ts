import express from 'express'
import indexController from './controllers/v1/index'
import usersController from './controllers/v1/users'

const v1 = express.Router()

v1.use('/', indexController)
v1.use('/users', usersController)

export { v1 }
