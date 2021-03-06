const { News, Favourite } = require('../models/models')
const path = require('path')
const uuid = require('uuid')
const fs = require('fs')

class NewsController {
  async create(req, res, next) {
    try {
      let { title, author, body } = req.body
      const { img, avatar } = req.files
      let fileName = uuid.v4() + '.jpg'
      await img.mv(path.resolve(__dirname, '..', 'static/news', fileName))
      await avatar.mv(path.resolve(__dirname, '..', 'static/avatar', fileName))
      const news = await News.create({
        title,
        author,
        body,
        img: fileName,
        avatar: fileName,
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
      let { limit, page, sort } = req.query
      page = page || 1
      limit = limit || 20
      let offset = page * limit - limit
      const news = await News.findAndCountAll()
      const { count } = news
      if (sort === 'up') {
        return res.json({
          count: count,
          rows: [
            ...news.rows.sort((a, b) => a.id - b.id),
          ],
        })
      } else if (sort === 'down') {
        return res.json({
          count: count,
          rows: [
            ...news.rows.sort((a, b) => b.id - a.id),
          ],
        })
      }
      return res.json(news)
    } catch (e) {
      next(res.json(e.message))
    }
  }

  async update(req, res) {
    const { id } = req.params
    const { title, author, body, avatarOld, imgOld } = req.body
    const news = await News.findByPk(id)
    if (req.files) {
      const { img, avatar } = req.files
      let fileName = uuid.v4() + '.jpg'
      if (img) {
        fs.unlink(path.resolve(__dirname, '..', 'static/news', imgOld), function (err) {
          if (err) throw err
          console.log('file deleted')
        })
        await img.mv(path.resolve(__dirname, '..', 'static/news', fileName))
        await news.update({ img: fileName })
      }
      if (avatar) {
        fs.unlink(path.resolve(__dirname, '..', 'static/avatar', avatarOld), function (err) {
          if (err) throw err
          console.log('file deleted')
        })
        await avatar.mv(path.resolve(__dirname, '..', 'static/avatar', fileName))
        await news.update({ avatar: fileName })
      }
    }
    if (!news) {
      throw new Error('?????????????? ???? ??????????????')
    }
    if (title) {
      await news.update({ title })
    }
    if (author) {
      await news.update({ author })
    }
    if (body) {
      await news.update({ body })
    }
    return res.json(news)
  }

  async remove(req, res) {
    const { id, avatar, img } = req.params
    const news = await News.findByPk(id)
    if (news) {
      fs.unlink(path.resolve(__dirname, '..', 'static/avatar', avatar), function (err) {
        if (err) throw err
        console.log('file deleted')
      })
      fs.unlink(path.resolve(__dirname, '..', 'static/news', img), function (err) {
        if (err) throw err
        console.log('file deleted')
      })
      await news.destroy()
    }
    res.status(200).json('?????????????? ????????????')
  }
}

module.exports = new NewsController()
