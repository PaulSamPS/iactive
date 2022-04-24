const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const News = sequelize.define('news', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.TEXT, required: true },
  author: { type: DataTypes.STRING, required: true },
  body: { type: DataTypes.TEXT, required: true },
  avatar: { type: DataTypes.STRING },
  img: { type: DataTypes.STRING },
  isFavourite: { type: DataTypes.BOOLEAN, defaultValue: false },
})

const Favourite = sequelize.define('favourite', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

const FavouriteNews = sequelize.define('favourite_news', {})

Favourite.belongsToMany(News, { through: FavouriteNews, onDelete: 'CASCADE' })
News.belongsToMany(Favourite, { through: FavouriteNews, onDelete: 'CASCADE' })

module.exports = {
  News,
  Favourite,
  FavouriteNews,
}
