import { Request, Response } from 'express'
import { Post, PostAttributes } from '../model/Post'

interface PostResponse {
  status: number
  message: string
  data?: Post | PostAttributes[]
}

export async function createPost(
  req: Request,
  res: Response
): Promise<Response<PostResponse>> {
  const { title, description, body } = req.body
  const post = await Post.create({ title, description, body })
  return res.status(201).json({
    status: true,
    message: 'Post Created Succesfully!',
    data: post.toJSON()
  })
}

// TODO: write code to handle invalid input syntax for type uuid
// TODO: write code to handle non-existing post
export async function getPostById(
  req: Request,
  res: Response
): Promise<Response<PostResponse>> {
  const { postId } = req.params
  const post = await Post.findOne({
    where: {
      id: postId
    }
  })
  return res
    .status(200)
    .json({ status: true, message: 'Get a specific post', data: post })
}
