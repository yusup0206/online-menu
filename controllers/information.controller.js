import Information from "../models/information.model.js";
import sharp from "sharp";
import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { errorHandler } from "../utils/errorHandler.js";
import express from "express";
import { verifyUser } from "../utils/verifyUser.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const uploadDir = path.join(
  __dirname,
  "..",
  "public",
  "assets",
  "images",
  "information"
);

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.memoryStorage();
export const upload = multer({ storage });

export const createInformation = async (req, res, next) => {
  try {
    const existingInformation = await Information.findOne();
    if (existingInformation) {
      return next(
        errorHandler(409, "Information already exists. Use update to modify.")
      );
    }

    const {
      phone1,
      phone2,
      phone3,
      addressEn,
      addressRu,
      addressTm,
      addressLink,
    } = req.body;

    if (!req.file) {
      return next(errorHandler(400, "Logo file is required!"));
    }

    const fileName = `${Date.now()}.webp`;
    const filePath = path.join(uploadDir, fileName);

    await sharp(req.file.buffer)
      .resize(150)
      .webp({ quality: 80 })
      .toFile(filePath);

    const relativePath = `${process.env.BASE_URL}/public/assets/images/information/${fileName}`;

    const newInformation = new Information({
      logo: relativePath,
      phone1,
      phone2,
      phone3,
      addressEn,
      addressRu,
      addressTm,
      addressLink,
    });

    await newInformation.save();
    res.status(201).json("Information created successfully!");
  } catch (error) {
    next(error);
  }
};

export const getInformation = async (req, res, next) => {
  try {
    const information = await Information.findOne();
    if (!information) {
      return next(
        errorHandler(404, "Information not found. Please create it first.")
      );
    }
    res.status(200).json(information);
  } catch (error) {
    next(error);
  }
};

export const updateInformation = async (req, res, next) => {
  try {
    const existingInformation = await Information.findOne();
    if (!existingInformation) {
      return next(
        errorHandler(
          404,
          "Information not found. Please create the information first."
        )
      );
    }

    const {
      phone1,
      phone2,
      phone3,
      addressEn,
      addressRu,
      addressTm,
      addressLink,
    } = req.body;

    const updatedData = {
      phone1,
      phone2,
      phone3,
      addressEn,
      addressRu,
      addressTm,
      addressLink,
    };

    if (req.file) {
      const fileName = `${Date.now()}.webp`;
      const filePath = path.join(uploadDir, fileName);

      await sharp(req.file.buffer)
        .resize(1000)
        .webp({ quality: 80 })
        .toFile(filePath);

      const relativePath = `${process.env.BASE_URL}/public/assets/images/information/${fileName}`;
      updatedData.logo = relativePath;

      const oldImagePath = path.join(
        __dirname,
        "..",
        "public",
        existingInformation.logo.replace(`${process.env.BASE_URL}/public/`, "")
      );

      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    const updatedInformation = await Information.findOneAndUpdate(
      {},
      updatedData,
      {
        new: true,
        upsert: false,
      }
    );

    res.status(200).json(updatedInformation);
  } catch (error) {
    console.error("Update error:", error);
    next(error);
  }
};
