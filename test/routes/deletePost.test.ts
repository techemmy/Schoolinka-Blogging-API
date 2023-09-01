import request from 'supertest'
import app from '../../src/app'
import db from '../../src/app/model'
import postFixtures from '../fixtures/posts.json'
import { PostAttributes } from '../../src/app/model/post.model'

const deletePostUrl = '/api/blogs/posts'
let createdPost: PostAttributes

beforeAll(async () => {
  await db.sequelize.sync({ alter: true })
  createdPost = await db.post.create(postFixtures[0])
})

afterAll(async () => {
  await db.post.destroy({ truncate: true })
  await db.sequelize.close()
})

describe(`DELETE ${deletePostUrl}/`, () => {
  afterEach(async () => {
    await db.post.destroy({ truncate: true })
  })

  test('should delete a post by Id', async () => {
    const response = await request(app).put(
      `${deletePostUrl}/${createdPost.id}`
    )
    expect(response.headers['content-type']).toContain('application/json')
    expect(response.status).toBe(200)
    expect(response.body.status).toBeTruthy()
    expect(response.body.data).toBeUndefined()
  })

  test('should return 404 if post is not found', async () => {
    const deletedPostId = (await db.post.create(postFixtures.at(-1))).id
    await db.post.destroy({ where: { id: deletedPostId } })

    const response = await request(app).get(`${deletePostUrl}/${deletedPostId}`)
    expect(response.headers['content-type']).toContain('application/json')
    expect(response.status).toBe(404)
    expect(response.body.status).toBeFalsy()
    expect(response.body.data).toBeUndefined()
  })

  test('should fail to delete a post due to invalid post Id', async () => {
    const response = await request(app)
      .put(`${deletePostUrl}/${createdPost.id}randomChar`)
      .send({
        title: postFixtures[1].title,
        description: postFixtures[2].description,
        body: postFixtures[3].body
      })

    expect(response.headers['content-type']).toContain('application/json')
    expect(response.status).toBe(400)
    expect(response.body.status).toBeFalsy()
    expect(response.body.data).toBeUndefined()
  })
})
