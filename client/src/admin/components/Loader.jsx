import React from "react";
import { LuLoaderCircle } from "react-icons/lu";

const Loader = (props) => {
  return (
    <LuLoaderCircle
      className={`text-${props.color} text-${props.size} animate-spin`}
    />
  );
};

export default Loader;
