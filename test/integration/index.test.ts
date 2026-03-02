import { describe, it } from 'node:test'
import assert from 'node:assert'
import request from 'supertest'
import app from '../../src/app.ts'

describe('[ROUTES]: /', () => {
  describe('GET /', () => {
    it('should return a status 200', async () => {
      const { status } = await request(app).get('/')
      assert.strictEqual(status, 200)
    })
  })
})
