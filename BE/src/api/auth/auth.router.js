import { Router } from "express";
import { errorHandler } from "../../helpers/error-handler.js";
import {
  signup,
  login,
  userConfirm,
  forgetPassword,
  verifyTokenForgetPassword,
} from "./auth.controller.js";

const router = Router();

router.post("/signup", errorHandler(signup));
router.post("/login", errorHandler(login));

router.get("/verify/:token", errorHandler(userConfirm));

router.post("/forget-password", errorHandler(forgetPassword));
router.post(
  "/forget-password/verify/:token",
  errorHandler(verifyTokenForgetPassword),
);

export default router;
