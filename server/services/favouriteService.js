const { Favourite, News, FavouriteNews } = require('../models/models')

const pretty = (favourite) => {
  const data = {}
  data.id = favourite.id
  data.news = []
  if (favourite.news) {
    data.news = favourite.news.map((item) => {
      return {
        id: item.id,
        title: item.title,
        author: item.author,
        body: item.body,
        avatar: item.avatar,
        img: item.img,
        isFavourite: item.isFavourite,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      }
    })
  }
  return data
}

class FavouriteService {
  async get(favouriteId) {
    let favourite = await Favourite.findByPk(favouriteId, {
      attributes: ['id'],
      include: [{ model: News, attributes: ['id', 'title', 'author', 'body', 'avatar', 'img', 'isFavourite', 'createdAt', 'updatedAt'] }],
    })
    if (!favourite) {
      favourite = await Favourite.create()
    }
    return pretty(favourite)
  }

  async append(favouriteId, newsId) {
    let favourite = await Favourite.findByPk(favouriteId, {
      attributes: ['id'],
      include: [{ model: News, attributes: ['id', 'title', 'author', 'body', 'avatar', 'img', 'isFavourite', 'createdAt', 'updatedAt'] }],
    })
    await FavouriteNews.create({ favouriteId, newsId })
    await favourite.reload()
    return pretty(favourite)
  }

  async remove(favouriteId, newsId) {
    let favourite = await Favourite.findByPk(favouriteId, {
      include: [{ model: News, as: 'news' }],
    })
    const favouriteNews = await FavouriteNews.findOne({
      where: { favouriteId, newsId },
    })
    if (favouriteNews) {
      await favouriteNews.destroy()
      await favourite.reload()
    }
    return pretty(favourite)
  }
}

module.exports = new FavouriteService()
