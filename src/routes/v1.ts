import express from 'express'
import indexController from '../controllers/v1/index'
import usersController from '../controllers/v1/users'

const router = express.Router()

router.use('/', indexController)
router.use('/users', usersController)

export default router
