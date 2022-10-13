import { Router } from "express";
import { addEvent, findEvent } from "../controllers/events.controllers";

const router = Router()

router.route('/event')
    .post(addEvent)
    .get(findEvent)

export default router;