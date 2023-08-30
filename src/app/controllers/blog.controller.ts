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

export async function getPostById(
  req: Request,
  res: Response
): Promise<Response<BlogResponse>> {
  const { blogId } = req.params
  console.log(blogId)
  const blog = await Blog.findOne({
    where: {
      id: blogId
    }
  })
  return res
    .status(200)
    .json({ status: true, message: 'Get a specific post', data: blog })
}
