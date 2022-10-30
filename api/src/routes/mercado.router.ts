import { Router } from "express";
import { mercado,  notification,  susciption , success} from "../controllers/mercado.controller";
const router = Router()



router.route('/').get(mercado)
router.route("/suscripcion").post(susciption)
router.route("/notificacion/:id").post(notification)
router.route("/success").get(success)
export default router;
