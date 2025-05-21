import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    nameEn: {
      type: String,
      required: true,
    },
    nameRu: {
      type: String,
      required: true,
    },
    nameTm: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    position: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);

export default Category;
