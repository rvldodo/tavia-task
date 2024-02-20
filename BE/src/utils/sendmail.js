import { EMAIL_NODEMAILER, PASSWORD_NODEMAILER } from "../secret.js";
import nodemailer from "nodemailer";
import logger from "./logger.js";

const sendMessage = (to, subject, html, successMessage) => {
  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_NODEMAILER, //eakjhra@gmail.com
      pass: PASSWORD_NODEMAILER, //asdasdasd
    },
  });

  let mailDetails = {
    from: EMAIL_NODEMAILER,
    to: to,
    subject: subject,
    html: html,
  };

  mailTransporter.sendMail(mailDetails, function (err, data) {
    if (err) {
      return err;
    } else {
      return successMessage;
    }
  });
  logger.info("Email sent successfully");
};

export default sendMessage;
