import request from 'supertest'
import app from '../../src/app'

describe('[ROUTES]: /not-a-real-route', () => {
  describe('POST /not-a-real-route', () => {
    it('should return a status 404', async () => {
      await request(app).post('/not-a-real-route').expect(404)
    })
  })
  describe('GET /not-a-real-route', () => {
    it('should return a status 404', async () => {
      await request(app).get('/not-a-real-route').expect(404)
    })
  })
  describe('PUT /not-a-real-route', () => {
    it('should return a status 404', async () => {
      await request(app).put('/not-a-real-route').expect(404)
    })
  })
  describe('DELETE /not-a-real-route', () => {
    it('should return a status 404', async () => {
      await request(app).delete('/not-a-real-route').expect(404)
    })
  })
})
