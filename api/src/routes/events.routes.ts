import { Router } from "express";
import { addEvent, deleteEvent, findEvent, findEventById, addEventParticipant } from "../controllers/events.controllers";
// updateEvent
const router = Router()

router.route('')
    .post(addEvent)
    .get(findEvent)
    // .put(updateEvent)
    .put(deleteEvent)
    

router.route('/:id')
    .get(findEventById)
    .put(addEventParticipant)

export default router;