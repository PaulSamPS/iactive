const Favourite = require("../models/favourite.model");
const News = require("../models/news.model");
const uuid = require("uuid");

const maxAge = 60 * 60 * 1000 * 24 * 365;
const signed = true;

let favouriteId;

class FavouriteController {
  async get(req, res) {
    if (!req.signedCookies.favouriteId) {
      let created = await new Favourite({ news: [] }).save();
      favouriteId = created._id.toString();
      res.cookie("favouriteId", favouriteId, { maxAge, signed });
    } else {
      favouriteId = req.signedCookies.favouriteId;
    }
    const favouriteNews = await Favourite.findById(favouriteId);
    return res.json(favouriteNews);
  }

  async append(req, res, next) {
    try {
      if (!req.signedCookies.favouriteId) {
        let created = await new Favourite({ news: [] }).save();
        favouriteId = created._id.toString();
        res.cookie("favouriteId", favouriteId, { maxAge, signed });
      } else {
        favouriteId = req.signedCookies.favouriteId;
      }
      const { newsId } = req.params;
      const news = await News.findById(newsId);
      const favouriteNews = await Favourite.findById(favouriteId);
      if (favouriteNews.news.filter((n) => n._id !== newsId)) {
        await favouriteNews.news.push(news);
        await favouriteNews.save();
      }
      return res.json(favouriteNews);
    } catch (e) {
      next(res.send(e.message));
    }
  }

  async remove(req, res) {
    try {
      if (!req.signedCookies.favouriteId) {
        let created = await new Favourite({ news: [] }).save();
        favouriteId = created._id.toString();
        res.cookie("favouriteId", favouriteId, { maxAge, signed });
      } else {
        favouriteId = req.signedCookies.favouriteId;
      }
      const { newsId } = req.params;
      let favourite = await Favourite.findById(favouriteId);
      if (favourite.news.filter((n) => n._id === newsId)) {
        const indexOf = favourite.news.map((n) => n._id).indexOf(newsId);
        favourite.news.splice(indexOf, 1);
        await favourite.save();
      }
      res.json(favourite);
    } catch (e) {
      res.json(e.message);
    }
  }
}

module.exports = new FavouriteController();
