import { DataTypes, Model, Sequelize } from 'sequelize'

interface BlogAttributes {
  id?: number
  title: string
  description: string
  body: string
  author_id?: number
}

class Blog extends Model<BlogAttributes> implements BlogAttributes {
  id!: number
  title!: string
  description!: string
  body!: string
  author_id?: number
}

function blogModel(sequelize: Sequelize) {
  Blog.init(
    {
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

export { blogModel, Blog }
