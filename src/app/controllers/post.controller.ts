import { NextFunction, Request, Response } from 'express'
import { matchedData } from 'express-validator'
import { Post } from '../model/post.model'
import { PostResponse } from '../types/responseTypes'
import { RequestWithBody } from '../types/requestTypes'

export async function getPosts(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response<PostResponse>> {
  try {
    const posts = await Post.findAll()
    return res
      .status(200)
      .json({ status: true, message: 'All blog posts', data: posts })
  } catch (error) {
    console.log(error)
    next(error)
  }
}

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

export async function deletePostById(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response<PostResponse>> {
  try {
    const { postId } = req.params

    const post = await Post.destroy({
      where: {
        id: postId
      }
    })

    if (post === 0) {
      return res
        .status(404)
        .json({ status: true, message: `Post doesn't exist` })
    }
    return res
      .status(200)
      .json({ status: true, message: 'Post deleted successfully!' })
  } catch (error) {
    console.log(error)
    next(error)
  }
}

export async function editPostById(
  req: RequestWithBody,
  res: Response,
  next: NextFunction
): Promise<void | Response<PostResponse>> {
  try {
    const { postId } = req.params

    const existingPost = await Post.findOne({
      where: {
        id: postId
      }
    })

    if (!existingPost) {
      return res
        .status(404)
        .json({ status: true, message: `Post doesn't exist` })
    }

    // We retrieve only the validated data that are specified in the validators registered on the route
    // there, any extra property added to the req.body will also not be included
    const validatedBodyData = matchedData(req, {
      locations: ['body']
    })

    const post = await Post.update(
      { ...validatedBodyData },
      {
        where: { id: postId }
      }
    )

    return res
      .status(200)
      .json({ status: true, message: 'Post edited successfully!', data: post })
  } catch (error) {
    console.log(error)
    next(error)
  }
}
