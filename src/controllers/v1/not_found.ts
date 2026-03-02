import express from 'express'
import { errorsProvider } from '../../providers/v1/index.ts'
const router = express.Router()

router.all('*', errorsProvider.notFound)

export default router
