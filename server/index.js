require("dotenv").config();
const express = require("express");
const connectDb = require("./db");
const connection = require("./socketIo/connection");
const cors = require("cors");
const router = require("./routes/index");
const path = require("path");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const { createServer } = require("http");
const { Server } = require("socket.io");

const PORT = process.env.PORT || 5000;

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: process.env.CLIENT_URL, methods: ["GET", "POST"] },
  serveClient: false,
});
app.use(cookieParser(process.env.SECRET_COOKIE));
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "static")));
app.use(fileUpload({}));
app.use("/api", router);

io.on("connection", (socket) => {
  connection(io, socket);
});

const start = async () => {
  try {
    await connectDb();
    httpServer.listen(PORT, () =>
      console.log(`Сервер запущен на порту ${PORT}`)
    );
  } catch (e) {
    console.log(e);
  }
};

start();
