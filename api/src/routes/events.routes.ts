import { Router } from "express";
import { addEvent, deleteEvent, findEvent, findEventById, updateEvent, addEventParticipant } from "../controllers/events.controllers";

const router = Router()

router.route('')
    .post(addEvent)
    .get(findEvent)
    .put(updateEvent)
    .patch(deleteEvent)

router.route('/:id')
    .get(findEventById)
    .put(addEventParticipant)
    
export default router;