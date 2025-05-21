import express from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProductById,
  getProductsByCategory,
  updateProduct,
  upload,
} from "../controllers/product.controller.js";
import { verifyUser } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/get", verifyUser, getProduct);
router.get("/get/:id", verifyUser, getProductById);
router.get("/category/:categoryId", getProductsByCategory);
router.post("/create", verifyUser, upload.single("image"), createProduct);
router.put("/update/:id", verifyUser, upload.single("image"), updateProduct);
router.delete("/delete/:id", verifyUser, deleteProduct);

export default router;
