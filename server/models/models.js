const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const News = sequelize.define('news', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.TEXT, required: true },
  author: { type: DataTypes.STRING, required: true },
  body: { type: DataTypes.TEXT, required: true },
  avatar: { type: DataTypes.STRING },
  img: { type: DataTypes.STRING },
  prettyCreatedAt: {
    type: DataTypes.VIRTUAL,
    get() {
      const value = this.getDataValue('createdAt')
      const hours = value.getHours()
      const minutes = value.getMinutes()
      return (hours < 10 ? `0${hours}` : hours) + ':' + (minutes < 10 ? `0${minutes}` : minutes)
    },
  },
  prettyUpdatedAt: {
    type: DataTypes.VIRTUAL,
    get() {
      return this.getDataValue('updatedAt').toLocaleString('ru-RU')
    },
  },
})

const Favourite = sequelize.define('favourite', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

module.exports = {
  News,
}
