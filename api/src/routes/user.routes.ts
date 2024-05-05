
import { Router } from "express";

import { addUser, findUserByName, findUserById, deleteUser, addFriend, findUser, editPresentation, addFavorite, asistEvents, editImage, editName, editWebSite, findUserByEmail, myUser, shops } from "../controllers/user.controller";

const router = Router()

router.route('')
    .post(addUser)
    .put(deleteUser)
    .get(findUserByName)
router.route("/myUser")
    .get(myUser)

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
router.route("/addFavorite")
    .post(addFavorite)
router.route("/shop")
    .post(shops)

    router.route('/:id')
    .get(findUserById)

export default router;
