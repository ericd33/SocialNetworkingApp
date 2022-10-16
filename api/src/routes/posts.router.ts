import { Router } from "express";
import { addPost, getPost, putPostById } from "../controllers/posts.controller";
const router = Router();

router.route("/").post(addPost).get(getPost).put(putPostById);

export default router;
