import { asistEvents, findUserByEmail } from './../controllers/user.controller';
import { Router } from "express";

import { addUser, findUserByName, findUserById , deleteUser, addFriend, findUser } from "../controllers/user.controller";

const router = Router()

router.route('')
    .post(addUser)
    .put(deleteUser)
    .get(findUserByName)
router.route('/:id')
    .get(findUserById)
router.route('/email/:email')
  .get(findUserByEmail)
router.route('/follow')
    .post(addFriend)
router.route('/login')
    .post(findUser)
router.route('/event')
    .post(asistEvents)

    
export default router;