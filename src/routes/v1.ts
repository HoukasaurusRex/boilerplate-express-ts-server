import express from 'express'
import * as controllers from '../controllers/v1'

const v1 = express.Router()

v1.use('/', controllers.homeController)
v1.use('/users', controllers.usersController)

export { v1 }
