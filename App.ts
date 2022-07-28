/* eslint-disable @typescript-eslint/no-var-requires */ //TODO: Fix Imports
const express = require("express");
const userRouter = require("./routes/user");
const jobRouter = require("./routes/jobs");
require("dotenv").config();
require("./database/");
const app = express();

const PORT = process.env.PORT || 8000; //TODO: Remove in production

app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/jobs", jobRouter);

app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});
