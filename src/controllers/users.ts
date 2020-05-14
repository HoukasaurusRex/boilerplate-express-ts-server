import express from 'express'
import userProvider from '../providers/users'
import userValidator from '../validators/users'
import validationResult from '../services/validator'
const router = express.Router()

router.post(
  '/',
  userValidator.postUsers,
  validationResult,
  userProvider.postUsers
)
router.get('/', userValidator.getUsers, validationResult, userProvider.getUsers)
router.put(
  '/:id',
  userValidator.putUsers,
  validationResult,
  userProvider.putUsers
)
router.delete(
  '/:id',
  userValidator.deleteUsers,
  validationResult,
  userProvider.deleteUsers
)

export default router
