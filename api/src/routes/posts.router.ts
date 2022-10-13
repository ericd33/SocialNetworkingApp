import { Router } from "express";
import { addPost, getPost } from "../controllers/posts.controller";
const router = Router()

router.route('/posts').post(addPost).get(getPost);
    
export default router;