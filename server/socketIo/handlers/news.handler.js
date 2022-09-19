const News = require("../../models/news.model");

module.exports = function followersHandlers(io, socket) {
  socket.on("news-all:get", async () => {
    const news = await News.find();
    socket.emit("news-all:sent", { news });
  });
};
