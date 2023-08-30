import { Router } from 'express'
import * as blogController from '../controllers/blog.controller'

const blogRouter: Router = Router()

blogRouter.post('/', blogController.createPost)
blogRouter.get('/:blogId', blogController.getPostById)

export default blogRouter
