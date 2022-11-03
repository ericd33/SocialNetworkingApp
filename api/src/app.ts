import express from "express";
import * as dotenv from "dotenv";
import { connectDB } from "./database";
import userRoutes from "./routes/user.routes";
import comment from "./routes/comment.router";
import event from "./routes/events.routes";
import post from "./routes/posts.router";
import opinion from "./routes/opinions.router";
import mercado from "./routes/mercado.router";
const mercadopago = require("mercadopago");
const cors = require("cors");
const middleware = require("./middleware");
const bodyParser = require("body-parser");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
import path from "path";
const paypal = require("./routes/paypal.route");
dotenv.config();
const app = express();
app.use(express.json());

import { Server as socketServer } from "socket.io";
import http from "http";
// import { createPayment } from "./controllers/paypal.controller";
// import { notification } from "./controllers/mercado.controller";
// import { notification } from "./controllers/mercado.controller";

const server = http.createServer(app);

const io = new socketServer(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());

// app.post("/create-payment",createPayment)

io.on("connection", (socket) => {
  socket.on("message", (message) => {
    socket.broadcast.emit("message", {
      body: message,
      from: "Anonimo",
    });
  });
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("port", process.env.PORT || 3000);
mercadopago.configure({
  access_token:
  "APP_USR-8366918559204641-102119-b46a91ed28fa4f1cca1b56502af532a5-1222629415",
});
server.listen(process.env.PORT, () => {
  connectDB();
});
app.use("/mercado", mercado);

app.use("/paypal",paypal)
app.use("/opinions", opinion);




app.use(middleware.decodeToken);

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (res: any, file: any, cb: any) => {
    console.log(res, file);
    cb(null, new Date().getTime() + path.extname(file.originalname));
  },
});
export const upload = multer({ storage: storage });
// app.use(multer({storage}).single('imageCloudinary'))

// app.listen(app.get("port"), () => {
//   connectDB();
// });

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_KEY_SECRET,
  secure: true,
});

app.use("/comments", comment);
app.use("/users", userRoutes);
app.use("/events", event);
app.use("/posts", upload.single("imageCloudinary"), post);


