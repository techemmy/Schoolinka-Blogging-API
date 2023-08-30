import { Router } from 'express'
import blogRouter from './blog.model'

const APIRouter: Router = Router()

APIRouter.use('/blogs', blogRouter)

export default APIRouter
