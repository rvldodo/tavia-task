import { Router } from "express";
import { exportFile, importFile } from "./file.controller.js";
import upload from "../../utils/storage.js";

const router = Router();

router.get("/export/xlsx", exportFile);
router.post("/import", upload.single("file"), importFile);

export default router;
