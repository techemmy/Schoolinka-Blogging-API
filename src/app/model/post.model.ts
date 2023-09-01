import { DataTypes, Model, Sequelize } from 'sequelize'
import { PostAttributes } from '../types/models/postTypes'

class Post extends Model<PostAttributes> implements PostAttributes {
  id!: number
  title!: string
  description!: string
  body!: string
  createdAt!: Date
  updatedAt!: Date
}

function postModel(sequelize: Sequelize) {
  Post.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING
      },
      body: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      indexes: [
        {
          name: 'searchIndex',
          using: 'BTREE',
          fields: [
            {
              name: 'title',
              collate: 'en_US',
              order: 'ASC',
              length: 5
            },
            'description'
          ]
        }
      ]
    }
  )

  return Post
}

export { postModel, Post, PostAttributes }
