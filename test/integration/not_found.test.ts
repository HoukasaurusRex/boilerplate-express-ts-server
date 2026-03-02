import { describe, it } from 'node:test'
import assert from 'node:assert'
import request from 'supertest'
import app from '../../src/app.ts'

describe('[ROUTES]: /not-a-real-route', () => {
  describe('POST /not-a-real-route', () => {
    it('should return a status 404', async () => {
      const { status } = await request(app).post('/not-a-real-route')
      assert.strictEqual(status, 404)
    })
  })
  describe('GET /not-a-real-route', () => {
    it('should return a status 404', async () => {
      const { status } = await request(app).get('/not-a-real-route')
      assert.strictEqual(status, 404)
    })
  })
  describe('PUT /not-a-real-route', () => {
    it('should return a status 404', async () => {
      const { status } = await request(app).put('/not-a-real-route')
      assert.strictEqual(status, 404)
    })
  })
  describe('DELETE /not-a-real-route', () => {
    it('should return a status 404', async () => {
      const { status } = await request(app).delete('/not-a-real-route')
      assert.strictEqual(status, 404)
    })
  })
})
