import mongoose from "mongoose";

export interface IJob extends mongoose.Document {
  postTitle: string;
  description: string;
  compensation: string;
  address: string;
  jobCategory: string;
  location: {
    type: string;
    coordinates: number[];
  };
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
  location: {
    type: { type: String },
    coordinates: [Number],
  },
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true,
  //   ref: "User",
  // },
});
jobSchema.index({ location: "2dsphere" });
const Job = mongoose.model("Job", jobSchema);

export default Job;
