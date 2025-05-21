import express from "express";
import {
  createCategory,
  deleteCategory,
  getActiveCategory,
  getCategory,
  getCategoryById,
  updateCategory,
  upload,
} from "../controllers/category.controller.js";
import { verifyUser } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/get", verifyUser, getCategory);
router.get("/get/active", getActiveCategory);
router.get("/get/:id", getCategoryById);
router.post("/create", verifyUser, upload.single("image"), createCategory);
router.put("/update/:id", verifyUser, upload.single("image"), updateCategory);
router.delete("/delete/:id", verifyUser, deleteCategory);

export default router;
