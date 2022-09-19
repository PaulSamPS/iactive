const { Schema, model } = require("mongoose");

const FavouriteSchema = new Schema({
  news: [],
});

module.exports = model("Favourite", FavouriteSchema);
