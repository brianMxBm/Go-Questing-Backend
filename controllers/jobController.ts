import Job from "../models/jobModel";

import { sendError } from "../utils/helper";

import { Request, Response } from "express";
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

// @desc    Get nearby jobs
// @route   GET /api/jobs/getJobs
// @access  Public
const getJobs = async (req: Request, res: Response) => {
  try {
    const { latitude, longitude } = req.query;
    if (!latitude || !longitude) return sendError(res, "Invalide Coordinates");

    const jobs = await Job.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [+longitude, +latitude],
          },
          distanceField: "dist.calculated",
          includeLocs: "dist.location",
          spherical: true,
        },
      },
    ]);

    res.json({
      success: true,
      jobs,
    });

    if (!jobs) return sendError(res, "no jobs in local area");
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

export { createJob, getJobs };
