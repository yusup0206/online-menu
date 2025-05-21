import express from "express";
import {
  createInformation,
  getInformation,
  updateInformation,
  upload,
} from "../controllers/information.controller.js";
import { verifyUser } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/get", getInformation);
router.get("/admin/get", verifyUser, getInformation);
router.post("/create", verifyUser, upload.single("logo"), createInformation);
router.put("/update", verifyUser, upload.single("logo"), updateInformation);

export default router;
