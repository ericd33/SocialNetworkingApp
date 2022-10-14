import { Router } from "express";
import { addUser, findUserByName, findUserById  } from "../controllers/user.controller";
const router = Router()

router.route('')
    .post(addUser)
    .get(findUserByName)

router.route('/:id').get(findUserById)

export default router;