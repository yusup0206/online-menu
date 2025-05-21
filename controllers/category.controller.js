import Category from "../models/category.model.js";
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
  "category"
);

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.memoryStorage();
export const upload = multer({ storage });

export const createCategory = async (req, res, next) => {
  try {
    const { nameEn, nameRu, nameTm, position, status } = req.body;

    if (!req.file) {
      return next(errorHandler(400, "Image file is required!"));
    }

    const fileName = `${Date.now()}.webp`;
    const filePath = path.join(uploadDir, fileName);

    await sharp(req.file.buffer)
      .resize(1000)
      .webp({ quality: 80 })
      .toFile(filePath);

    const relativePath = `${process.env.BASE_URL}/public/assets/images/category/${fileName}`;

    const newCategory = new Category({
      nameEn,
      nameRu,
      nameTm,
      image: relativePath,
      position: parseInt(position, 10),
      status: status === "true" || status === true,
    });

    await newCategory.save();
    res.status(201).json("Category created successfully!");
  } catch (error) {
    next(error);
  }
};

export const getCategory = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await Category.countDocuments();
    const categories = await Category.find()
      .sort({ position: 1, createdAt: 1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      data: categories,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    });
  } catch (error) {
    next(error);
  }
};

export const getActiveCategory = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await Category.countDocuments({ status: true });
    const categories = await Category.find({ status: true })
      .sort({ position: 1, createdAt: 1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      data: categories,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    });
  } catch (error) {
    next(error);
  }
};

export const getCategoryById = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return next(errorHandler(404, "Category not found!"));
    res.json(category);
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return next(errorHandler(404, "Category not found!"));

    const imagePath = path.join(
      __dirname,
      "..",
      "public",
      category.image.replace(`${process.env.BASE_URL}/public/`, "")
    );
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    await Category.findByIdAndDelete(req.params.id);
    res.status(200).json("Category has been deleted!");
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return next(errorHandler(404, "Category not found!"));
    }

    const { nameEn, nameRu, nameTm, status, position } = req.body;

    const updatedData = {
      nameEn,
      nameRu,
      nameTm,
      status: status === "true" || status === true,
      position: parseInt(position, 10),
    };

    if (req.file) {
      const fileName = `${Date.now()}.webp`;
      const filePath = path.join(uploadDir, fileName);

      await sharp(req.file.buffer)
        .resize(300)
        .webp({ quality: 80 })
        .toFile(filePath);

      const relativePath = `${process.env.BASE_URL}/public/assets/images/category/${fileName}`;
      updatedData.image = relativePath;

      const oldImagePath = path.join(
        __dirname,
        "..",
        "public",
        category.image.replace(`${process.env.BASE_URL}/public/`, "")
      );
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      updatedData,
      {
        new: true,
      }
    );

    res.status(200).json(updatedCategory);
  } catch (error) {
    console.error("Update error:", error);
    next(error);
  }
};
