const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const News = sequelize.define('news', {
    id: { type: DataTypes.INTEGER, autoIncrement: true ,primaryKey: true},
    title: { type: DataTypes.TEXT, required: true },
    author: { type: DataTypes.STRING, required: true },
    body: { type: DataTypes.TEXT, required: true },
    prettyCreatedAt: {
        type: DataTypes.VIRTUAL,
        get() {
            return this.getDataValue('createdAt').toLocaleString('ru-RU')
        }
    },
    prettyUpdatedAt: {
        type: DataTypes.VIRTUAL,
        get() {
            return this.getDataValue('updatedAt').toLocaleString('ru-RU')
        }
    },
})

module.exports = {
    News
}