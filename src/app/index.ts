import express, { Express, Request, Response } from 'express'
import morgan from 'morgan'
import APIRouter from './routes'
import { appErrorHandlerMiddleware } from './middlewares'

const app: Express = express()

app.use(express.json())
app.use(morgan('common'))

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript configured!')
})

app.use('/api', APIRouter)
app.use(appErrorHandlerMiddleware)

export default app
