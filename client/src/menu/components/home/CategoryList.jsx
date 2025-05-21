import React from "react";
import CategoryCard from "./CategoryCard";
import useAppStore from "../../../store/appStore";
import { useTranslation } from "react-i18next";

const CategoryList = (props) => {
  const language = useAppStore((state) => state.language);
  const { t } = useTranslation();

  return (
    <section>
      <div className="container">
        <div className="w-full px-5 md:px-10 py-5 flex flex-col gap-5">
          <h2 className="text-textColor text-xl md:text-2xl font-semibold">
            {t("categories")}
          </h2>
          <div className="w-full grid grid-cols-12 gap-5">
            {props.categories.map((category) => (
              <CategoryCard
                key={category._id}
                id={category._id}
                name={
                  language === "en"
                    ? category.nameEn
                    : language === "ru"
                    ? category.nameRu
                    : category.nameTm
                }
                image={category.image}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryList;
