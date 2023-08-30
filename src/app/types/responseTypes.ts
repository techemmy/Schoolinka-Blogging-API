import { Post, PostAttributes } from '../model/Post'
import { ValidationError } from 'express-validator'

export interface PostResponse {
  status: boolean
  message: string
  data?: Post | PostAttributes[]
  errors?: ValidationError | ValidationError[]
}
