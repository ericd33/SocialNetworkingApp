import { asistEvents, editImage, editName, editWebSite, findUserByEmail } from './../controllers/user.controller';
import { Router } from "express";

import { addUser, findUserByName, findUserById , deleteUser, addFriend, findUser,editPresentation } from "../controllers/user.controller";

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
router.route('/editProfile/image')
    .put(editImage)
router.route('/editProfile/name')
    .put(editName)
router.route('/editProfile/presentation')
    .put(editPresentation)
router.route('/editProfile/website')
    .put(editWebSite)
export default router;