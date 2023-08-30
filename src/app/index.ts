import express, { Express, Request, Response } from 'express'
require('dotenv').config()

const app: Express = express()

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript configured!')
})

export default app
