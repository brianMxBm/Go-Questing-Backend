import mongoose from "mongoose";

export interface IJob extends mongoose.Document {
  postTitle: string;
  description: string;
  compensation: string;
  address: string;
  jobCategory: string;
  latitude: string;
  longitude: string;
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
  address: {
    type: String,
    required: true,
    default: "",
  },
  jobCategory: {
    type: String,
    required: true,
  },
  latitude: {
    type: String,
    required: true,
  },
  longitude: {
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
