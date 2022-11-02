import { Router } from "express";
import {
  addOpinion,
  getOpinions
} from "../controllers/opinions.controller";

const router = Router();

router.route("/newOpinion").post(addOpinion);
router.route("/getOpinions").get(getOpinions);

export default router;