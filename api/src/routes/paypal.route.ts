import { Router } from "express";
import { cancel, captureOrder, captureOrderDonations, createDonations, createPayment } from "../controllers/paypal.controller";
const router = Router();


router.route("/donations").post(createDonations) 
router.route("/create-order").post(createPayment)
router.route("/capture-order").get(captureOrder)
router.route("/capture-order-donations").get(captureOrderDonations)
router.route("/cancel-order").get(cancel)
// export default router;
module.exports = router;

