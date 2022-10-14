import { Router } from "express";

import { addUser, findUserByName, findUserById , deleteUser } from "../controllers/user.controller";

const router = Router()

router.route('')
    .post(addUser)
    .put(deleteUser)
    .get(findUserByName)

router.route('/:id').get(findUserById)

export default router;