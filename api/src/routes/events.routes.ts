import { Router } from "express";
import { addEvent } from "../controllers/events.controllers";

const router = Router()

router.route('/event')
    .post(addEvent)

export default router;