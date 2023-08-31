import request from 'supertest'
import app from '../src/app'

describe('Test the server', () => {
  test('GET / route', async () => {
    const response = await request(app).get('/')
    expect(response.status).toBe(200)
  })
})
