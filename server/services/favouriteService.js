const { Favourite, News, FavouriteNews } = require('../models/models')

const pretty = (favourite) => {
  const data = {}
  data.id = favourite.id
  data.news = []
  if (favourite.news) {
    data.news = favourite.news.map((item) => {
      return {
        id: item.id,
        title: item.name,
        author: item.author,
        body: item.body,
        avatar: item.avatar,
        img: item.img,
      }
    })
  }
  return data
}

class FavouriteService {
  async getFavourite(favouriteId) {
    let favourite = await Favourite.findByPk(favouriteId, {
      attributes: ['id'],
      include: [{ model: News, attributes: ['id', 'title', 'author', 'body', 'avatar', 'img'] }],
    })
    if (!favourite) {
      favourite = await Favourite.create()
    }
    return pretty(favourite)
  }

  async append(favouriteId, newsId, res) {
    let favourite = await Favourite.findByPk(favouriteId, {
      attributes: ['id'],
      include: [{ model: News, attributes: ['id', 'title', 'author', 'body', 'avatar', 'img'] }],
    })
    if (!favourite) {
      favourite = await Favourite.create()
    }
    await FavouriteNews.create({ favouriteId, newsId })
    const news = await News.findByPk(newsId)
    console.log(news)
    news.isFavourite = true
    await news.save()
    await favourite.reload()
    return pretty(favourite)
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
    return pretty(favourite)
  }
}

module.exports = new FavouriteService()
