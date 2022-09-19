const Favourite = require("../../models/favourite.model");
const uuid = require("uuid");

module.exports = function favouriteHandler(io, socket) {
  socket.on("favourite-all:get", async () => {
    await new Favourite({ id: uuid.v4(), notifications: [] }).save();
    const favourite = await Favourite.find();
    socket.emit("favourite-all:sent", { favourite });
  });
};
