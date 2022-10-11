import { Router } from "express";

import {
  createUser,
  signin,
  verifyEmail,
  forgotPassword,
  resetPassword,
} from "../controllers/userController";

import { isResetTokenValid } from "../middleware/user";
import {
  validateResult,
  registerShapeValidator,
  loginShapeValidator,
  passwordShapeValidator,
} from "../middleware/validator";

const router = Router();

router.post("/create", registerShapeValidator, validateResult, createUser);
router.post("/signin", loginShapeValidator, validateResult, signin);
router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post(
  "/reset-password",
  isResetTokenValid,
  passwordShapeValidator,
  validateResult,
  resetPassword
);

export default router;
