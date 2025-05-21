import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// layouts
import MenuLayout from "./laylout/MenuLayout";
import AdminLayout from "./laylout/AdminLayout";
// menu pages
import Home from "./menu/pages/Home";
import Category from "./menu/pages/Category";
import Product from "./menu/pages/Product";
// admin pages
import Dashboard from "./admin/pages/Dashboard";
import ProtectedRoute from "./admin/components/ProtectedRoute";
import Login from "./admin/pages/Login";
import AdminCategory from "./admin/pages/AdminCategory";
import AdminUser from "./admin/pages/AdminUser";
import AdminProduct from "./admin/pages/AdminProduct";
import CreateCategory from "./admin/pages/CreateCategory";
import UpdateCategory from "./admin/pages/UpdateCategory";
import CreateProduct from "./admin/pages/CreateProduct";
import UpdateProduct from "./admin/pages/UpdateProduct";
import AdminBanner from "./admin/pages/AdminBanner";
import CreateBanner from "./admin/pages/CreateBanner";
import UpdateBanner from "./admin/pages/UpdateBanner";
import CreateUser from "./admin/pages/CreateUser";
import UpdateUser from "./admin/pages/UpdateUser";
import useAppStore from "./store/appStore";
import Information from "./admin/pages/Information";

function App() {
  const isSuperAdmin = useAppStore((state) => state.isSuperAdmin);

  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route element={<MenuLayout />}>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/category/:id" element={<Category />} />
            <Route path="/category/:id/product/:id" element={<Product />} />
          </Route>

          <Route path="*" element={<Navigate to="/" />} />

          <Route path="/admin/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route
                path="/admin"
                element={<Navigate to="/admin/dashboard" />}
              />
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/information" element={<Information />} />
              <Route path="/admin/category" element={<AdminCategory />} />
              <Route
                path="/admin/category/create"
                element={<CreateCategory />}
              />
              <Route
                path="/admin/category/update/:id"
                element={<UpdateCategory />}
              />
              <Route path="/admin/product" element={<AdminProduct />} />
              <Route path="/admin/product/create" element={<CreateProduct />} />
              <Route
                path="/admin/product/update/:id"
                element={<UpdateProduct />}
              />
              <Route path="/admin/banner" element={<AdminBanner />} />
              <Route path="/admin/banner/create" element={<CreateBanner />} />
              <Route
                path="/admin/banner/update/:id"
                element={<UpdateBanner />}
              />
              {isSuperAdmin ? (
                <>
                  <Route path="/admin/user" element={<AdminUser />} />
                  <Route path="/admin/user/create" element={<CreateUser />} />
                  <Route
                    path="/admin/user/update/:id"
                    element={<UpdateUser />}
                  />
                </>
              ) : null}
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
