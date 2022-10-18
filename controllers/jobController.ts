import Job from "../models/jobModel";

import { sendError } from "../utils/helper";

import { Response } from "express";
import { CustomExpressRequest } from "../types/requestTypes";

// @desc    Create a job listing
// @route   POST /api/jobs/postJob
// @access  Private
const createJob = async (req: CustomExpressRequest, res: Response) => {
  try {
    const user = req.user;
    if (!user)
      return sendError(res, "You must be logged in to perform this action!");

    const {
      postTitle,
      description,
      compensation,
      address,
      jobCategory,
      location,
    } = req.body;

    if (
      !postTitle ||
      !description ||
      !compensation ||
      !address ||
      !jobCategory ||
      !location
    ) {
      return sendError(res, "Please provide a value for all fields!");
    }

    const job = new Job({
      user: user.id,
      postTitle,
      description,
      compensation,
      address,
      jobCategory,
      location,
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
