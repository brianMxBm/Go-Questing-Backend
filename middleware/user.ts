import { isValidObjectId } from "mongoose";

import User from "../models/userModel";
import ResetToken from "../models/resetTokenModel";

import { sendError } from "../utils/helper";

import { Response, NextFunction } from "express";
import { CustomExpressRequest } from "../types/requestTypes";

// Verify reset token validity
const isResetTokenValid = async (
  req: CustomExpressRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token, id } = req.query;
    if (!token || !id) return sendError(res, "Invalid request");

    if (!isValidObjectId(id)) return sendError(res, "Invalid user");

    const user = await User.findById(id);
    if (!user) return sendError(res, "User not found");

    const resetToken = await ResetToken.findOne({ owner: user._id });

    if (!resetToken) return sendError(res, "Token not found");

    const isValid = resetToken.compareToken(token as string);

    if (!isValid) return sendError(res, "Token is not valid");

    req.user = user;

    next();
  } catch (e) {
    if (typeof e === "string") {
      sendError(res, "Something went wrong", 500);
      throw new Error(e);
    } else if (e instanceof Error) {
      sendError(res, "Something went wrong", 500);
      throw new Error(e.message);
    }
  }
};

export { isResetTokenValid };
