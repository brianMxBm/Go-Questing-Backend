/* eslint-disable @typescript-eslint/no-explicit-any */ //TODO: FIX TPYES
import crypto from "crypto";
import Express from "express";

exports.sendError = (res: Express.Response, error: string, status = 401) => {
  // Function to help report errors
  res.status(status).json({ success: false, error });
};

exports.createRandomBytes = () =>
  new Promise((resolve, reject) => {
    crypto.randomBytes(30, (err, buff) => {
      if (err) reject(err);

      const token = buff.toString("hex");
      resolve(token);
    });
  });
