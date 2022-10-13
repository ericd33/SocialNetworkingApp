import { Router } from "express";
import { signIn, signUp } from "../controllers/user.controller";
const router = Router()

router.post('/singup', signUp)
router.post('/singin', signIn)


export default router;