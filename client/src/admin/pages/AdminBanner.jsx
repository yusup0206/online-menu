import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api";
import { HiCheckCircle, HiXCircle } from "react-icons/hi";
import { MdModeEditOutline } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import Loader from "../components/Loader";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

const AdminBanner = () => {
  const [pageData, setPageData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [limit] = useState(10);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async (page = 1) => {
      setLoading(true);
      try {
        const response = await api.get(
          `/banner/admin/get?page=${page}&limit=${limit}`
        );
        setPageData(response.data.data);
        setCurrentPage(response.data.currentPage);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    window.scroll(0, 0);
    fetchData(currentPage);
  }, [currentPage, limit]);

  const handleDelete = async (id) => {
    if (!window.confirm(t("banner_question"))) return;

    try {
      await api.delete(`/banner/delete/${id}`);
      setPageData((prevData) => prevData.filter((item) => item._id !== id));
      toast.success(t("deleted"));
    } catch (error) {
      console.error("Failed to delete banner:", error);
      toast.error(error);
    }
  };

  if (loading) {
    return (
      <div className="box w-full h-30 flex items-center justify-center">
        <Loader color="primary" size="3xl" />
      </div>
    );
  }

  return (
    <section className="box w-full grid gap-4">
      <div className="w-full flex items-center justify-between gap-4">
        <h3 className="text-textColor text-lg font-semibold">{t("banners")}</h3>
        <Link to="/admin/banner/create" className="btn btn-primary">
          {t("create_banner")}
        </Link>
      </div>

      <div className="w-full overflow-x-auto">
        <div className="min-w-[800px]">
          <div className="w-full grid grid-cols-7 gap-4 bg-primary rounded-sm">
            <h5 className="text-white text-sm font-semibold p-2 text-center">
              №
            </h5>
            <h5 className="text-white text-sm font-semibold p-2 text-center">
              {t("name")}
            </h5>
            <h5 className="text-white text-sm font-semibold p-2 text-center">
              {t("image")}
            </h5>
            <h5 className="text-white text-sm font-semibold p-2 text-center">
              {t("link")}
            </h5>
            <h5 className="text-white text-sm font-semibold p-2 text-center">
              {t("position")}
            </h5>
            <h5 className="text-white text-sm font-semibold p-2 text-center">
              {t("status")}
            </h5>
            <h5 className="text-white text-sm font-semibold p-2 text-center">
              {t("actions")}
            </h5>
          </div>

          {pageData.length > 0 ? (
            pageData.map((data, index) => (
              <div
                key={data._id}
                className="w-full grid grid-cols-7 gap-4 items-center odd:bg-gray-100 even:bg-white rounded-sm"
              >
                <p className="text-textColor text-sm p-2 text-center">
                  {(currentPage - 1) * limit + index + 1}
                </p>
                <p className="text-textColor text-sm p-2 text-center">
                  {data.name}
                </p>
                <div className="p-2 text-center flex items-center justify-center">
                  <img
                    src={data.image}
                    alt={data.name}
                    className="size-20 min-20 object-cover rounded-sm"
                  />
                </div>
                <p className="text-textColor text-sm p-2 text-center">
                  {data.link || "-"}
                </p>
                <p className="text-textColor text-sm p-2 text-center">
                  {data.position}
                </p>
                <div className="p-2 gap-1 text-center flex items-center justify-center">
                  {data.status ? (
                    <>
                      <HiCheckCircle className="text-green-500 text-xl" />
                      <p className="text-green-500 text-sm">{t("active")}</p>
                    </>
                  ) : (
                    <>
                      <HiXCircle className="text-red-500 text-xl" />
                      <p className="text-red-500 text-sm">{t("passive")}</p>
                    </>
                  )}
                </div>
                <div className="flex items-center justify-center gap-2 text-center">
                  <Link to={`/admin/banner/update/${data._id}`} className="btn">
                    <MdModeEditOutline />
                  </Link>
                  <button
                    onClick={() => handleDelete(data._id)}
                    className="btn btn-danger"
                  >
                    <RiDeleteBin5Fill />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-textColor text-sm p-2 text-center">
              {t("no_banners")}
            </p>
          )}
        </div>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="btn"
          >
            <LuChevronLeft className="text-xl" />
          </button>

          {currentPage > 2 && (
            <button
              onClick={() => setCurrentPage(1)}
              className="btn btn-outline"
            >
              1
            </button>
          )}

          {currentPage > 3 && <span className="btn disabled">...</span>}

          {currentPage > 1 && (
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              className="btn btn-outline"
            >
              {currentPage - 1}
            </button>
          )}

          <button className="btn btn-primary">{currentPage}</button>

          {currentPage < totalPages && (
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              className="btn btn-outline"
            >
              {currentPage + 1}
            </button>
          )}

          {currentPage < totalPages - 2 && (
            <span className="btn disabled">...</span>
          )}

          {currentPage < totalPages - 1 && (
            <button
              onClick={() => setCurrentPage(totalPages)}
              className="btn btn-outline"
            >
              {totalPages}
            </button>
          )}

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="btn"
          >
            <LuChevronRight className="text-xl" />
          </button>
        </div>
      )}
    </section>
  );
};

export default AdminBanner;
