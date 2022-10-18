import jwt from "jsonwebtoken";
import { isValidObjectId } from "mongoose";

import User from "../models/userModel";
import ResetToken from "../models/resetTokenModel";

import { sendError } from "../utils/helper";

import { Response, NextFunction } from "express";
import { CustomExpressRequest } from "../types/requestTypes";
import { IToken } from "types";

// Verify included JSON Web Token
const isAuthenticated = async (
  req: CustomExpressRequest,
  res: Response,
  next: NextFunction
) => {
  // Check for presence of token
  if (!req.headers.authorization?.startsWith("Bearer")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    // Extract token from header
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Verify token validity
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as IToken;

    // Extract user from ID
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Add user to request
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

// Verify reset token validity
const isResetTokenValid = async (
  req: CustomExpressRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.query;
    const id = req.user?.id;

    if (!token) return sendError(res, "Invalid request");
    if (!isValidObjectId(id)) return sendError(res, "Invalid user");

    const user = await User.findById(id);
    if (!user) return sendError(res, "User not found");

    const resetToken = await ResetToken.findOne({ owner: user._id });
    if (!resetToken) return sendError(res, "Token not found");

    const isValid = resetToken.compareToken(token as string);
    if (!isValid) return sendError(res, "Token is not valid");

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

export { isAuthenticated, isResetTokenValid };
