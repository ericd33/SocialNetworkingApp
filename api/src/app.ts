import express from "express";
import * as dotenv from "dotenv";
import { connectDB } from "./database";
import userRoutes from "./routes/user.routes";
import comment from "./routes/comment.router";
import event from "./routes/events.routes";
import post from "./routes/posts.router";
import cors, { CorsOptions } from "cors";

dotenv.config();
const app = express();
app.use(express.json());

app.set("port", process.env.PORT || 3000);
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
