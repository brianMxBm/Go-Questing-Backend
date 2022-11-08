import dotenv from "dotenv";
import { faker } from "@faker-js/faker";

import User from "../models/userModel";
import Job from "../models/jobModel";

import USERS from "./tempUsers";
import JOBS from "./tempJobs";

import { connectDB } from "../config/db";

dotenv.config();
connectDB();

const JOB_CATEGORIES = ["Auto Repair", "Yard Work", "Plumbing", "Painting"];

Promise.resolve(User.create(USERS)).then((users) => {
  const newJobs = JOBS.map((job) => ({
    ...job,
    user: users[Math.floor(Math.random() * USERS.length)]._id,
    jobCategory:
      JOB_CATEGORIES[Math.floor(Math.random() * JOB_CATEGORIES.length)],
    address: faker.address.streetAddress(),
    location: {
      type: "Point",
      coordinates: [
        +faker.address.longitude(-118.493565, -118.562101, 6),
        +faker.address.latitude(34.257276, 34.228291, 6),
      ],
    },
  }));

  Job.create(newJobs).then(() => {
    console.log(
      "🔥 Random users and jobs seeded succesfully! Enjoy the rest of your day! 😊"
    );
    process.exit();
  });
});
