// UpdateUser.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api";
import { useTranslation } from "react-i18next";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

const UpdateUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "",
  });
  const [password, setPassword] = useState("");
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/users/${id}`);
        const { username } = data;
        setUserData({ username });
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id, setLoading]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updateData = { ...userData };
    if (password) {
      updateData.password = password;
    }
    setLoading(true);
    try {
      await api.put(`/users/${id}`, updateData);
      navigate("/admin/user");
      toast.success(t("updated"));
    } catch (error) {
      console.error(
        "Failed to update user:",
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
            {t("update_user")}
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
              {t("new_password")}
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              className="w-full p-2 border-2 rounded-sm outline-primary"
            />
          </div>
        </div>

        <div className="w-full flex items-center justify-end gap-2">
          <button type="button" onClick={() => navigate(-1)} className="btn">
            {t("back")}
          </button>
          <button type="submit" className="btn btn-primary">
            {t("update")}
          </button>
        </div>
      </form>
    </section>
  );
};

export default UpdateUser;
