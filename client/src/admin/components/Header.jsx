import api from "../../api";
import useAppStore from "../../store/appStore";
import { IoLogOut } from "react-icons/io5";
import React, { useEffect, useRef, useState } from "react";
import { LuLanguages } from "react-icons/lu";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t } = useTranslation();
  const [langModal, setLangModal] = useState(false);
  const modalRef = useRef(null);

  const language = useAppStore((state) => state.language);
  const setLanguage = useAppStore((state) => state.setLanguage);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setLangModal(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef]);

  const logout = useAppStore((state) => state.logout);

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      <header className="bg-primary p-4 rounded-sm shadow-md flex items-center justify-between gap-4">
        <h1 className="text-xl md:text-2xl text-white font-semibold">
          Green Menu
        </h1>
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => setLangModal(true)}
            className="text-white text-2xl cursor-pointer"
          >
            <LuLanguages />
          </button>

          <button
            onClick={handleLogout}
            title="logout"
            className="text-white text-2xl cursor-pointer"
          >
            <IoLogOut />
          </button>
        </div>
      </header>
      <div
        className={
          langModal
            ? "modalwrapper fixed top-0 left-0 z-50 w-full h-screen bg-black/20 flex items-center justify-center p-5 opacity-100 pointer-events-auto transition-all"
            : "modalwrapper fixed top-0 left-0 z-50 w-full h-screen bg-black/20 flex items-center justify-center p-5 opacity-0 pointer-events-none transition-all"
        }
        onClick={(event) => {
          if (event.target.classList.contains("modalwrapper")) {
            setLangModal(false);
          }
        }}
      >
        <div
          ref={modalRef}
          className={
            langModal
              ? "modalbox w-full max-w-md p-4 bg-white rounded-md flex flex-col gap-4 scale-100 transition-all"
              : "modalbox w-full max-w-md p-4 bg-white rounded-md flex flex-col gap-4 scale-75 transition-all"
          }
        >
          <h4 className="text-center text-textColor text-base md:text-lg font-semibold">
            {t("select_lang")}
          </h4>
          <button
            onClick={() => {
              setLanguage("tm");
              setLangModal(false);
            }}
            className={`${
              language === "tm"
                ? "bg-primary text-white"
                : "active:bg-primary md:hover:bg-primary text-primary active:text-white md:hover:text-white transition-all"
            } w-full border-2 border-primary text-sm md:text-base text-center font-semibold p-2.5 rounded-md`}
          >
            Türkmen
          </button>
          <button
            onClick={() => {
              setLanguage("ru");
              setLangModal(false);
            }}
            className={`${
              language === "ru"
                ? "bg-primary text-white"
                : "active:bg-primary md:hover:bg-primary text-primary active:text-white md:hover:text-white transition-all"
            } w-full border-2 border-primary text-sm md:text-base text-center font-semibold p-2.5 rounded-md`}
          >
            Русский
          </button>
          <button
            onClick={() => {
              setLanguage("en");
              setLangModal(false);
            }}
            className={`${
              language === "en"
                ? "bg-primary text-white"
                : "active:bg-primary md:hover:bg-primary text-primary active:text-white md:hover:text-white transition-all"
            } w-full border-2 border-primary text-sm md:text-base text-center font-semibold p-2.5 rounded-md`}
          >
            English
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
