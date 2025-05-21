import React from "react";
import ProductCard from "./ProductCard";
import useAppStore from "../../../store/appStore";

const ProductList = (props) => {
  const language = useAppStore((state) => state.language);

  return (
    <section>
      <div className="container">
        <div className="w-full px-5 md:px-10 py-5 flex flex-col gap-5">
          <div className="w-full grid grid-cols-12 gap-5">
            {props.products.map((product) => (
              <ProductCard
                key={product._id}
                id={product._id}
                categoryId={props.categoryId}
                name={
                  language === "en"
                    ? product.nameEn
                    : language === "ru"
                    ? product.nameRu
                    : product.nameTm
                }
                price={product.price}
                image={product.image}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductList;
