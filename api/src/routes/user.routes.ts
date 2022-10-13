import { Router } from "express";
import { addUser, getUser } from "../controllers/userpost.controller";
const router = Router()

router.route('/user')
    .post(addUser)
    .get(getUser)

export default router;