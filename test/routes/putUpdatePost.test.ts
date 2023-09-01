import request from 'supertest'
import app from '../../src/app'
import db from '../../src/app/model'
import postFixtures from '../fixtures/posts.json'
import { PostAttributes } from '../../src/app/model/post.model'

const updatePostUrl = '/api/blogs/posts'

beforeAll(async () => {
  await db.sequelize.sync({ alter: true })
})

afterAll(async () => {
  await db.post.destroy({ truncate: true })
  await db.sequelize.close()
})

describe(`PUT ${updatePostUrl}/`, () => {
  let createdPost: PostAttributes

  beforeEach(async () => {
    createdPost = await db.post.create(postFixtures[0])
  })

  afterEach(async () => {
    await db.post.destroy({ truncate: true })
  })

  test('should update a post by Id', async () => {
    const response = await request(app)
      .put(`${updatePostUrl}/${createdPost.id}`)
      .send({
        title: postFixtures[1].title,
        description: postFixtures[2].description,
        body: postFixtures[3].body
      })

    const updatedPost = (
      await db.post.findOne({ where: { id: createdPost.id } })
    )?.toJSON()
    console.log(updatedPost)
    expect(response.headers['content-type']).toContain('application/json')
    expect(response.status).toBe(200)
    expect(response.body.status).toBeTruthy()
    expect(response.body.data).toBeUndefined()
    expect(updatedPost?.id).toBe(createdPost.id)
    expect(updatedPost?.title).toBe(postFixtures[1].title)
    expect(updatedPost?.description).toBe(postFixtures[2].description)
    expect(updatedPost?.body).toBe(postFixtures[3].body)
  })

  test('should update a post by Id without a description field', async () => {
    const response = await request(app)
      .put(`${updatePostUrl}/${createdPost.id}`)
      .send({
        title: postFixtures[1].title,
        body: postFixtures[3].body
      })

    const updatedPost = (
      await db.post.findOne({ where: { id: createdPost.id } })
    )?.toJSON()
    console.log(updatedPost)
    expect(response.headers['content-type']).toContain('application/json')
    expect(response.status).toBe(200)
    expect(response.body.status).toBeTruthy()
    expect(response.body.data).toBeUndefined()
    expect(updatedPost?.id).toBe(createdPost.id)
    expect(updatedPost?.title).toBe(postFixtures[1].title)
    expect(updatedPost?.description).toBe(createdPost.description)
    expect(updatedPost?.body).toBe(postFixtures[3].body)
  })

  test('should return 404 if post is not found', async () => {
    const deletedPostId = (await db.post.create(postFixtures.at(-1))).id
    await db.post.destroy({ where: { id: deletedPostId } })

    const response = await request(app).get(`${updatePostUrl}/${deletedPostId}`)
    expect(response.headers['content-type']).toContain('application/json')
    expect(response.status).toBe(404)
    expect(response.body.status).toBeFalsy()
    expect(response.body.data).toBeUndefined()
  })

  test('should fail to update a post due to invalid post Id', async () => {
    const response = await request(app)
      .put(`${updatePostUrl}/${createdPost.id}randomChar`)
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

  test('should fail to update a due to title field validation error', async () => {
    const response = await request(app)
      .put(`${updatePostUrl}/${createdPost.id}randomChar`)
      .send({
        title: '         ',
        description: postFixtures[2].description,
        body: postFixtures[3].body
      })

    expect(response.headers['content-type']).toContain('application/json')
    expect(response.status).toBe(400)
    expect(response.body.status).toBeFalsy()
    expect(response.body.data).toBeUndefined()
  })

  test('should fail to update a due to description field validation error', async () => {
    const response = await request(app)
      .put(`${updatePostUrl}/${createdPost.id}randomChar`)
      .send({
        title: postFixtures[1].title,
        description: '1',
        body: postFixtures[3].body
      })

    expect(response.headers['content-type']).toContain('application/json')
    expect(response.status).toBe(400)
    expect(response.body.status).toBeFalsy()
    expect(response.body.data).toBeUndefined()
  })

  test('should fail to update a due to body field validation error', async () => {
    const response = await request(app)
      .put(`${updatePostUrl}/${createdPost.id}randomChar`)
      .send({
        title: postFixtures[1].title,
        description: postFixtures[2].description
      }) // body field is missing, should therefore return an error

    expect(response.headers['content-type']).toContain('application/json')
    expect(response.status).toBe(400)
    expect(response.body.status).toBeFalsy()
    expect(response.body.data).toBeUndefined()
  })
})
