import { DataTypes, Model, Sequelize } from 'sequelize'

interface BlogPostAttributes {
  id?: number
  title: string
  description: string
  body: string
  author_id?: number
  createdAt?: Date
  updatedAt?: Date
}

class BlogPost extends Model<BlogPostAttributes> implements BlogPostAttributes {
  id!: number
  title!: string
  description!: string
  body!: string
  author_id!: number
  createdAt!: Date
  updatedAt!: Date
}

function BlogPostModel(sequelize: Sequelize) {
  BlogPost.init(
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

  return BlogPost
}

export { BlogPostModel, BlogPost, BlogPostAttributes }
