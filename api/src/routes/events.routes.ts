import { Router } from "express";
import { addEvent, findEvent, updateEvent, } from "../controllers/events.controllers";

const router = Router()

router.route('')
    .post(addEvent)
    .get(findEvent)
    .put(updateEvent)
export default router;