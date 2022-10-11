// import jwt from "jsonwebtoken";
import { isValidObjectId } from "mongoose";

import User from "../models/userModel";
import ResetToken from "../models/resetTokenModel";
import VerificationToken from "../models/verificationTokenModel";

import {
  generateEmailTemplate,
  welcomeEmailTemplate,
  forgotPasswordTemplate,
  resetPasswordTemplate,
} from "../templates/emailTemplate";
import { sendError, createRandomBytes } from "../utils/helper";
import { generateVerificationNo } from "../utils/verification";
import { createMailTransporter } from "../utils/mail";

import { Request, Response } from "express";
import { CustomExpressRequest } from "../types/requestTypes";

// @desc    Register new user
// @route   POST /api/user/create
// @access  Public
const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) return sendError(res, "This email already exists!");

    const newUser = new User({
      name,
      email,
      password,
    });

    const token = generateVerificationNo();
    const verificationToken = new VerificationToken({
      owner: newUser._id,
      token,
    });

    await verificationToken.save();
    await newUser.save();

    // @TODO - Replace credentials in production
    createMailTransporter().sendMail({
      from: "no-reply@goquesting.com",
      to: newUser.email,
      subject: "Verify your GoQuesting account!",
      html: generateEmailTemplate(token),
    });

    res.json({
      success: true,
      user: {
        name: newUser.name,
        email: newUser.email,
        id: newUser._id,
        verified: newUser.verified,
      },
    });
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

// @desc    Authenticate user
// @route   POST /api/user/signin
// @access  Public
const signin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return sendError(res, "Email/Password Missing");

    const user = await User.findOne({ email });

    if (!user) return sendError(res, "User not found");

    const isMatched = user.comparePassword(password);
    if (!isMatched) return sendError(res, "Email/Password Does Not Match!");

    if (!process.env.JWT_SECRET) {
      return sendError(res, "Something went wrong");
    }

    // @TODO - Ryan: Save JWT
    // const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    //   expiresIn: "1d",
    // });

    res.json({
      success: true,
      user: {
        name: user.name,
        email: user.email,
        id: user._id,
      },
    });
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

// @desc    Verify user account via email
// @route   POST /api/user/verify-email
// @access  Public
const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { id, token } = req.body;
    if (!id || !token)
      return sendError(res, "Invalid request - missing paramaters");

    if (!isValidObjectId(id)) return sendError(res, "Invalid user ID");

    const user = await User.findById(id);
    if (!user) return sendError(res, "User not found");

    if (user.verified)
      return sendError(res, "This account is already verified");

    const OTP = await VerificationToken.findOne({ owner: user._id });

    if (!OTP) return sendError(res, "Sorry, user not found");

    const hasMatched = OTP.compareToken(token);
    if (!hasMatched) return sendError(res, "Please provide a valid token");

    user.verified = true;

    await VerificationToken.findByIdAndDelete(OTP._id);
    await user.save();

    // @TODO - Replace credentials in production
    createMailTransporter().sendMail({
      from: "no-reply@goquesting.com",
      to: user.email,
      subject: "Get Ready To Quest!",
      html: welcomeEmailTemplate(
        "Email Verified Successfully",
        "Thanks for connecting with us"
      ),
    });
    res.json({
      success: true,
      message: "Email address successfully verified!",
      user: { name: user.name, email: user.email, id: user._id },
    });
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

// @desc    Forgot password request
// @route   POST /api/user/forgot-password
// @access  Public
const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (!email) return sendError(res, "Please provide a valid email");

    const user = await User.findOne({ email });

    if (!user) return sendError(res, "User not found, invalid request");

    const token = await ResetToken.findOne({ owner: user._id });

    if (token)
      return sendError(
        res,
        "Token already generated, please wait to generate another"
      );

    const randomToken = await createRandomBytes();
    const resetToken = new ResetToken({ owner: user._id, token: randomToken });
    await resetToken.save();

    // @TODO - Replace credentials in production
    createMailTransporter().sendMail({
      from: "no-reply@goquesting.com",
      to: user.email,
      subject: "Need to reset your credentials?",
      html: forgotPasswordTemplate(
        `http://localhost:3000/reset-password?token=${randomToken}&id=${user._id}`
      ),
    });
    res.json({
      success: true,
      message: "Password reset link sent to your email",
    });
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

// @desc    Reset password request
// @route   POST /api/user/reset-password
// @access  Private
const resetPassword = async (req: CustomExpressRequest, res: Response) => {
  try {
    if (!req.user?._id) return sendError(res, "Invalid request");

    const { password } = req.body;

    if (!password) return sendError(res, "Please enter a password");

    const user = await User.findById(req.user._id);
    if (!user) return sendError(res, "User not found");

    const isSamePass = user.comparePassword(password);
    if (isSamePass) return sendError(res, "You must choose a new password");

    user.password = password.trim();

    await user.save();

    await ResetToken.findOneAndDelete({ owner: user._id });

    // @TODO - Replace credentials in production
    createMailTransporter().sendMail({
      from: "no-reply@goquesting.com",
      to: user.email,
      subject: "Password Reset Successfully!",
      html: resetPasswordTemplate(
        "Password Reset Successfully",
        "Login With Your New Credentials!"
      ),
    });

    res.json({
      success: true,
      message: "Password Reset Successfully",
    });
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

export { createUser, signin, verifyEmail, forgotPassword, resetPassword };
