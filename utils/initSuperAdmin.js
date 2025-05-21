import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

export const initSuperAdmin = async () => {
  const { SUPER_ADMIN_USERNAME, SUPER_ADMIN_PASSWORD } = process.env;

  try {
    const existing = await User.findOne({
      username: SUPER_ADMIN_USERNAME,
      isSuperAdmin: true,
    });

    if (!existing) {
      const hashedPassword = bcryptjs.hashSync(SUPER_ADMIN_PASSWORD, 10);
      const superAdmin = new User({
        username: SUPER_ADMIN_USERNAME,
        password: hashedPassword,
        isSuperAdmin: true,
      });

      await superAdmin.save();
      console.log("✅ Super admin initialized.");
    } else {
      console.log("ℹ️ Super admin already exists.");
    }
  } catch (err) {
    console.error("❌ Failed to initialize super admin:", err);
  }
};
