import { Router } from "express";
import { mercado } from "../controllers/mercado.controller";
const router = Router()



router.post('/',mercado)

export default router;
