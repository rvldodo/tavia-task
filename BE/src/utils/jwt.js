import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secret.js";

export const encryptToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET);
};

export const decodeToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};
