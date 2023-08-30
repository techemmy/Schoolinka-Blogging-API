import { DataTypes, Model, Sequelize } from 'sequelize'

interface BlogAttributes {
  id: number
  title: string
  description: string
  body: string
  author_id?: number
  createdAt?: Date
  updatedAt?: Date
}

class Blog extends Model<BlogAttributes> implements BlogAttributes {
  id!: number
  title!: string
  description!: string
  body!: string
  author_id?: number
  createdAt!: Date
  updatedAt!: Date
}

function blogModel(sequelize: Sequelize) {
  Blog.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
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

  return Blog
}

export { blogModel, Blog, BlogAttributes }
