import { NextFunction, Response } from 'express'
import { matchedData } from 'express-validator'
import { Post } from '../model/post.model'
import { PostResponse } from '../types/responseTypes'
import { CustomRequest } from '../types/requestTypes'
import { Op } from 'sequelize'

export async function getPosts(
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<void | Response<PostResponse>> {
  try {
    const { page, limit } = req.query
    const pageNumber = page ? parseInt(page?.toString()) : 1
    const resultsPerPage = limit ? parseInt(limit?.toString()) : 5

    const posts = await Post.findAll({
      limit: resultsPerPage,
      offset: (pageNumber - 1) * resultsPerPage
    })
    return res
      .status(200)
      .json({ status: true, message: 'All blog posts', data: posts })
  } catch (error) {
    console.log(error)
    next(error)
  }
}

export async function createPost(
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<void | Response<PostResponse>> {
  try {
    const { title, description, body } = req.body
    const post = await Post.create({ title, description, body })
    return res.status(201).json({
      status: true,
      message: 'Post Created Succesfully!',
      data: post
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
}

export async function getPostById(
  req: CustomRequest,
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
        .json({ status: false, message: `Post doesn't exist` })
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
  req: CustomRequest,
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
        .json({ status: false, message: `Post doesn't exist` })
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
  req: CustomRequest,
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
        .json({ status: false, message: `Post doesn't exist` })
    }

    // We retrieve only the validated data that are specified in the validators registered on the route
    // there, any extra property added to the req.body will also not be included
    const validatedBodyData = matchedData(req, {
      locations: ['body']
    })

    await Post.update(
      { ...validatedBodyData },
      {
        where: { id: postId }
      }
    )

    return res
      .status(200)
      .json({ status: true, message: 'Post edited successfully!' })
  } catch (error) {
    console.log(error)
    next(error)
  }
}

export async function searchPost(
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<void | Response<PostResponse>> {
  try {
    const { word: searchWord, page, limit } = req.query

    const pageNumber = page ? parseInt(page?.toString()) : 1
    const resultsPerPage = limit ? parseInt(limit?.toString()) : 5
    const searchResults = await Post.findAll({
      limit: resultsPerPage,
      offset: (pageNumber - 1) * resultsPerPage,
      where: {
        [Op.or]: {
          title: { [Op.iLike]: `%${searchWord}%` },
          description: { [Op.iLike]: `%${searchWord}%` }
        }
      }
    })

    return res.status(200).json({
      status: true,
      message: 'Search results',
      data: searchResults
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
}
