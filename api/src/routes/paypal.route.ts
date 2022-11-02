import { Router } from "express";
import { captureOrder, createPayment } from "../controllers/paypal.controller";
const router = Router();



router.route("/create-order").post(createPayment)
router.route("/capture-order").get(captureOrder)
router.route("/cancel-order")

// export default router;
module.exports = router;

