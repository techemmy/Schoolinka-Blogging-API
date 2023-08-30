import { Sequelize } from 'sequelize'
import { Post } from '../model/Post'

export interface dbType {
  sequelize: Sequelize
  post: typeof Post
}
