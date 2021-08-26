import { expect } from 'chai'
import request from 'supertest'
import faker from 'faker'
import app from '../../src/app'

// https://www.npmjs.com/package/faker
const generateUserPayload = (
  overrides: {
    email?: string
    password?: string
    firstName?: string
    lastName?: string
  } = {}
) => ({
  email: overrides.email || faker.internet.email(),
  password:
    overrides.password ||
    `${faker.internet.password()}${faker.datatype.number()}`,
  firstName: overrides.firstName || faker.name.firstName(),
  lastName: overrides.lastName || faker.name.lastName(),
})

const filterPassword = (user) => {
  delete user.password
  return user
}

let user

describe('[ROUTES]: /users', () => {
  beforeEach(async () => {
    const payload = generateUserPayload()
    const res = await request(app).post('/users').send(payload).expect(200)
    expect(res.body.data.user).to.include(filterPassword(payload))
    user = res.body.data.user
  })
  describe('POST /users', () => {
    it('should return a status 200 and a new user', async () => {
      const payload = generateUserPayload()
      const res = await request(app).post('/users').send(payload).expect(200)
      expect(res.body.data.user).to.include(filterPassword(payload))
    })
  })
  describe('GET /users', () => {
    it('should return a status 200', async () => {
      const res = await request(app).get('/users').expect(200)
      expect(res.body.data.users).to.deep.include(user)
    })
  })
  describe('PUT /users/:id', () => {
    it('should return a status 200 and an updated user', async () => {
      const payload = generateUserPayload()
      const res = await request(app)
        .put(`/users/${user.id}`)
        .send(payload)
        .expect(200)
      expect(res.body.data.user).to.include(filterPassword(payload))
    })
  })
  describe('DELETE /user/:id', () => {
    it('should return a status 200 and a deleted user', async () => {
      const res = await request(app).delete(`/users/${user.id}`).expect(200)
      expect(new Date(res.body.data.user.deletedAt) instanceof Date).to.equal(
        true
      )
    })
  })
})
