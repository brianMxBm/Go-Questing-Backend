import jwt from "jsonwebtoken";
import { Types } from "mongoose";

// Generate JWT token with user ID
const generateJWT = (id: Types.ObjectId) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: "1d",
  });
};

export default generateJWT;
