import React from "react";
import { Link } from "react-router-dom";

const ProductCard = (props) => {
  return (
    <Link
      to={`/category/${props.categoryId}/product/${props.id}`}
      className="group col-span-6 sm:col-span-4 md:col-span-3 flex flex-col gap-2"
    >
      <div className="w-full h-full max-h-[180px] md:max-h-[230px] rounded-md overflow-hidden shadow-md">
        <div className="w-full h-full min-h-[180px] md:min-h-[230px] bg-lazyBg">
          <img
            src={props.image}
            alt={props.nameTm}
            className="w-full h-full object-cover group-active:scale-105 md:group-hover:scale-105 transition-all"
            loading="lazy"
          />
        </div>
      </div>
      <div className="flex items-start justify-between gap-2">
        <h5 className="text-textColor text-sm md:text-base font-semibold">
          {props.name}
        </h5>
        <h5 className="text-primary text-sm md:text-base font-semibold whitespace-nowrap">
          {props.price} TMT
        </h5>
      </div>
    </Link>
  );
};

export default ProductCard;
