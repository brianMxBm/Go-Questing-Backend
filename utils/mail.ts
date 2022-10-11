import nodemailer from "nodemailer";

// @TODO - Switch over to stable mail API's in production

// Create mail transporter
const createMailTransporter = () =>
  nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.MAILTRAP_USERNAME,
      pass: process.env.MAILTRAP_PASSWORD,
    },
  });

export { createMailTransporter };
