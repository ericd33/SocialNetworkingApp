import express from "express";
import * as dotenv from "dotenv";
import { connectDB } from "./database";
import userRoutes from "./routes/user.routes";
import comment from "./routes/comment.router";
import event from "./routes/events.routes";
import post from "./routes/posts.router";
import cors, { CorsOptions } from "cors";
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');
var guard = require('express-jwt-permissions');
dotenv.config();
const app = express();
app.use(express.json());


var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: 'https://dev-enivvd-z.us.auth0.com/.well-known/jwks.json'
}),
audience: 'http://www.henrypfauth.com',
issuer: 'https://dev-enivvd-z.us.auth0.com/',
algorithms: ['RS256']
});
app.use(jwtCheck);
app.set("port", process.env.PORT);
app.listen(app.get("port"), () => {
  console.log(`Server listening on port ${app.get("port")}`);
  connectDB();
});

// TODO: Implement configurations for CORS
const corsOptions: CorsOptions = {};

app.use(cors(corsOptions));

app.use("/comments", comment);
app.use("/users", userRoutes);
app.use("/events", event);
app.use("/posts", post);
