import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
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
    descriptionEn: {
      type: String,
      required: true,
    },
    descriptionRu: {
      type: String,
      required: true,
    },
    descriptionTm: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
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
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
