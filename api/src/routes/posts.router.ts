import { Router } from "express";
import {
  addPost,
  getPost,
  putPostLikes,
  putPostById,
  findPostsByEmail,
  putPostComment,
  reports,
  addfile,
  paginate,
  putPostContent,
  getPostbyID,
} from "../controllers/posts.controller";
const router = Router();

router.route("/").get(getPost).put(putPostById).post(addPost);
router.route("/:idPost").put(putPostLikes).get(getPostbyID);
router.route("/:postId/comment").put(putPostComment);
router.route("/:postId/content").put(putPostContent);
router.route("/email/:email").get(findPostsByEmail);
router.route("/report/post").post(reports)
router.route('/file').post(addfile)

router.route("/paginate").post(paginate)

export default router;
