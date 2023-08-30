import { Router } from 'express'
import * as postController from '../controllers/post.controller'
import { body, param } from 'express-validator'

const postRouter: Router = Router()

postRouter.post(
  '/',
  body('title')
    .notEmpty()
    .withMessage('Title cannot be empty')
    .isLength({ min: 3 })
    .withMessage('Enter a minimum of three characters')
    .escape(),
  body('body')
    .notEmpty()
    .withMessage('Body cannot be empty')
    .isLength({ min: 3 })
    .withMessage('Enter a minimum of three characters')
    .escape(),
  postController.createPost
)
postRouter.get(
  '/:postId',
  param('postId').isUUID().withMessage('Invalid post id'),
  postController.getPostById
)

export default postRouter
