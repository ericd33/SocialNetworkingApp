import { Router } from "express";
import {
  addPost,
  getPost,
  putPostLikes,
  putPostById,
  findPostsByEmail,
  putPostComment,
  reports,
  paginate,
} from "../controllers/posts.controller";
const router = Router();

router.route("/").get(getPost).put(putPostById).post(addPost);
router.route("/:idPost").put(putPostLikes);
router.route("/:postId/comment").put(putPostComment);
router.route("/email/:email").get(findPostsByEmail);
router.route("/report/post").post(reports)
router.route("/paginate").post(paginate)
export default router;
