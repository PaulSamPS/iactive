const { Favourite, News, FavouriteNews } = require('../models/models')

class FavouriteService {
  async getFavourite(favouriteId) {
    let basket = await Favourite.findByPk(favouriteId, {
      attributes: ['id'],
      include: [{ model: News, attributes: ['id', 'title', 'author', 'body', 'avatar', 'img'] }],
    })
    if (!basket) {
      basket = await Favourite.create()
    }
    return basket
  }

  async append(favouriteId, newsId, res) {
    let favourite = await Favourite.findByPk(favouriteId, {
      attributes: ['id'],
      include: [{ model: News, attributes: ['id', 'title', 'author', 'body', 'avatar', 'img'] }],
    })
    if (!favourite) {
      favourite = await Favourite.create()
    }
    const favouriteReq = await Favourite.findByPk(newsId)
    if (!favouriteReq) {
      res.status(500).send('Новости с таким id не найдено')
    }
    await FavouriteNews.create({ favouriteId, newsId })
    await favourite.reload()
    return favourite
  }

  async remove(favouriteId, newsId) {
    let favourite = await Favourite.findByPk(favouriteId, {
      include: [{ model: News, as: 'news' }],
    })
    if (!favourite) {
      favourite = await Favourite.create()
    }
    const favouriteNews = await FavouriteNews.findOne({
      where: { favouriteId, newsId },
    })
    if (favouriteNews) {
      await favouriteNews.destroy()
      await favourite.reload()
    }
    return favourite
  }
}

module.exports = new FavouriteService()
