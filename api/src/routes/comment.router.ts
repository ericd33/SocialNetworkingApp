import { Router } from "express";
import { addComment } from "../controllers/comments.controller";
const router = Router()

router.post('/comments',addComment)
    

export default router;