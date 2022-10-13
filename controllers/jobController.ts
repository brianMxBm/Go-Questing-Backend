import Job from "../models/jobModel";

import { sendError } from "../utils/helper";

import { Request, Response } from "express";

// @desc    Create a job listing
// @route   POST /api/jobs/postJob
// @access  Private
const createJob = async (req: Request, res: Response) => {
  try {
    const {
      postTitle,
      description,
      compensation,
      address,
      jobCategory,
      latitude,
      longitude,
    } = req.body;

    if (
      !postTitle ||
      !description ||
      !compensation ||
      !address ||
      !jobCategory ||
      !latitude ||
      !longitude
    ) {
      return sendError(res, "Please provide a value for all fields!");
    }

    const job = new Job({
      postTitle,
      description,
      compensation,
      address,
      jobCategory,
      latitude,
      longitude,
    });

    await job.save();

    res.json({
      success: true,
      job,
    });
  } catch (e) {
    if (typeof e === "string") {
      sendError(res, "Something went wrong", 500);
      throw new Error(e);
    } else if (e instanceof Error) {
      sendError(res, "Something went wrong", 500);
      throw new Error(e.message);
    }
  }
};

export { createJob };
