import React, { useEffect, useState, useCallback } from "react";

// components
import Slider from "../components/home/Slider";
import CategoryList from "../components/home/CategoryList";
import api from "../../api";
import { useTranslation } from "react-i18next";
import Loader from "../../admin/components/Loader";

const Home = () => {
  const [slides, setSlides] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categoryPage, setCategoryPage] = useState(1);
  const [categoryTotalPages, setCategoryTotalPages] = useState(1);
  const [categoryLimit] = useState(16);
  const [loadingMoreCategories, setLoadingMoreCategories] = useState(false);
  const { t } = useTranslation();

  const fetchCategories = useCallback(
    async (page = 1) => {
      if (page > 1) {
        setLoadingMoreCategories(true);
      } else {
        setLoading(true);
      }

      try {
        const categoryResponse = await api.get(
          `/category/get/active?page=${page}&limit=${categoryLimit}`
        );
        if (page === 1) {
          setCategories(categoryResponse.data.data);
        } else {
          setCategories((prevCategories) => [
            ...prevCategories,
            ...categoryResponse.data.data,
          ]);
        }

        setCategoryPage(categoryResponse.data.currentPage);
        setCategoryTotalPages(categoryResponse.data.totalPages);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
        setLoadingMoreCategories(false);
      }
    },
    [categoryLimit]
  );

  useEffect(() => {
    window.scroll(0, 0);

    const fetchData = async () => {
      setLoading(true);

      try {
        const slidesResponse = await api.get("/banner/get");
        setSlides(slidesResponse.data.data);

        await fetchCategories(1); // Fetch the first page of categories
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [fetchCategories]);

  const handleLoadMoreCategories = () => {
    if (categoryPage < categoryTotalPages) {
      fetchCategories(categoryPage + 1);
    }
  };

  if (loading) {
    return (
      <section className="flex flex-col">
        <div className="container ">
          <div className="w-full px-5 md:px-10 py-5 flex flex-col">
            <div className="w-full h-[255px] md:h-[450px] rounded-md shadow-md bg-gray-200 animate-pulse mb-10"></div>
            <div className="w-40 h-[28px] md:h-[32px] rounded-md bg-gray-200 animate-pulse mb-5"></div>
            <div className="w-full grid grid-cols-12 gap-5">
              <div className="w-full h-[180px] md:h-[230px] col-span-6 md:col-span-3 rounded-md shadow-md bg-gray-200 animate-pulse"></div>
              <div className="w-full h-[180px] md:h-[230px] col-span-6 md:col-span-3 rounded-md shadow-md bg-gray-200 animate-pulse"></div>
              <div className="w-full h-[180px] md:h-[230px] col-span-6 md:col-span-3 rounded-md shadow-md bg-gray-200 animate-pulse"></div>
              <div className="w-full h-[180px] md:h-[230px] col-span-6 md:col-span-3 rounded-md shadow-md bg-gray-200 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <Slider slides={slides} />
      <CategoryList categories={categories} />
      {categoryPage < categoryTotalPages && (
        <div className="flex justify-center mt-4">
          <button
            onClick={handleLoadMoreCategories}
            className="btn min-w-[169px] flex items-center justify-center"
            disabled={loadingMoreCategories}
          >
            {loadingMoreCategories ? (
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

export default Home;
