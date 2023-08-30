import express, { Express, Request, Response } from 'express'
import morgan from 'morgan'
import APIRouter from './routes'
import { errorHandlerMiddleware } from './middlewares'

const app: Express = express()

app.use(express.json())
app.use(morgan('common'))

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript configured!')
})

app.use('/api', APIRouter)
app.use(errorHandlerMiddleware)

export default app
