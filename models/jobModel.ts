import mongoose from "mongoose";

export interface IJob extends mongoose.Document {
  postTitle: string;
  description: string;
  compensation: string;
  location: string;
  jobCategory: string;
}

const jobSchema = new mongoose.Schema<IJob>({
  postTitle: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  compensation: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
    default: "",
  },
  jobCategory: {
    type: String,
    required: true,
  },
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true,
  //   ref: "User",
  // },
});

const Job = mongoose.model("Job", jobSchema);

export default Job;
