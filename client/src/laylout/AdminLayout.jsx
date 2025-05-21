import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../admin/components/Sidebar";
import Header from "../admin/components/Header";

const AdminLayout = () => {
  return (
    <div className="flex bg-primary">
      <Sidebar />
      <div className="flex-1 p-4">
        <div className="w-full min-h-screen rounded-sm p-4 bg-gray-200 flex flex-col gap-4">
          <Header />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
