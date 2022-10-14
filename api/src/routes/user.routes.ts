import { Router } from "express";
import { addUser, findUserAndGetAllUser,  deleteUser} from "../controllers/user.controller";
const router = Router()

router.route('')
    .post(addUser)
    .get(findUserAndGetAllUser)
    .put(deleteUser)

export default router;