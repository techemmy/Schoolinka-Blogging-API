import { NextFunction, Request, Response } from 'express'
import { Post } from '../model/Post'
import { PostResponse } from '../types/responseTypes'

export async function createPost(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response<PostResponse>> {
  try {
    const { title, description, body } = req.body
    const post = await Post.create({ title, description, body })
    return res.status(201).json({
      status: true,
      message: 'Post Created Succesfully!',
      data: post.toJSON()
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
}

export async function getPostById(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response<PostResponse>> {
  try {
    const { postId } = req.params

    const post = await Post.findOne({
      where: {
        id: postId
      }
    })

    if (!post) {
      return res
        .status(404)
        .json({ status: true, message: `Post doesn't exist` })
    }
    return res
      .status(200)
      .json({ status: true, message: 'Get a specific post', data: post })
  } catch (error) {
    console.log(error)
    next(error)
  }
}
