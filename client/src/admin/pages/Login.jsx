import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAppStore from "../../store/appStore";
import api from "../../api";
import { useTranslation } from "react-i18next";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const setUser = useAppStore((state) => state.setUser);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const { t } = useTranslation();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post("/auth/login", credentials);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("access_token", response.data.access_token);
      setUser(response.data);
      navigate("/admin/dashboard");
      toast.success(t("welcome") + " " + response.data.user.username);
    } catch (error) {
      console.error(error);
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <section className="w-full h-screen p-5 flex items-center justify-center bg-primary">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-sm shadow-md w-full max-w-md"
      >
        <h1 className="text-textColor text-xl md:text-2xl font-semibold mb-4">
          {t("admin_login")}
        </h1>
        <div className="mb-4">
          <label htmlFor="username" className="text-textColor text-sm  mb-2">
            {t("username")}
          </label>
          <input
            id="username"
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            className="w-full p-2 border-2 rounded-sm outline-primary text-textColor text-sm "
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="text-textColor text-sm  mb-2">
            {t("password")}
          </label>
          <input
            id="password"
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            className="w-full p-2 border-2 rounded-sm outline-primary text-textColor text-sm "
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-primary text-white text-sm  font-semibold p-2 rounded-sm cursor-pointer active:bg-primary/95 md:hover:bg-primary/95 transition-all flex items-center justify-center"
        >
          {loading ? <Loader color="white" size="xl" /> : t("login")}
        </button>
      </form>
    </section>
  );
};

export default Login;
