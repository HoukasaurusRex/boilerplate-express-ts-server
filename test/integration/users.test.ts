import { expect } from 'chai'
import request from 'supertest'
import app from '../../src/app'

describe('[ROUTES]: /users', () => {
  describe('GET /users', () => {
    it('should return a status 200', async() => {
      const res = await request(app)
        .get('/users')
        .expect(200)
    })
  })
})