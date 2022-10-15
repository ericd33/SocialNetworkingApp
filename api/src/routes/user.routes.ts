import { findUserByEmail } from './../controllers/user.controller';
import { Router } from "express";

import { addUser, findUserByName, findUserById , deleteUser, addFriend } from "../controllers/user.controller";

const router = Router()

router.route('')
    .post(addUser)
    .put(deleteUser)
    .get(findUserByName)

router.route('/:id').get(findUserById)
router.route('/email/:email').get(findUserByEmail)
router.route('/follow')
    .post(addFriend)
export default router;