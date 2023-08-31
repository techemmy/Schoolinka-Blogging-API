import { Request } from 'express'

export interface RequestWithBody extends Request {
  body: {
    title: string
    description: string
    body: string
  }
}
