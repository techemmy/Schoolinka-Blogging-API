import { Request } from 'express'

export interface CustomRequest extends Request {
  body: {
    title: string
    description: string
    body: string
  }
  params: {
    postId?: string
  }
  query: {
    word?: string
    page?: string
    limit?: string
  }
}
