/* eslint-disable @typescript-eslint/no-explicit-any */ //TODO: FIX TYPES
/* eslint-disable @typescript-eslint/no-var-requires */ //TODO: REMOVE

const Job = require("../schemas/jobSchema");
exports.createJob = async (req: any, res: any) => {
  //TODO: Change Types.
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
