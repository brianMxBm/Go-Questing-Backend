import { Express } from "express";
import { UserType } from "./responseTypes";
export interface CustomExpressRequest {
  req: Express.Request & { user: UserType };
}
