import request from 'supertest'
import app from '../../src/app'
import db from '../../src/app/model'
import postFixtures from '../fixtures/posts.json'

const searchPostsUrl = '/api/blogs/posts/search'

describe(`GET ${searchPostsUrl}`, () => {
  beforeAll(async () => {
    await db.sequelize.sync({ alter: true })
    await db.post.bulkCreate(postFixtures)
  })

  afterAll(async () => {
    await db.post.destroy({ truncate: true })
    await db.sequelize.close()
  })

  test('should search for all posts matching the search word', async () => {
    const searchWord = 'a'
    const response = await request(app).get(
      `${searchPostsUrl}?word=${searchWord}`
    )
    const searchResult = postFixtures.filter(
      (post) =>
        post.title.includes(searchWord) || post.description.includes(searchWord)
    )
    expect(response.headers['content-type']).toContain('application/json')
    expect(response.status).toBe(200)
    expect(response.body.status).toBeTruthy()
    expect(response.body.data).toBeTruthy()
    expect(response.body.data.length).toEqual(searchResult.length)
  })

  test('should return no posts if no search word is in the url', async () => {
    const response = await request(app).get(`${searchPostsUrl}`)
    expect(response.headers['content-type']).toContain('application/json')
    expect(response.status).toBe(200)
    expect(response.body.status).toBeTruthy()
    expect(response.body.data).toBeTruthy()
    expect(response.body.data.length).toEqual(0)
  })

  test('should search for a post by title', async () => {
    const response = await request(app).get(
      `${searchPostsUrl}?word=${postFixtures[4].title}`
    )
    expect(response.headers['content-type']).toContain('application/json')
    expect(response.status).toBe(200)
    expect(response.body.status).toBeTruthy()
    expect(response.body.data).toBeTruthy()
    expect(response.body.data[0].title).toEqual(postFixtures[4].title)
    expect(response.body.data[0].description).toEqual(
      postFixtures[4].description
    )
    expect(response.body.data[0].body).toEqual(postFixtures[4].body)
  })

  test('should search for a post by description', async () => {
    const response = await request(app).get(
      `${searchPostsUrl}?word=${postFixtures[2].description}`
    )
    expect(response.headers['content-type']).toContain('application/json')
    expect(response.status).toBe(200)
    expect(response.body.status).toBeTruthy()
    expect(response.body.data).toBeTruthy()
    expect(response.body.data[0].title).toEqual(postFixtures[2].title)
    expect(response.body.data[0].description).toEqual(
      postFixtures[2].description
    )
    expect(response.body.data[0].body).toEqual(postFixtures[2].body)
  })

  test('should search for posts with a limit of 2 posts per page', async () => {
    const response = await request(app).get(`${searchPostsUrl}?word=e&limit=2`)
    expect(response.headers['content-type']).toContain('application/json')
    expect(response.status).toBe(200)
    expect(response.body.status).toBeTruthy()
    expect(response.body.data).toBeTruthy()
    expect(response.body.data.length).toBeLessThanOrEqual(2)
  })
})
