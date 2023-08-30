import express, { Express, Request, Response } from 'express'
import morgan from 'morgan'
import APIRouter from './routes'

const app: Express = express()

app.use(express.json())
app.use(morgan('common'))

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript configured!')
})

app.use('/api', APIRouter)

export default app
