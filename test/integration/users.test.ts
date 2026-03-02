import { describe, it, before, after, beforeEach } from 'node:test'
import assert from 'node:assert'
import request from 'supertest'
import { faker } from '@faker-js/faker'
import app from '../../src/app.ts'
import prisma from '../../src/db.ts'

const generateUserPayload = (
  overrides: {
    email?: string
    password?: string
    firstName?: string
    lastName?: string
  } = {}
) => ({
  email: overrides.email || faker.internet.email(),
  password: overrides.password || `${faker.internet.password()}${faker.number.int({ min: 0, max: 999 })}`,
  firstName: overrides.firstName || faker.person.firstName(),
  lastName: overrides.lastName || faker.person.lastName(),
})

const filterPassword = (user: Record<string, unknown>) => {
  const { password: _password, ...rest } = user
  return rest
}

let user: Record<string, unknown>

before(async () => {
  await prisma.user.deleteMany()
})

after(async () => {
  await prisma.$disconnect()
})

describe('[ROUTES]: /users', () => {
  beforeEach(async () => {
    const payload = generateUserPayload()
    const { status, body } = await request(app).post('/users').send(payload)
    assert.strictEqual(status, 200)
    assert.partialDeepStrictEqual(body.data.user, filterPassword(payload))
    user = body.data.user
  })
  describe('POST /users', () => {
    it('should return a status 200 and a new user', async () => {
      const payload = generateUserPayload()
      const { status, body } = await request(app).post('/users').send(payload)
      assert.strictEqual(status, 200)
      assert.partialDeepStrictEqual(body.data.user, filterPassword(payload))
    })
  })
  describe('GET /users', () => {
    it('should return a status 200', async () => {
      const { status, body } = await request(app).get('/users')
      assert.strictEqual(status, 200)
      assert.ok(body.data.users.some((u: Record<string, unknown>) => u.id === user.id))
    })
  })
  describe('PUT /users/:id', () => {
    it('should return a status 200 and an updated user', async () => {
      const payload = generateUserPayload()
      const { status, body } = await request(app).put(`/users/${user.id}`).send(payload)
      assert.strictEqual(status, 200)
      assert.partialDeepStrictEqual(body.data.user, filterPassword(payload))
    })
  })
  describe('DELETE /user/:id', () => {
    it('should return a status 200 and a deleted user', async () => {
      const { status, body } = await request(app).delete(`/users/${user.id}`)
      assert.strictEqual(status, 200)
      assert.ok(new Date(body.data.user.deletedAt) instanceof Date)
    })
  })
})
