import request from 'supertest'
import app from '../../src/app'
import db from '../../src/app/model'
import postFixtures from '../fixtures/posts.json'
import { PostAttributes } from '../../src/app/model/post.model'

const getPostsUrl = '/api/blogs/posts'

describe(`GET ${getPostsUrl}/`, () => {
  let createdPost: PostAttributes
  beforeAll(async () => {
    await db.sequelize.sync({ alter: true })
    createdPost = await db.post.create(postFixtures[0])
  })

  afterAll(async () => {
    await db.post.destroy({ truncate: true })
    await db.sequelize.close()
  })

  test('should get a post by Id', async () => {
    const response = await request(app).get(`${getPostsUrl}/${createdPost.id}`)
    expect(response.headers['content-type']).toContain('application/json')
    expect(response.status).toBe(200)
    expect(response.body.status).toBeTruthy()
    expect(response.body.data).toBeTruthy()
    expect(response.body.data.title).toBe(postFixtures[0].title)
    expect(response.body.data.description).toBe(postFixtures[0].description)
    expect(response.body.data.body).toBe(postFixtures[0].body)
  })

  test('should return 404 if post is not found', async () => {
    const deletedPostId = (await db.post.create(postFixtures.at(-1))).id
    await db.post.destroy({ where: { id: deletedPostId } })

    const response = await request(app).get(`${getPostsUrl}/${deletedPostId}`)
    expect(response.headers['content-type']).toContain('application/json')
    expect(response.status).toBe(404)
    expect(response.body.status).toBeFalsy()
    expect(response.body.data).toBeUndefined()
  })

  test('should return an error for an invalid post id', async () => {
    const response = await request(app).get(
      `${getPostsUrl}/${createdPost.id}randomChar`
    )
    expect(response.headers['content-type']).toContain('application/json')
    expect(response.status).toBe(400)
    expect(response.body.status).toBeFalsy()
    expect(response.body.data).toBeUndefined()
  })
})
