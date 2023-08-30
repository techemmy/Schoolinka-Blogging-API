import { Router } from 'express'
import postRouter from './post.route'

const APIRouter: Router = Router()

APIRouter.use('/blogs/posts', postRouter)

export default APIRouter
