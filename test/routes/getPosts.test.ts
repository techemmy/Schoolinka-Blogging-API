import request from 'supertest'
import app from '../../src/app'
import db from '../../src/app/model'
import postFixtures from '../fixtures/posts.json'

const getPostsUrl = '/api/blogs/posts'

beforeAll(async () => {
  await db.sequelize.sync({ alter: true })
  await db.post.bulkCreate(postFixtures)
})

afterAll(async () => {
  await db.post.destroy({ truncate: true })
  await db.sequelize.close()
})

describe(`GET ${getPostsUrl}`, () => {
  test('should get no posts', async () => {
    const response = await request(app).get(getPostsUrl)
    expect(response.headers['content-type']).toContain('application/json')
    expect(response.status).toBe(200)
    expect(response.body.status).toBeTruthy()
    expect(response.body.data).toBeTruthy()
    expect(response.body.data.length).toBe(postFixtures.length)
  })

  test('should get two posts', async () => {
    const response = await request(app).get(`${getPostsUrl}?page=1&limit=2`)
    expect(response.headers['content-type']).toContain('application/json')
    expect(response.status).toBe(200)
    expect(response.body.status).toBeTruthy()
    expect(response.body.data).toBeTruthy()
    expect(response.body.data.length).toBe(2)
  })
})
