const newsHandlers = require("./handlers/news.handler");

module.exports = function onConnection(io, socket) {
  newsHandlers(io, socket);
};
