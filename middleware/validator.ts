/* eslint-disable @typescript-eslint/no-explicit-any */ //TODO: FIX TPYES
import { check, validationResult } from "express-validator";

exports.validateUser = [
  check("name")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Name is missing!")
    .isLength({ min: 3, max: 20 })
    .withMessage("Name must be three to 20 characters long!"),
  check("email").normalizeEmail().isEmail().withMessage("Email is invalid"),
  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is missing!")
    .isLength({ min: 8, max: 20 })
    .withMessage("Password must be 8 to 20 characters long!"),
];

exports.validateSignUp = [
  check("email").trim().not().isEmpty().withMessage("No Email Provided"),
  check("password").trim().not().isEmpty().withMessage("Password is missing!"),
];

exports.validate = (req: any, res: any, next: any) => {
  const error = validationResult(req).array();
  if (!error.length) return next();
  res.status(400).json({ success: false, error: error[0].msg });
  return null; // TODO: Not good practice. Implement exception handling later.
};
exports.validateJob = [
  check("postTitle").trim().not().isEmpty().withMessage("Title is missing!"),
  check("compensation")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Compensation is missing!"),
  check("description")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Description is missing!"),
  check("jobCategory")
    .trim()
    .not()
    .isEmpty()
    .withMessage("JobCategory is missing!"),
  check("location").trim().not().isEmpty().withMessage("Location is missing!"),
];
