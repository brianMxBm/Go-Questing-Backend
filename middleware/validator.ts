// Express Types
import { Request, Response, NextFunction } from "express";

import { check, validationResult } from "express-validator";

// Express - Validation middleware
const validateResult = (req: Request, res: Response, next: NextFunction) => {
  const error = validationResult(req).array();

  if (!error.length) return next();

  res.status(400).json({ success: false, error: error[0].msg });
  throw new Error(error[0].msg);
};

// Express - Register body shape validator
const registerShapeValidator = [
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

// Express - Login body shape validator
const loginShapeValidator = [
  check("email").trim().not().isEmpty().withMessage("No Email Provided"),
  check("password").trim().not().isEmpty().withMessage("Password is missing!"),
];

// Express - Password body shape validator
const passwordShapeValidator = [
  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is missing!")
    .isLength({ min: 8, max: 20 })
    .withMessage("Password must be 8 to 20 characters long!"),
];

// Express - Job body shape validator
const jobValidator = [
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
  check("location").not().isEmpty().withMessage("Location is missing!"),
];

export {
  validateResult,
  registerShapeValidator,
  loginShapeValidator,
  passwordShapeValidator,
  jobValidator,
};
