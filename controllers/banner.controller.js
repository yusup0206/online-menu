import Banner from "../models/banner.model.js";
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
  "banner"
);

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.memoryStorage();
export const upload = multer({ storage });

export const createBanner = async (req, res, next) => {
  try {
    const { name, link, position, status } = req.body;

    if (!req.file) {
      return next(errorHandler(400, "Image file is required!"));
    }

    const fileName = `${Date.now()}.webp`;
    const filePath = path.join(uploadDir, fileName);

    await sharp(req.file.buffer)
      .resize(1920)
      .webp({ quality: 80 })
      .toFile(filePath);

    const relativePath = `${process.env.BASE_URL}/public/assets/images/banner/${fileName}`;

    const newBanner = new Banner({
      name,
      image: relativePath,
      link,
      position: parseInt(position, 10),
      status: status === "true" || status === true,
    });

    await newBanner.save();
    res.status(201).json("Banner created successfully!");
  } catch (error) {
    next(error);
  }
};

export const getBanner = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await Banner.countDocuments();
    const banners = await Banner.find()
      .sort({ position: 1, createdAt: 1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      data: banners,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
    });
  } catch (error) {
    next(error);
  }
};

export const getBannerById = async (req, res, next) => {
  try {
    const banner = await Banner.findById(req.params.id);
    if (!banner) return next(errorHandler(404, "Banner not found!"));
    res.json(banner);
  } catch (error) {
    next(error);
  }
};

export const deleteBanner = async (req, res, next) => {
  try {
    const banner = await Banner.findById(req.params.id);
    if (!banner) return next(errorHandler(404, "Banner not found!"));

    const imagePath = path.join(
      __dirname,
      "..",
      "public",
      banner.image.replace(`${process.env.BASE_URL}/public/`, "")
    );
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    await Banner.findByIdAndDelete(req.params.id);
    res.status(200).json("Banner has been deleted!");
  } catch (error) {
    next(error);
  }
};

export const updateBanner = async (req, res, next) => {
  try {
    const banner = await Banner.findById(req.params.id);
    if (!banner) {
      return next(errorHandler(404, "Banner not found!"));
    }

    const { name, link, status, position } = req.body;

    const updatedData = {
      name,
      link,
      status: status === "true" || status === true,
      position: parseInt(position, 10),
    };

    if (req.file) {
      const fileName = `${Date.now()}.webp`;
      const filePath = path.join(uploadDir, fileName);

      await sharp(req.file.buffer)
        .resize(1920)
        .webp({ quality: 80 })
        .toFile(filePath);

      const relativePath = `${process.env.BASE_URL}/public/assets/images/banner/${fileName}`;
      updatedData.image = relativePath;

      const oldImagePath = path.join(
        __dirname,
        "..",
        "public",
        banner.image.replace(`${process.env.BASE_URL}/public/`, "")
      );
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    const updatedBanner = await Banner.findByIdAndUpdate(
      req.params.id,
      updatedData,
      {
        new: true,
      }
    );

    res.status(200).json(updatedBanner);
  } catch (error) {
    console.error("Update error:", error);
    next(error);
  }
};
