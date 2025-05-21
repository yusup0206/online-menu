import mongoose from "mongoose";

const informationSchema = new mongoose.Schema(
  {
    logo: {
      type: String,
      required: true,
    },
    phone1: {
      type: String,
      required: true,
    },
    phone2: {
      type: String,
    },
    phone3: {
      type: String,
    },
    addressEn: {
      type: String,
    },
    addressRu: {
      type: String,
    },
    addressTm: {
      type: String,
    },
    addressLink: {
      type: String,
    },
  },
  {
    timestams: true,
  }
);

const Information = mongoose.model("information", informationSchema);

export default Information;
