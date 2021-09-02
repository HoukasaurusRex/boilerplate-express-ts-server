import express from 'express'
import { homeProvider } from '../../providers/v1'
const router = express.Router()

router.get('/', homeProvider.getGreeting)

export default router
