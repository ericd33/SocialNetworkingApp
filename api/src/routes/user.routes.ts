import { Router } from "express";
import { addUser, findUserAndGetAllUser,  } from "../controllers/user.controller";
const router = Router()

router.route('')
    .post(addUser)
    .get(findUserAndGetAllUser)

export default router;