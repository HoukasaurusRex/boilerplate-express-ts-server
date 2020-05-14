import express from 'express'
import indexController from './controllers/index'
import usersController from './controllers/users'
import notFoundController from './controllers/not_found'

const router = express.Router()

router.use('/', indexController)
router.use('/users', usersController)
router.use('*', notFoundController)

export default router
