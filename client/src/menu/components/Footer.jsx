import React from "react";
import useAppStore from "../../store/appStore";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { RiInstagramFill } from "react-icons/ri";
import { AiFillTikTok } from "react-icons/ai";

const Footer = (props) => {
  const currentYear = new Date().getFullYear();
  const language = useAppStore((state) => state.language);
  const { t } = useTranslation();
  const location = useLocation();

  if (!props.information) {
    return null;
  }

  return (
    <footer className="bg-primary">
      <div className="container">
        {location.pathname === "/home" ? (
          <div className="w-full px-5 md:px-10 py-5 flex flex-col gap-5">
            <div className="flex flex-col gap-2 text-center">
              <h2 className="text-white text-sm md:text-base font-semibold">
                {t("social_media")}
              </h2>
              <div className="flex items-center justify-center gap-2 flex-wrap">
                <Link
                  to="https://instagram.com/_u/greencoffee_tm/"
                  className="size-9 border-2 border-white rounded-md flex items-center justify-center text-primary bg-white active:text-white active:bg-primary md:hover:text-white md:hover:bg-primary transition-all"
                >
                  <RiInstagramFill className="size-6" />
                </Link>
                <Link
                  to=""
                  className="size-9 border-2 border-white rounded-md flex items-center justify-center text-primary bg-white active:text-white active:bg-primary md:hover:text-white md:hover:bg-primary transition-all"
                >
                  <AiFillTikTok className="size-6" />
                </Link>
              </div>
            </div>
            <div className="flex flex-col gap-2 text-center">
              <h2 className="text-white text-sm md:text-base font-semibold">
                {t("address")}
              </h2>
              <Link
                to={props.information.addressLink}
                target="_blank"
                className="text-white text-sm md:text-base"
              >
                {language === "en"
                  ? props.information.addressEn
                  : language === "ru"
                  ? props.information.addressRu
                  : props.information.addressTm}
              </Link>
            </div>
          </div>
        ) : null}

        <div className="w-full px-5 md:px-10 py-5">
          <div className="text-center">
            <p className="text-white text-sm font-semibold">
              Green Coffee &copy; {currentYear}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
