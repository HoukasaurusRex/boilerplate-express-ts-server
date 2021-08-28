import express from 'express'
import * as indexProvider from '../../providers/v1/index'
const router = express.Router()

router.get('/', indexProvider.getGreeting)

export default router
