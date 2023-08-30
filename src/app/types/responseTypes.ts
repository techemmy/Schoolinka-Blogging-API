import { Post, PostAttributes } from '../model/Post'
import { ValidationError } from 'express-validator'

export interface PostResponse {
  status: number
  message: string
  data?: Post | PostAttributes[]
  errors?: ValidationError | ValidationError[]
}
