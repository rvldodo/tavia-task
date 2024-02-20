import dotenv from "dotenv";
dotenv.config({ path: ".env" });

export const PORT = process.env.PORT;
export const DB_NAME = process.env.DB_NAME;
export const DB_PORT = process.env.DB_PORT;
export const DB_HOST = process.env.DB_HOST;
export const DB_DIALECT = process.env.DB_DIALECT;
export const JWT_SECRET = process.env.JWT_SECRET;
export const EMAIL_TOKEN = process.env.EMAIL_TOKEN;
export const EMAIL_NODEMAILER = process.env.EMAIL_NODEMAILER;
export const PASSWORD_NODEMAILER = process.env.PASSWORD_NODEMAILER;
export const BASE_URL = process.env.BASE_URL;
