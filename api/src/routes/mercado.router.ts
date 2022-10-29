import { Router } from "express";
import { mercado,  notification,  susciption } from "../controllers/mercado.controller";
const router = Router()



router.post('/',mercado)
router.post("/suscripcion",susciption)
router.post("/notificacion/:id",notification)

export default router;
