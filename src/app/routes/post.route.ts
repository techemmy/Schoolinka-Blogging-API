import { Router } from 'express'
import * as postController from '../controllers/post.controller'

const postRouter: Router = Router()

postRouter.post('/', postController.createPost)
postRouter.get('/:postId', postController.getPostById)

export default postRouter
