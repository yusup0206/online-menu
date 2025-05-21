import React from "react";
import useAppStore from "../../store/appStore";

const PageName = (props) => {
  const language = useAppStore((state) => state.language);
  return (
    <section>
      <div className="container">
        <div className="w-full px-5 md:px-10 py-5">
          <div className="relative w-full max-h-[255px] md:max-h-[450px] rounded-md shadow-md overflow-hidden">
            <div className="w-full h-full min-h-[255] md:min-h-[450px] bg-lazyBg">
              <img
                src={props.category.image}
                alt={props.nameTm}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-center bg-black/20">
              <h5 className="text-white text-3xl md:text-4xl font-semibold">
                {language === "en"
                  ? props.category.nameEn
                  : language === "ru"
                  ? props.category.nameRu
                  : props.category.nameTm}
              </h5>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageName;
