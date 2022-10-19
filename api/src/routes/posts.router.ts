import { Router } from "express";
import {
  addPost,
  getPost,
  putPostLikes,
  putPostById,
  findPostsByEmail
} from "../controllers/posts.controller";
const router = Router();

router.route("/").get(getPost).put(putPostById).post(addPost);
router.route("/:idPost").put(putPostLikes)
router.route("/email/:email").get(findPostsByEmail);


export default router;
