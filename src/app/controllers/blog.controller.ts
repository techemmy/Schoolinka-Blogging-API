import { Request, Response } from 'express'
import { Blog, BlogAttributes } from '../model/Blog'

interface BlogResponse {
  status: number
  message: string
  data?: BlogAttributes | BlogAttributes[]
}

export async function createPost(
  req: Request,
  res: Response
): Promise<Response<BlogResponse>> {
  const { title, description, body } = req.body
  const blog = await Blog.create({ title, description, body })
  return res.status(201).json({
    status: true,
    message: 'Blog Created Succesfully!',
    data: blog.toJSON()
  })
}
