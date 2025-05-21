import React, { useEffect, useState, useRef } from "react";
import ProductList from "../components/category/ProductList";
import PageName from "../components/PageName";
import { useParams } from "react-router-dom";
import api from "../../api";
import { useTranslation } from "react-i18next";
import Loader from "../../admin/components/Loader";

const Category = () => {
  const { id } = useParams();
  const [category, setCategory] = useState({});
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(16);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const listRef = useRef(null);
  const { t } = useTranslation();

  const fetchData = async (page = 1) => {
    if (page > 1) {
      setLoadingMore(true);
    } else {
      setLoading(true);
    }

    try {
      const categoryResponse = await api.get(`/category/get/${id}`);
      setCategory(categoryResponse.data);

      const productResponse = await api.get(
        `/product/category/${id}?page=${page}&limit=${limit}` // Use the new endpoint
      );

      setProducts((prevProducts) => [
        ...prevProducts,
        ...productResponse.data.data,
      ]);
      setCurrentPage(productResponse.data.currentPage);
      setTotalPages(productResponse.data.totalPages);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    window.scroll(0, 0);

    const initialFetch = async () => {
      setLoading(true);
      try {
        const categoryResponse = await api.get(`/category/get/${id}`);
        setCategory(categoryResponse.data);

        const productResponse = await api.get(
          `/product/category/${id}?page=1&limit=${limit}` // Use the new endpoint, start from page 1
        );

        setProducts(productResponse.data.data);
        setCurrentPage(productResponse.data.currentPage);
        setTotalPages(productResponse.data.totalPages);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    initialFetch();
  }, [id, limit, setLoading]);

  const handleLoadMore = () => {
    if (currentPage < totalPages) {
      fetchData(currentPage + 1);
    }
  };

  if (loading) {
    return (
      <section className="flex flex-col">
        <div className="container ">
          <div className="w-full px-5 md:px-10 py-5 flex flex-col">
            <div className="w-full h-[255px] md:h-[450px] rounded-md shadow-md bg-gray-200 animate-pulse mb-10"></div>
            <div className="w-full grid grid-cols-12 gap-5">
              <div className="col-span-6 md:col-span-3 flex flex-col gap-3">
                <div className="w-full h-[180px] md:h-[230px]  rounded-md shadow-md bg-gray-200 animate-pulse"></div>
                <div className="w-full flex items-start justify-between gap-3">
                  <div className="w-full h-[20px] md:h-[24px] rounded-md bg-gray-200 animate-pulse"></div>
                  <div className="w-10 h-[20px] md:h-[24px] rounded-md bg-gray-200 animate-pulse"></div>
                </div>
              </div>
              <div className="col-span-6 md:col-span-3 flex flex-col gap-3">
                <div className="w-full h-[180px] md:h-[230px]  rounded-md shadow-md bg-gray-200 animate-pulse"></div>
                <div className="w-full flex items-start justify-between gap-3">
                  <div className="w-full h-[20px] md:h-[24px] rounded-md bg-gray-200 animate-pulse"></div>
                  <div className="w-10 h-[20px] md:h-[24px] rounded-md bg-gray-200 animate-pulse"></div>
                </div>
              </div>
              <div className="col-span-6 md:col-span-3 flex flex-col gap-3">
                <div className="w-full h-[180px] md:h-[230px]  rounded-md shadow-md bg-gray-200 animate-pulse"></div>
                <div className="w-full flex items-start justify-between gap-3">
                  <div className="w-full h-[20px] md:h-[24px] rounded-md bg-gray-200 animate-pulse"></div>
                  <div className="w-10 h-[20px] md:h-[24px] rounded-md bg-gray-200 animate-pulse"></div>
                </div>
              </div>
              <div className="col-span-6 md:col-span-3 flex flex-col gap-3">
                <div className="w-full h-[180px] md:h-[230px]  rounded-md shadow-md bg-gray-200 animate-pulse"></div>
                <div className="w-full flex items-start justify-between gap-3">
                  <div className="w-full h-[20px] md:h-[24px] rounded-md bg-gray-200 animate-pulse"></div>
                  <div className="w-10 h-[20px] md:h-[24px] rounded-md bg-gray-200 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <PageName category={category} />
      <ProductList
        categoryId={category._id}
        products={products}
        listRef={listRef}
      />
      {currentPage < totalPages && (
        <div className="flex justify-center mt-4">
          <button
            onClick={handleLoadMore}
            className="btn min-w-[169px] flex items-center justify-center"
            disabled={loadingMore}
          >
            {loadingMore ? (
              <Loader color="gray-500" size="xl" />
            ) : (
              t("load_more")
            )}
          </button>
        </div>
      )}
    </>
  );
};

export default Category;
