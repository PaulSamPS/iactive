const favouriteService = require('../services/favouriteService')
const { Favourite } = require('../models/models')

const maxAge = 60 * 60 * 1000 * 24 * 365 // один год
const signed = true

class FavouriteController {
  async get(req, res) {
    try {
      let favourite
      if (req.signedCookies.favouriteId) {
        favourite = await favouriteService.get(parseInt(req.signedCookies.favouriteId))
      } else {
        favourite = await Favourite.create()
      }
      res.cookie('favouriteId', favourite.id, { maxAge, signed })
      res.json(favourite)
    } catch (e) {
      res.json(e.message)
    }
  }

  async append(req, res, next) {
    try {
      let favouriteId
      if (!req.signedCookies.favouriteId) {
        let created = await Favourite.create()
        favouriteId = created.id
      } else {
        favouriteId = parseInt(req.signedCookies.favouriteId)
      }
      const { newsId } = req.params
      const favourite = await favouriteService.append(favouriteId, newsId, res)
      res.cookie('favouriteId', favourite.id, { maxAge, signed })
      return res.json(favourite)
    } catch (e) {
      next(res.send(e.message))
    }
  }

  async remove(req, res) {
    try {
      let favouriteId
      if (!req.signedCookies.favouriteId) {
        let created = await Favourite.create()
        favouriteId = created.id
      } else {
        favouriteId = parseInt(req.signedCookies.favouriteId)
      }
      const favourite = await favouriteService.remove(favouriteId, req.params.newsId)
      res.cookie('favouriteId', favourite.id, { maxAge, signed })
      res.json(favourite)
    } catch (e) {
      res.json(e.message)
    }
  }
}

module.exports = new FavouriteController()
