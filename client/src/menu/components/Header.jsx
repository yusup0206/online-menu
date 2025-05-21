import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAppStore from "../../store/appStore";
import { useTranslation } from "react-i18next";

const Header = (props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [langModal, setLangModal] = useState(false);
  const modalRef = useRef(null);

  const language = useAppStore((state) => state.language);
  const setLanguage = useAppStore((state) => state.setLanguage);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setLangModal(false);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
    window.scroll(0, 0);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef]);

  return (
    <>
      <header className="sticky top-0 z-40">
        <nav className="bg-primary">
          <div className="container">
            <div className="w-full px-5 md:px-10 py-2 grid grid-cols-3 items-center gap-5">
              <div className="">
                {location.pathname.includes("/home") ? null : (
                  <button
                    onClick={handleGoBack}
                    className="mr-auto w-10 h-10 flex items-center justify-center rounded-md border-2 border-white text-white text-sm md:text-base font-semibold active:bg-white md:hover:bg-white active:text-primary md:hover:text-primary transition-all cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="3"
                      stroke="currentColor"
                      className="size-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 19.5 8.25 12l7.5-7.5"
                      />
                    </svg>
                  </button>
                )}
              </div>
              <Link to={"/home"} className="h-[60px] mx-auto">
                <img src={props.information?.logo} alt="" className="h-full" />
              </Link>
              <button
                onClick={() => setLangModal(true)}
                className="ml-auto w-10 h-10 flex items-center justify-center rounded-md border-2 border-white text-white text-sm md:text-base font-semibold active:bg-white md:hover:bg-white active:text-primary md:hover:text-primary transition-all cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-5"
                >
                  <path d="M21.721 12.752a9.711 9.711 0 0 0-.945-5.003 12.754 12.754 0 0 1-4.339 2.708 18.991 18.991 0 0 1-.214 4.772 17.165 17.165 0 0 0 5.498-2.477ZM14.634 15.55a17.324 17.324 0 0 0 .332-4.647c-.952.227-1.945.347-2.966.347-1.021 0-2.014-.12-2.966-.347a17.515 17.515 0 0 0 .332 4.647 17.385 17.385 0 0 0 5.268 0ZM9.772 17.119a18.963 18.963 0 0 0 4.456 0A17.182 17.182 0 0 1 12 21.724a17.18 17.18 0 0 1-2.228-4.605ZM7.777 15.23a18.87 18.87 0 0 1-.214-4.774 12.753 12.753 0 0 1-4.34-2.708 9.711 9.711 0 0 0-.944 5.004 17.165 17.165 0 0 0 5.498 2.477ZM21.356 14.752a9.765 9.765 0 0 1-7.478 6.817 18.64 18.64 0 0 0 1.988-4.718 18.627 18.627 0 0 0 5.49-2.098ZM2.644 14.752c1.682.971 3.53 1.688 5.49 2.099a18.64 18.64 0 0 0 1.988 4.718 9.765 9.765 0 0 1-7.478-6.816ZM13.878 2.43a9.755 9.755 0 0 1 6.116 3.986 11.267 11.267 0 0 1-3.746 2.504 18.63 18.63 0 0 0-2.37-6.49ZM12 2.276a17.152 17.152 0 0 1 2.805 7.121c-.897.23-1.837.353-2.805.353-.968 0-1.908-.122-2.805-.353A17.151 17.151 0 0 1 12 2.276ZM10.122 2.43a18.629 18.629 0 0 0-2.37 6.49 11.266 11.266 0 0 1-3.746-2.504 9.754 9.754 0 0 1 6.116-3.985Z" />
                </svg>
              </button>
            </div>
          </div>
        </nav>
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
