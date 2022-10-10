import { Router } from "express";

import { createJob } from "../controllers/jobController";
import { jobValidator } from "../middleware/validator";

const router = Router();

router.post("/postJob", jobValidator, createJob);

export default router;
