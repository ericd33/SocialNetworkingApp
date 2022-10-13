import { Router } from "express";
import { addUser, getUser } from "../controllers/userpost.controller";
const router = Router()

router.post('/user', addUser)

router.get('/user', getUser)

export default router;