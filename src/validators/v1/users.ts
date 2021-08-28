// https://express-validator.github.io/docs/index.html
import { body, param } from 'express-validator'
import validationResult from '../../services/validator'
import { Users } from '../../db'

const containsNumbers = (str) => str.search(/\d/) !== -1
const containsLetters = (str) => str.search(/[a-zA-Z]/) !== -1

const checkValidEmail = body(
  'email',
  'Email should be a valid email address'
).isEmail()

const checkUniqueEmail = body('email', 'Email is already in use')
  .exists()
  .custom(async (email) => {
    const user = await Users.findOne({ where: { email } })
    return !user
  })

const checkPasswordLength = body(
  'password',
  'Password must be at least 6 characters long'
)
  .isString()
  .isLength({ min: 6, max: 200 })

const checkPasswordNumeric = body(
  'password',
  'Password must contain at least one number'
).custom((val) => containsNumbers(val))

const checkPasswordAlpha = body(
  'password',
  'Password must contain at least one letter'
).custom((val) => containsLetters(val))

const checkValidFirstName = body(
  'firstName',
  'First Name must be a valid string between 2 and 64 characters long'
)
  .optional({ checkFalsy: false })
  .isString()
  .isLength({ min: 2, max: 64 })

const checkValidLastName = body(
  'lastName',
  'Last Name must be a valid string between 2 and 64 characters long'
)
  .optional({ checkFalsy: false })
  .isString()
  .isLength({ min: 2, max: 64 })

const paramId = param('id', 'ID param must be integer').isInt()

export const postUsers = [
  checkValidEmail,
  checkUniqueEmail,
  checkPasswordLength,
  checkPasswordNumeric,
  checkPasswordAlpha,
  checkValidFirstName,
  checkValidLastName,
  validationResult,
]
export const getUsers = []
export const putUsers = [
  paramId,
  checkValidFirstName,
  checkValidLastName,
  validationResult,
]
export const deleteUsers = [paramId, validationResult]
