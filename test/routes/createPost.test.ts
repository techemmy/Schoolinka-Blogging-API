import request from 'supertest'
import app from '../../src/app'
import db from '../../src/app/model'
import postFixtures from '../fixtures/posts.json'

const createPostUrl = '/api/blogs/posts'

describe(`GET ${createPostUrl}`, () => {
  beforeAll(async () => {
    await db.sequelize.sync({ alter: true })
    await db.post.bulkCreate(postFixtures)
  })

  afterAll(async () => {
    await db.post.destroy({ truncate: true })
    await db.sequelize.close()
  })

  test('should create a post', async () => {
    const response = await request(app)
      .post(createPostUrl)
      .send(postFixtures[0])
    expect(response.headers['content-type']).toContain('application/json')
    expect(response.status).toBe(201)
    expect(response.body.status).toBeTruthy()
    expect(response.body.data).toBeTruthy()
    expect(response.body.data.title).toEqual(postFixtures[0].title)
    expect(response.body.data.description).toEqual(postFixtures[0].description)
    expect(response.body.data.body).toEqual(postFixtures[0].body)
  })

  test('should not create a post due to title validation error', async () => {
    const response = await request(app)
      .post(createPostUrl)
      .send({ ...postFixtures[0], title: 'a' })
    expect(response.headers['content-type']).toContain('application/json')
    expect(response.status).toBe(400)
    expect(response.body.status).toBeFalsy()
    expect(response.body.data).toBeUndefined()
  })

  test('should not create a post due to body validation error', async () => {
    const response = await request(app)
      .post(createPostUrl)
      .send({ ...postFixtures[0], body: '      ' })
    expect(response.headers['content-type']).toContain('application/json')
    expect(response.status).toBe(400)
    expect(response.body.status).toBeFalsy()
    expect(response.body.data).toBeUndefined()
  })

  test('should create a post even if description is empty', async () => {
    const response = await request(app)
      .post(createPostUrl)
      .send(postFixtures[1])
    expect(response.headers['content-type']).toContain('application/json')
    expect(response.status).toBe(201)
    expect(response.body.status).toBeTruthy()
    expect(response.body.data).toBeTruthy()
    expect(response.body.data.title).toEqual(postFixtures[1].title)
    expect(response.body.data.description).toEqual(postFixtures[1].description)
    expect(response.body.data.body).toEqual(postFixtures[1].body)
  })
})
