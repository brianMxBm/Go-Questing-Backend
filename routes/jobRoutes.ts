import { Router } from "express";

import { createJob } from "../controllers/jobController";
import { isAuthenticated } from "../middleware/auth";
import { jobValidator } from "../middleware/validator";

const router = Router();

router.post("/postJob", isAuthenticated, jobValidator, createJob);

export default router;
