/* eslint-disable @typescript-eslint/no-var-requires */ //TODO: REMOVE
import Express from "express";
const Job = require("../schemas/jobSchema");
exports.createJob = async (req: Express.Request, res: Express.Response) => {
  const { postTitle, description, compensation, location, jobCategory } =
    req.body;

  const newJob = new Job({
    postTitle,
    description,
    compensation,
    location,
    jobCategory,
  });

  await newJob.save();

  res.json({
    success: true,
    job: {
      postTitle: newJob.postTitle,
      description: newJob.description,
      compensation: newJob.compensation,
      location: newJob.location,
      jobCategory: newJob.jobCategory,
    },
  });
  return null; // TODO: Not good practice. Implement exception handling later.
};
