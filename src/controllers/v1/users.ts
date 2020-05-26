import express from 'express'
import userProvider from '../../providers/v1/users'
import userValidator from '../../validators/v1/users'
const router = express.Router()

router.post('/', userValidator.postUsers, userProvider.postUsers)
router.get('/', userValidator.getUsers, userProvider.getUsers)
router.put('/:id', userValidator.putUsers, userProvider.putUsers)
router.delete('/:id', userValidator.deleteUsers, userProvider.deleteUsers)

export default router
