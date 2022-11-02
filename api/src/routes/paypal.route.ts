import { Router } from "express";
import { captureOrder, captureOrderDonations, createDonations, createPayment } from "../controllers/paypal.controller";
const router = Router();


router.route("/donations").post(createDonations) 
router.route("/create-order").post(createPayment)
router.route("/capture-order").get(captureOrder)
router.route("/capture-order-donations").get(captureOrderDonations)
router.route("/cancel-order")
// export default router;
module.exports = router;

