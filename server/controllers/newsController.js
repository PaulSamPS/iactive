const {News} = require('../models/models')

class NewsController {
  async createNews(req, res, next) {
    try {
      let { title, author, body } = req.body
      const news = await News.create({
        title,
        author,
        body,
      })
      return res.status(200).send(news)
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
}

module.exports = new NewsController()
