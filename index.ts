import express from "express";
import dotenv from "dotenv";

import { connectDB } from "./config/db";

import userRoutes from "./routes/userRoutes";
import jobRoutes from "./routes/jobRoutes";

dotenv.config();
connectDB();
const app = express();

// @TODO - Remove in production
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use("/api/user", userRoutes);
app.use("/api/jobs", jobRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
