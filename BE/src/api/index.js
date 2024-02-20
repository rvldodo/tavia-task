import { Router } from "express";
import authRouter from "./auth/auth.router.js";
import fileRouter from "./file/file.router.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/file", fileRouter);

export default router;
