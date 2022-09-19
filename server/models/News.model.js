const { Schema, model } = require("mongoose");

const NewsSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    body: { type: String, required: true },
    avatar: { type: String },
    img: { type: String },
    isFavourite: { type: Boolean, defaultValue: false },
  },
  { timestamps: true }
);

module.exports = model("News", NewsSchema);
