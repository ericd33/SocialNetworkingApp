import { Router } from "express";
import {
  addOpinion,
  getOpinions,
  getAllOpinions
} from "../controllers/opinions.controller";

const router = Router();

router.route("/newOpinion").post(addOpinion);
router.route("/getOpinions").get(getOpinions);
router.route("/getAllOpinions").get(getAllOpinions);

export default router;