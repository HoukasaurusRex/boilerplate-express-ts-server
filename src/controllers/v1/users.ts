import express from 'express'
import { usersProvider } from '../../providers/v1'
import { usersValidator } from '../../validators/v1'
const router = express.Router()

router.post('/', usersValidator.postUsers, usersProvider.postUsers)
router.get('/', usersValidator.getUsers, usersProvider.getUsers)
router.put('/:id', usersValidator.putUsers, usersProvider.putUsers)
router.delete('/:id', usersValidator.deleteUsers, usersProvider.deleteUsers)

export default router
