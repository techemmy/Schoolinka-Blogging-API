import { Sequelize } from 'sequelize'
import { Post } from '../model/post.model'

export interface dbType {
  sequelize: Sequelize
  post: typeof Post
}
