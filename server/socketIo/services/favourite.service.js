const getAllFavourite = async () => {
  if (!req.signedCookies.favouriteId) {
    let created = await new Favourite({ id: uuid.v4(), news: [] }).save();
    favouriteId = created.id;
    res.cookie("favouriteId", favouriteId, { maxAge, signed });
  } else {
    favouriteId = parseInt(req.signedCookies.favouriteId);
  }
};

module.exports = { getAllFavourite };
