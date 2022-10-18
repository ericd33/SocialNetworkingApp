import { Router } from "express";
import {
  addPost,
  getPost,
  putPostLikes,
  putPostById,
} from "../controllers/posts.controller";
const router = Router();

router.route("/").get(getPost).put(putPostById).post(addPost);
router.route("/:idPost").put(putPostLikes);

export default router;
