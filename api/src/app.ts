import express from "express";
import * as dotenv from "dotenv";
import { connectDB } from "./database";
import userRoutes from "./routes/user.routes";
import comment from "./routes/comment.router";
import event from "./routes/events.routes";
import post from "./routes/posts.router";
import mercado from "./routes/mercado.router";
const mercadopago = require("mercadopago");
const cors = require("cors");
const middleware = require("./middleware");
const bodyParser = require("body-parser");

dotenv.config();
const app = express();
app.use(express.json());

import { Server as socketServer } from "socket.io";
import http from "http";

const server = http.createServer(app);
const io = new socketServer();

app.use(cors());

io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("message", (message) => {
    console.log(message);
    socket.broadcast.emit("message", {
      body: message,
      from: socket.id,
    });
  });
});

server.listen(process.env.PORT, () => {
  connectDB();
});

app.use(cors());
app.use(middleware.decodeToken)
app.use(bodyParser.urlencoded({extended: false}))

app.set("port", process.env.PORT || 3000);
// app.listen(app.get("port"), () => {
//   console.log(`Server listening on port ${app.get("port")}`);
//   connectDB();
// });

mercadopago.configure({
  access_token:
    "APP_USR-8366918559204641-102119-b46a91ed28fa4f1cca1b56502af532a5-1222629415",
});

app.use("/comments", comment);
app.use("/users", userRoutes);
app.use("/events", event);
app.use("/posts", post);
app.use("/mercado", mercado);
