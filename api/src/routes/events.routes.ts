import { Router } from "express";
import { addEvent, deleteEvent, findEvent, updateEvent, } from "../controllers/events.controllers";

const router = Router()

router.route('/event')
    .post(addEvent)
    .get(findEvent)
    .put(updateEvent)
    .delete(deleteEvent)
export default router;