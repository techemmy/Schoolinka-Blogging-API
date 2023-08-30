import { Sequelize } from 'sequelize'
import config from '../config'
import { BlogPost, BlogPostModel } from './Post'

const sequelize = new Sequelize(
  config.DATABASE,
  config.DB_USERNAME,
  config.DB_PASSWORD,
  {
    logging: false,
    host: config.DB_HOST,
    dialect: config.DB_DIALECT,
    pool: {
      min: config.DB_POOL_MIN,
      max: config.DB_POOL_MAX,
      idle: config.DB_POOL_IDLE,
      acquire: config.DB_POOL_ACQUIRE
    },
    define: {
      freezeTableName: true // prevents Sequelize from auto-pluralization of model names
    }
  }
)

const db: {
  sequelize: Sequelize
  blog: typeof BlogPost
} = { sequelize, blog: BlogPostModel(sequelize) }

export default db
