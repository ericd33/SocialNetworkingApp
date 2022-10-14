import { Router } from "express";

import { addUser, findUserAndGetAllUser,  deleteUser} from "../controllers/user.controller";

import { addUser, findUserByName, findUserById  } from "../controllers/user.controller";

const router = Router()

router.route('')
    .post(addUser)

    .get(findUserAndGetAllUser)
    .put(deleteUser)

    .get(findUserByName)

router.route('/:id').get(findUserById)

export default router;