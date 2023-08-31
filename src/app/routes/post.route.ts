import { Router } from 'express'
import { postController } from '../controllers'
import { body, param } from 'express-validator'
import { validationErrorHandlerMiddleware } from '../middlewares'

const postRouter: Router = Router()

postRouter.get('/', postController.getPosts)

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
  validationErrorHandlerMiddleware,
  postController.createPost
)

postRouter.get(
  '/:postId',
  param('postId').isUUID().withMessage('Invalid post id'),
  validationErrorHandlerMiddleware,
  postController.getPostById
)

postRouter.delete(
  '/:postId',
  param('postId').isUUID().withMessage('Invalid post id'),
  validationErrorHandlerMiddleware,
  postController.deletePostById
)

export default postRouter
