const News = require('../models/news.model')
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
      const news = await News.findById(id)
      return res.json(news)
    } catch (e) {
      next(res.json(e.message))
    }
  }

  async update(req, res) {
    const { id } = req.params
    const { title, author, body, avatarOld, imgOld } = req.body
    const news = await News.findById(id)
    if (req.files) {
      const { img, avatar } = req.files
      let fileName = uuid.v4() + '.jpg'
      if (img) {
        fs.unlink(path.resolve(__dirname, '..', 'static/news', imgOld), function (err) {
          if (err) throw err
          console.log('file deleted')
        })
        await img.mv(path.resolve(__dirname, '..', 'static/news', fileName))
        news.img = fileName
        await news.save()
      }
      if (avatar) {
        fs.unlink(path.resolve(__dirname, '..', 'static/avatar', avatarOld), function (err) {
          if (err) throw err
          console.log('file deleted')
        })
        await avatar.mv(path.resolve(__dirname, '..', 'static/avatar', fileName))
        news.avatar = fileName
        await news.save()
      }
    }
    if (!news) {
      throw new Error('Новость не найдена')
    }
    if (title) {
      news.title = title
      await news.save()
    }
    if (author) {
      news.author = author
      await news.save()
    }
    if (body) {
      news.body = body
      await news.save()
    }
    return res.json(news)
  }

  async remove(req, res) {
    const { id, avatar, img } = req.params
    const news = await News.findById(id)
    if (news) {
      fs.unlink(path.resolve(__dirname, '..', 'static/avatar', avatar), function (err) {
        if (err) throw err
        console.log('file deleted')
      })
      fs.unlink(path.resolve(__dirname, '..', 'static/news', img), function (err) {
        if (err) throw err
        console.log('file deleted')
      })
      await news.deleteOne()
    }
    res.status(200).json('Продукт удалён')
  }
}

module.exports = new NewsController()
