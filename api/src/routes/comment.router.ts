import { Router } from "express";
import {
  addComment,
  deleteComment,
  getCommentPost,
  updateComment,
} from "../controllers/comments.controller";

const router = Router();

router.route("/:idPost").get(getCommentPost);
// router.route("/");
router.route("/:id").put(updateComment);
router.route("/disable").put(deleteComment);
router.route("/new").post(addComment);

export default router;
