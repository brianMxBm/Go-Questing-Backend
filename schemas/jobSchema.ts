import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
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
  /*user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },*/
});

module.exports = mongoose.model("Job", jobSchema);
