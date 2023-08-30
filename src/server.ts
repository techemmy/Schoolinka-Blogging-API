import app from './app'
import config from './app/config'
import db from './app/model'

const port = config.APP_PORT

;(async () => {
  await db.sequelize.sync({ alter: true })
})()

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})
