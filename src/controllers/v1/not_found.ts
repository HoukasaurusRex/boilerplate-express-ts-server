import express from 'express'
import { notFound } from '../../providers/v1/errors'
const router = express.Router()

router.all('*', notFound)

export default router
