/* eslint-disable @typescript-eslint/no-var-requires */ //TODO: FIX IMPORTS
import Express from "express";
import { UserType } from "types/responseTypes";
const { isValidObjectId } = require("mongoose");
const User = require("../schemas/userSchema");
const { sendError } = require("../utils/helper");
const ResetToken = require("../schemas/resetTokenSchema");

exports.isResetTokenValid = async (
  req: Express.Request & { user: UserType & { _id: string } },
  res: Express.Response,
  next: Express.NextFunction
) => {
  //TODO: Replace Types
  const { token, id } = req.query;
  if (!token || !id) return sendError(res, "Invalid request");

  if (!isValidObjectId(id)) return sendError(res, "Invalid user");

  const user = await User.findById(id);
  if (!user) return sendError(res, "User not found");

  const resetToken = await ResetToken.findOne({ owner: user._id });

  if (!resetToken) return sendError(res, "token not found");

  const isValid = await resetToken.compareToken(token);

  if (!isValid) return sendError(res, "Reset token is not valid");

  req.user = user;

  next();

  return null; // TODO: Not good practice. Implement exception handling later.
};
