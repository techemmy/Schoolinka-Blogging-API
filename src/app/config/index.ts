import dotenv from 'dotenv'
dotenv.config()

interface ConfigType {
  NODE_ENV: string
  APP_PORT: number
  DATABASE: string
  DB_USERNAME: string
  DB_PASSWORD: string
  DB_HOST: string
  DB_DIALECT: 'postgres'
  DB_POOL_MIN: number
  DB_POOL_MAX: number
  DB_POOL_IDLE: number
  DB_POOL_ACQUIRE: number
}

const config: ConfigType = {
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  APP_PORT: parseInt(process.env.APP_PORT ?? '3000'),
  DATABASE: process.env.DATABASE_NAME ?? '',
  DB_USERNAME: process.env.DATABASE_USERNAME ?? '',
  DB_PASSWORD: process.env.DATABASE_PASSWORD ?? '',
  DB_HOST: process.env.DATABASE_HOST ?? '',
  DB_DIALECT: 'postgres',
  DB_POOL_MIN: parseInt(process.env.db ?? '0'),
  DB_POOL_MAX: parseInt(process.env.DATABASE_POOL_MAX ?? '5'),
  DB_POOL_IDLE: parseInt(process.env.DATABASE_POOL_IDLE ?? '30000'),
  DB_POOL_ACQUIRE: parseInt(process.env.DATABASE_POOL_ACQUIRE ?? '10000')
}

export default config
