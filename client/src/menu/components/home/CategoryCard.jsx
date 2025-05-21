import React from "react";
import { Link } from "react-router-dom";

const CategoryCard = (props) => {
  return (
    <Link
      to={`/category/${props.id}`}
      className="group relative w-full h-full max-h-[180px] md:max-h-[230px] col-span-6 md:col-span-3 rounded-md overflow-hidden shadow-md"
    >
      <div className="w-full h-full min-h-[180px] md:min-h-[230px] bg-gray-100">
        <img
          src={props.image}
          alt=""
          className="w-full h-full object-cover group-active:scale-105 md:group-hover:scale-105 transition-all"
          loading="lazy"
        />
      </div>
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-center bg-black/20">
        <h5 className="text-white text-sm md:text-base font-semibold">
          {props.name}
        </h5>
      </div>
    </Link>
  );
};

export default CategoryCard;
