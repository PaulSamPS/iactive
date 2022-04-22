const {News} = require('../models/models')
const path = require("path");
const uuid = require('uuid')

class NewsController {
  async create(req, res, next) {
    try {
      let { title, author, body } = req.body
      const { img } = req.files
      let fileName = uuid.v4() + '.jpg'
      await img.mv(path.resolve(__dirname, '..', 'static/author', fileName))
      const news = await News.create({
        title,
        author,
        body,
        img: fileName
      })
      return res.status(200).send(news)
    } catch (e) {
      next(res.json(e.message))
    }
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params
      const news = await News.findByPk(id)
      return res.json(news)
    } catch (e) {
      next(res.json(e.message))
    }
  }

  async getAll(req, res, next) {
    try {
      let { limit, page } = req.query
      page = page || 1
      limit = limit || 20
      let offset = page * limit - limit
      const news = await News.findAndCountAll({ limit, offset })
      return res.json(news)
    } catch (e) {
      next(res.json(e.message))
    }
  }

  async update(req, res) {
    const {id} = req.params
    const {title, author, body, img} = req.body
    const news = await News.findByPk(id)
    if (!news) {
      throw new Error('Новость не найдена')
    }
    await news.update({title, author, body, img})
    return res.json(news)
  }
}

module.exports = new NewsController()
