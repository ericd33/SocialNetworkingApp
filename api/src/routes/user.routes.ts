import { Router } from "express";
import { addUser, findUserAndGetAllUser,  } from "../controllers/userpost.controller";
const router = Router()

router.route('/user')
    .post(addUser)
    .get(findUserAndGetAllUser)

export default router;