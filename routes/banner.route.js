import express from "express";
import {
  createBanner,
  deleteBanner,
  getBanner,
  getBannerById,
  updateBanner,
  upload,
} from "../controllers/banner.controller.js";
import { verifyUser } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/get", getBanner);
router.get("/admin/get", verifyUser, getBanner);
router.get("/get/:id", getBannerById);
router.post("/create", verifyUser, upload.single("image"), createBanner);
router.put("/update/:id", verifyUser, upload.single("image"), updateBanner);
router.delete("/delete/:id", verifyUser, deleteBanner);

export default router;
