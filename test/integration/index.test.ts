import request from 'supertest'
import app from '../../src/app'

describe('[ROUTES]: /', () => {
  describe('GET /', () => {
    it('should return a status 200', async () => {
      await request(app).get('/').expect(200)
    })
  })
})
