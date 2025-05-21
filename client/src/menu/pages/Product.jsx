import React, { useEffect, useState } from "react";
import ProductInfo from "../components/product/ProductInfo";
import { useParams } from "react-router-dom";
import api from "../../api";

const Product = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    window.scroll(0, 0);

    const fetchData = async () => {
      setLoading(true);
      try {
        const productResponse = await api.get(`/product/get/${id}`);
        setProduct(productResponse.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, setLoading]);

  if (loading) {
    return (
      <section className="flex flex-col">
        <div className="container ">
          <div className="w-full px-5 md:px-10 py-5 flex flex-col">
            <div className="w-full h-[255px] md:h-[450px] rounded-md shadow-md bg-gray-200 animate-pulse mb-5"></div>
            <div className="w-40 h-[28px] md:h-[32px] rounded-md bg-gray-200 animate-pulse mb-5"></div>
            <div className="w-full h-[20px] md:h-[24px] rounded-md bg-gray-200 animate-pulse mb-2"></div>
            <div className="w-full h-[20px] md:h-[24px] rounded-md bg-gray-200 animate-pulse mb-2"></div>
            <div className="w-full h-[20px] md:h-[24px] rounded-md bg-gray-200 animate-pulse mb-2"></div>
            <div className="w-full h-[20px] md:h-[24px] rounded-md bg-gray-200 animate-pulse mb-2"></div>
            <div className="w-full h-[20px] md:h-[24px] rounded-md bg-gray-200 animate-pulse mb-5"></div>
            <div className="w-full h-[40px] md:h-[44px] rounded-md bg-gray-200 animate-pulse mb-2"></div>
            <div className="w-full h-[40px] md:h-[44px] rounded-md bg-gray-200 animate-pulse"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <ProductInfo product={product} />
    </>
  );
};

export default Product;
