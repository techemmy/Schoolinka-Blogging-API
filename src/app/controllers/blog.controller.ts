import { Request, Response } from 'express'
import { BlogPost, BlogPostAttributes } from '../model/Post'

interface BlogResponse {
  status: number
  message: string
  data?: BlogPost | BlogPostAttributes[]
}

export async function createPost(
  req: Request,
  res: Response
): Promise<Response<BlogResponse>> {
  const { title, description, body } = req.body
  const blog = await BlogPost.create({ title, description, body })
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
  const blog = await BlogPost.findOne({
    where: {
      id: blogId
    }
  })
  return res
    .status(200)
    .json({ status: true, message: 'Get a specific post', data: blog })
}
