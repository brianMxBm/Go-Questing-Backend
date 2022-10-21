import { Router } from "express";

import { isAuthenticated } from "../middleware/auth";
import { createJob, getJobs } from "../controllers/jobController";
import { jobValidator } from "../middleware/validator";

const router = Router();

router.post("/postJob", isAuthenticated, jobValidator, createJob);

router.get("/getJobs", getJobs);

export default router;
