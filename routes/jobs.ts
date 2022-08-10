/* eslint-disable @typescript-eslint/no-var-requires */
const jobrouter = require("express").Router();
const { createJob } = require("../controllers/jobs");

const { validateJob } = require("../middleware/validator");

jobrouter.post("/postJob", validateJob, createJob);

module.exports = jobrouter;
