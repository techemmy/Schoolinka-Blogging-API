import { DataTypes, Model, Sequelize } from 'sequelize'

interface PostAttributes {
  id?: number
  title: string
  description: string
  body: string
  author_id?: number
  createdAt?: Date
  updatedAt?: Date
}

class Post extends Model<PostAttributes> implements PostAttributes {
  id!: number
  title!: string
  description!: string
  body!: string
  author_id!: number
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
    { sequelize }
  )

  return Post
}

export { postModel, Post, PostAttributes }
