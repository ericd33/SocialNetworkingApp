import express from "express";
import * as dotenv from "dotenv";
import { connectDB } from "./database";
import userRoutes from "./routes/user.routes";
import comment from "./routes/comment.router";
import event from "./routes/events.routes";
import post from "./routes/posts.router";
import mercado  from "./routes/mercado.router";
const mercadopago = require("mercadopago");
const cors = require('cors')
const middleware = require('./middleware')
const bodyParser = require("body-parser")
dotenv.config();
const app = express();
app.use(express.json());

app.set("port", process.env.PORT || 3000);
app.listen(app.get("port"), () => {
  console.log(`Server listening on port ${app.get("port")}`);
  connectDB();
});

// TODO: Implement configurations for CORS
mercadopago.configure({
  access_token : "APP_USR-7590321752100063-102008-e7aaefd92f008b7b276c2a0e7db58620-1221485770"
})

app.use(cors({origin: "*"}));
app.use(middleware.decodeToken)
app.use(bodyParser.urlencoded({extended: false}))
   

app.use("/comments", comment);
app.use("/users", userRoutes);
app.use("/events", event);
app.use("/posts", post);
app.use('/mercado',mercado)
