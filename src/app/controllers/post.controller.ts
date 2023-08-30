import { NextFunction, Request, Response } from 'express'
import { Post, PostAttributes } from '../model/Post'
import {
  FieldValidationError,
  Result,
  ValidationError,
  validationResult
} from 'express-validator'

interface PostResponse {
  status: number
  message: string
  data?: Post | PostAttributes[]
  errors?: ValidationError | ValidationError[]
}

export async function createPost(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response<PostResponse>> {
  try {
    const validationResponse: Result = validationResult(req)
    // if there are any validation errors
    if (!validationResponse.isEmpty()) {
      const errors: {
        field: string
        error: string
      }[] = validationResponse.array().map((error: FieldValidationError) => {
        return { field: error.path, error: error.msg }
      })
      return res.status(400).json({
        status: false,
        message: 'Data Validation Error(s)',
        errors
      })
    }

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

    const validationResponse: Result = validationResult(req)
    // if there are any validation errors
    if (!validationResponse.isEmpty()) {
      const errors: {
        field: string
        error: string
      }[] = validationResponse.array().map((error: FieldValidationError) => {
        return { field: error.path, error: error.msg }
      })
      return res.status(400).json({
        status: false,
        message: 'Data Validation Error(s)',
        errors
      })
    }

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
