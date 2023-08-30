import express, { Express, Request, Response } from 'express'
import APIRouter from './routes'

const app: Express = express()

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript configured!')
})

app.use('/api', APIRouter)

export default app
