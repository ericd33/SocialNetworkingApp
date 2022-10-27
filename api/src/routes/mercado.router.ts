import { Router } from "express";
import { mercado, notification, susrciption } from "../controllers/mercado.controller";
const router = Router()



router.post('/',mercado)
router.post("/suscripcion",susrciption)
router.get("/notificacion",notification)

export default router;
