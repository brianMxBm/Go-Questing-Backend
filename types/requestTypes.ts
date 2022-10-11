import { Request } from "express";
import { IUser } from "../models/userModel";

export interface CustomExpressRequest extends Request {
  user?: IUser;
}
