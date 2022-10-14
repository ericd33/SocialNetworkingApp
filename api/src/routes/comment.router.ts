import { Router } from "express";
import { addComment, GetComment } from "../controllers/comments.controller";
const router = Router()

// router.post('/comments',addComment)
router.route('').post(addComment).get(GetComment);
    

export default router;