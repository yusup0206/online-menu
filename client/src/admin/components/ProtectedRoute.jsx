import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAppStore from "../../store/appStore";

const ProtectedRoute = () => {
  const user = useAppStore((state) => state.user);
  return user ? <Outlet /> : <Navigate to="/admin/login" />;
};

export default ProtectedRoute;
