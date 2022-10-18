import { Router } from "express";
import {
  addComment,
  deleteComment,
  getComment,
  updateComment,
} from "../controllers/comments.controller";

const router = Router();

router.route("/").get(getComment);
router.route("/:id").put(updateComment).put(deleteComment);
router.route("/new").post(addComment);

export default router;
