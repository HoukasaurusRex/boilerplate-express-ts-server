import express from 'express'
import userProvider from '../providers/users'
const router = express.Router()

router.get('/', userProvider.getUsers)

export default router
