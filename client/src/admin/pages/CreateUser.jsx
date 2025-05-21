// CreateUser.jsx
import React, { useState } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const CreateUser = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      await api.post("/auth/register", userData);
      navigate("/admin/user");
      toast.success(t("created"));
    } catch (error) {
      console.error(
        "Failed to create user:",
        error.response?.data?.message || error.message
      );
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="box w-full h-30 flex items-center justify-center">
        <Loader color="primary" size="3xl" />
      </div>
    );
  }

  return (
    <section>
      <form onSubmit={handleSubmit} className="box w-full grid gap-4">
        <div className="w-full flex items-center justify-between gap-4">
          <h3 className="text-textColor text-lg font-semibold">
            {t("create_user")}
          </h3>
        </div>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 sm:col-span-6 md:col-span-4">
            <label htmlFor="username" className="text-textColor text-sm mb-2">
              {t("username")}
            </label>
            <input
              id="username"
              type="text"
              name="username"
              value={userData.username}
              onChange={handleChange}
              className="w-full p-2 border-2 rounded-sm outline-primary"
              required
            />
          </div>

          <div className="col-span-12 sm:col-span-6 md:col-span-4">
            <label htmlFor="password" className="text-textColor text-sm mb-2">
              {t("password")}
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              className="w-full p-2 border-2 rounded-sm outline-primary"
              required
            />
          </div>
        </div>
        <div className="w-full flex items-center justify-end gap-2">
          <button onClick={() => navigate(-1)} className="btn">
            {t("back")}
          </button>
          <button className="btn btn-primary"> {t("submit")}</button>
        </div>
      </form>
    </section>
  );
};

export default CreateUser;
