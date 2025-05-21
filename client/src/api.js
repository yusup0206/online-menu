import axios from "axios";
import useAppStore from "./store/appStore";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: "http://127.0.0.1:5000/api",
  withCredentials: true,
});

// ✅ Request Interceptor
api.interceptors.request.use((config) => {
  const access_token = localStorage.getItem("access_token");
  if (access_token) {
    config.headers.Authorization = `Bearer ${access_token}`;
  }
  return config;
});

// ✅ Response Interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message;

    // console.log("API Error:", status, message);
    toast.error(message);
    if (status === 403 && message === "TokenExpired") {
      console.warn("Access token expired. Logging out...");

      // Clear localStorage token
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");

      try {
        await api.post("/auth/logout"); // optional: if you have a logout endpoint
      } catch (err) {
        console.error("Logout request failed:", err);
      }

      // Call your logout store function
      const logout = useAppStore.getState().logout;
      logout();

      // Redirect to login
      window.location.href = "/admin/login";
    }

    return Promise.reject(error);
  }
);

export default api;
