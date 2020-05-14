import express from 'express'
import errors from '../providers/errors'
const router = express.Router()

router.all('*', errors.notFound)

export default router
