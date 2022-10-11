import crypto from "crypto";

import { Response } from "express";

// Function to send errors
const sendError = (res: Response, error: string, status = 401) => {
  res.status(status).json({ success: false, error });
};

// Function to generate random token
const createRandomBytes = () =>
  new Promise((resolve, reject) => {
    crypto.randomBytes(30, (err, buff) => {
      if (err) reject(err);

      const token = buff.toString("hex");
      resolve(token);
    });
  });

export { sendError, createRandomBytes };
