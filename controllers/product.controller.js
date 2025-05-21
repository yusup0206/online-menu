import Product from "../models/product.model.js";
import sharp from "sharp";
import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { errorHandler } from "../utils/errorHandler.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const uploadDir = path.join(
  __dirname,
  "..",
  "public",
  "assets",
  "images",
  "product"
);

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.memoryStorage();
export const upload = multer({ storage });

export const createProduct = async (req, res, next) => {
  try {
    const {
      nameEn,
      nameRu,
      nameTm,
      descriptionEn,
      descriptionRu,
      descriptionTm,
      price,
      position,
      status,
      category,
    } = req.body;

    if (!req.file) {
      return next(errorHandler(400, "Image file is required!"));
    }

    const fileName = `${Date.now()}.webp`;
    const filePath = path.join(uploadDir, fileName);

    await sharp(req.file.buffer)
      .resize(1000)
      .webp({ quality: 80 })
      .toFile(filePath);

    const relativePath = `${process.env.BASE_URL}/public/assets/images/product/${fileName}`;

    const newProduct = new Product({
      nameEn,
      nameRu,
      nameTm,
      descriptionEn,
      descriptionRu,
      descriptionTm,
      price: parseFloat(price),
      image: relativePath,
      position: parseInt(position, 10),
      status: status === "true" || status === true,
      category,
    });

    await newProduct.save();
    res.status(201).json("Product created successfully!");
  } catch (error) {
    next(error);
  }
};

export const getProduct = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await Product.countDocuments();
    const products = await Product.find()
      .sort({ position: 1, createdAt: 1 })
      .skip(skip)
      .limit(limit)
      .populate("category");

    res.status(200).json({
      data: products,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate("category");
    if (!product) return next(errorHandler(404, "Product not found!"));
    res.json(product);
  } catch (error) {
    next(error);
  }
};

export const getProductsByCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 16;
    const skip = (page - 1) * limit;

    const total = await Product.countDocuments({
      category: categoryId,
      status: true,
    });
    const products = await Product.find({ category: categoryId, status: true })
      .sort({ position: 1, createdAt: 1 })
      .skip(skip)
      .limit(limit)
      .populate("category");

    res.status(200).json({
      data: products,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return next(errorHandler(404, "Product not found!"));

    const imagePath = path.join(
      __dirname,
      "..",
      "public",
      product.image.replace(`${process.env.BASE_URL}/public/`, "")
    );
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted!");
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return next(errorHandler(404, "Product not found!"));
    }

    const {
      nameEn,
      nameRu,
      nameTm,
      descriptionEn,
      descriptionRu,
      descriptionTm,
      price,
      status,
      position,
      category,
    } = req.body;

    const updatedData = {
      nameEn,
      nameRu,
      nameTm,
      descriptionEn,
      descriptionRu,
      descriptionTm,
      price: parseFloat(price),
      status: status === "true" || status === true,
      position: parseInt(position, 10),
      category,
    };

    if (req.file) {
      const fileName = `${Date.now()}.webp`;
      const filePath = path.join(uploadDir, fileName);

      await sharp(req.file.buffer)
        .resize(800)
        .webp({ quality: 80 })
        .toFile(filePath);

      const relativePath = `${process.env.BASE_URL}/public/assets/images/product/${fileName}`;
      updatedData.image = relativePath;

      const oldImagePath = path.join(
        __dirname,
        "..",
        "public",
        product.image.replace(`${process.env.BASE_URL}/public/`, "")
      );
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updatedData,
      {
        new: true,
      }
    );

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Update error:", error);
    next(error);
  }
};
