import express from 'express'
import indexProvider from '../providers/index'
const router = express.Router()

router.get('/', indexProvider.getGreeting)

export default router
