import { Router } from "express";

import { createJob, getJobs } from "../controllers/jobController";
import { jobValidator } from "../middleware/validator";

const router = Router();

router.post("/postJob", jobValidator, createJob);

router.get("/getJobs", getJobs);

export default router;
