// images
import { Link, useLocation } from "react-router-dom";

import { GoHomeFill, GoPersonFill } from "react-icons/go";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { GiMeal } from "react-icons/gi";
import { PiSlideshowFill } from "react-icons/pi";
import useAppStore from "../../store/appStore";
import { useTranslation } from "react-i18next";
import { IoInformationCircleSharp } from "react-icons/io5";

const Sidebar = () => {
  const location = useLocation();

  const isSuperAdmin = useAppStore((state) => state.isSuperAdmin);
  const { t } = useTranslation();

  return (
    <aside className="w-18 md:w-64 bg-primary text-white h-screen p-4 pr-0 flex flex-col gap-10">
      <div className="border-b-2 border-white flex items-center justify-center pb-5">
        <Link to="/home" target="_blank" className="h-20">
          <img
            src="/assets/images/logo.webp"
            alt=""
            className="h-full object-contain"
          />
        </Link>
      </div>
      <div className="flex flex-col gap-4">
        <Link to="/admin/dashboard" className="relative">
          <div
            className={
              location.pathname.includes("/admin/dashboard")
                ? "bg-white text-primary p-4 text-sm font-semibold rounded-sm flex items-center justify-start gap-2"
                : "text-white p-4 text-sm font-semibold rounded-sm flex items-center justify-start gap-2 hover:bg-white hover:text-primary transition-all"
            }
          >
            <GoHomeFill className="size-6" />
            <p className="hidden md:block">Dashboard</p>
          </div>
        </Link>
        <Link to="/admin/information" className="relative">
          <div
            className={
              location.pathname.includes("/admin/information")
                ? "bg-white text-primary p-4 text-sm font-semibold rounded-sm flex items-center justify-start gap-2"
                : "text-white p-4 text-sm font-semibold rounded-sm flex items-center justify-start gap-2 hover:bg-white hover:text-primary transition-all"
            }
          >
            <IoInformationCircleSharp className="size-6" />
            <p className="hidden md:block">{t("information")}</p>
          </div>
        </Link>
        <Link to="/admin/category" className="relative">
          <div
            className={
              location.pathname.includes("/admin/category")
                ? "bg-white text-primary p-4 text-sm font-semibold rounded-sm flex items-center justify-start gap-2"
                : "text-white p-4 text-sm font-semibold rounded-sm flex items-center justify-start gap-2 hover:bg-white hover:text-primary transition-all"
            }
          >
            <BiSolidCategoryAlt className="size-6" />
            <p className="hidden md:block">{t("categories")}</p>
          </div>
        </Link>
        <Link to="/admin/product" className="relative">
          <div
            className={
              location.pathname.includes("/admin/product")
                ? "bg-white text-primary p-4 text-sm font-semibold rounded-sm flex items-center justify-start gap-2"
                : "text-white p-4 text-sm font-semibold rounded-sm flex items-center justify-start gap-2 hover:bg-white hover:text-primary transition-all"
            }
          >
            <GiMeal className="size-6" />
            <p className="hidden md:block">{t("products")}</p>
          </div>
        </Link>
        <Link to="/admin/banner" className="relative">
          <div
            className={
              location.pathname.includes("/admin/banner")
                ? "bg-white text-primary p-4 text-sm font-semibold rounded-sm flex items-center justify-start gap-2"
                : "text-white p-4 text-sm font-semibold rounded-sm flex items-center justify-start gap-2 hover:bg-white hover:text-primary transition-all"
            }
          >
            <PiSlideshowFill className="size-6" />
            <p className="hidden md:block">{t("banners")}</p>
          </div>
        </Link>
        {isSuperAdmin ? (
          <Link to="/admin/user" className="relative">
            <div
              className={
                location.pathname.includes("/admin/user")
                  ? "bg-white text-primary p-4 text-sm font-semibold rounded-sm flex items-center justify-start gap-2"
                  : "text-white p-4 text-sm font-semibold rounded-sm flex items-center justify-start gap-2 hover:bg-white hover:text-primary transition-all"
              }
            >
              <GoPersonFill className="size-6" />
              <p className="hidden md:block">{t("users")}</p>
            </div>
          </Link>
        ) : null}
      </div>
    </aside>
  );
};

export default Sidebar;
