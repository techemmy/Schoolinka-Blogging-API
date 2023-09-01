import request from 'supertest'
import app from '../../src/app'
import db from '../../src/app/model'
import postFixtures from '../fixtures/posts.json'

const getPostsUrl = '/api/blogs/posts'

describe(`GET ${getPostsUrl}`, () => {
  beforeAll(async () => {
    await db.sequelize.sync({ alter: true })
    await db.post.bulkCreate(postFixtures)
  })

  afterAll(async () => {
    await db.post.destroy({ truncate: true })
    await db.sequelize.close()
  })

  test('should get no posts', async () => {
    const response = await request(app).get(getPostsUrl)
    expect(response.status).toBe(200)
    expect(response.body.status).toBeTruthy()
    expect(response.body.data).toBeTruthy()
    expect(response.body.data.length).toBe(postFixtures.length)
  })

  test('should get two posts', async () => {
    const response = await request(app).get(`${getPostsUrl}?page=1&limit=2`)
    expect(response.status).toBe(200)
    expect(response.body.status).toBeTruthy()
    expect(response.body.data).toBeTruthy()
    expect(response.body.data.length).toBe(2)
  })
})
