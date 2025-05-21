import React from "react";
import { Link, useOutletContext } from "react-router-dom";
import useAppStore from "../../../store/appStore";
import { FaPhoneAlt } from "react-icons/fa";

const ProductInfo = (props) => {
  const language = useAppStore((state) => state.language);
  const { information } = useOutletContext();

  if (!information) return null;

  return (
    <section>
      <div className="container">
        <div className="w-full px-5 md:px-10 py-5 grid grid-cols-12 gap-5">
          <div className="w-full col-span-12 md:col-span-12 rounded-md overflow-hidden shadow-md">
            <img
              src={props.product.image}
              alt=""
              className="w-full object-cover"
            />
          </div>
          <div className="w-full col-span-12 md:col-span-12 flex flex-col gap-2">
            <h2 className="text-textColor text-xl md:text-2xl font-semibold">
              {language === "en"
                ? props.product.nameEn
                : language === "ru"
                ? props.product.nameRu
                : props.product.nameTm}
            </h2>

            <p className="text-textColor text-sm md:text-base">
              {language === "en"
                ? props.product.descriptionEn
                : language === "ru"
                ? props.product.descriptionRu
                : props.product.descriptionTm}
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore
              atque corporis facilis distinctio fugiat. Iure, voluptas
              aspernatur? Praesentium quibusdam velit est incidunt error nisi
              voluptatum!
            </p>
            <h2 className="text-primary text-xl md:text-2xl font-semibold whitespace-nowrap">
              {props.product.price} TMT
            </h2>
            {information.phone1 === "" ? null : (
              <Link
                to={`tel:${information.phone1}`}
                className="flex items-center justify-center gap-2 mt-5 w-full rounded-md bg-primary text-white text-sm md:text-base font-semibold text-center p-2.5 active:bg-secondary md:hover:bg-secondary cursor-pointer transition-all"
              >
                <FaPhoneAlt className="text-xl" />
                {information.phone1}
              </Link>
            )}
            {information.phone2 === "" ? null : (
              <Link
                to={`tel:${information.phone2}`}
                className="flex items-center justify-center gap-2 w-full rounded-md bg-primary text-white text-sm md:text-base font-semibold text-center p-2.5 active:bg-secondary md:hover:bg-secondary cursor-pointer transition-all"
              >
                <FaPhoneAlt className="text-xl" />
                {information.phone2}
              </Link>
            )}
            {information.phone3 === "" ? null : (
              <Link
                to={`tel:${information.phone3}`}
                className="flex items-center justify-center gap-2 w-full rounded-md bg-primary text-white text-sm md:text-base font-semibold text-center p-2.5 active:bg-secondary md:hover:bg-secondary cursor-pointer transition-all"
              >
                <FaPhoneAlt className="text-xl" />
                {information.phone3}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductInfo;
