import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api";
import { useTranslation } from "react-i18next";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

const UpdateCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categoryData, setCategoryData] = useState({
    nameEn: "",
    nameRu: "",
    nameTm: "",
    image: null,
    status: true,
    position: "",
  });
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategory = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/category/get/${id}`);
        const { nameEn, nameRu, nameTm, image, status, position } = data;
        setCategoryData({ nameEn, nameRu, nameTm, image, status, position });
      } catch (error) {
        console.error("Failed to fetch category:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategory();
  }, [id, setLoading]);

  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;
    if (name === "image") {
      setCategoryData({ ...categoryData, image: files[0] });
    } else if (type === "checkbox") {
      setCategoryData({ ...categoryData, [name]: checked });
    } else {
      setCategoryData({ ...categoryData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nameEn", categoryData.nameEn);
    formData.append("nameRu", categoryData.nameRu);
    formData.append("nameTm", categoryData.nameTm);
    formData.append("status", categoryData.status ? "true" : "false");
    formData.append("position", categoryData.position);
    if (categoryData.image instanceof File) {
      formData.append("image", categoryData.image);
    }

    setLoading(true);
    try {
      await api.put(`/category/update/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/admin/category");
      toast.success(t("updated"));
    } catch (error) {
      console.error("Failed to update category:", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
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
    <section>
      <form onSubmit={handleSubmit} className="box w-full grid gap-4">
        <div className="w-full flex items-center justify-between gap-4">
          <h3 className="text-textColor text-lg font-semibold">
            {t("update_category")}
          </h3>
        </div>
        <div className="grid grid-cols-12 gap-4">
          {["nameEn", "nameRu", "nameTm"].map((lang) => (
            <div key={lang} className="col-span-12 sm:col-span-6 md:col-span-4">
              <label htmlFor={lang} className="text-textColor text-sm mb-2">
                {t("name")} {lang.slice(-2).toUpperCase()}
              </label>
              <input
                id={lang}
                type="text"
                name={lang}
                value={categoryData[lang]}
                onChange={handleChange}
                className="w-full p-2 border-2 rounded-sm outline-primary"
                required
              />
            </div>
          ))}

          <div className="col-span-12 sm:col-span-6 md:col-span-4">
            <label htmlFor="position" className="text-textColor text-sm mb-2">
              {t("position")}
            </label>
            <input
              id="position"
              type="number"
              name="position"
              value={categoryData.position}
              onChange={handleChange}
              className="w-full p-2 border-2 rounded-sm outline-primary"
              required
            />
          </div>

          <div className="col-span-12 sm:col-span-6 md:col-span-4">
            <label htmlFor="image" className="text-textColor text-sm mb-2">
              {t("image")}
            </label>
            <input
              id="image"
              type="file"
              name="image"
              onChange={handleChange}
              className="w-full p-2 border-2 rounded-sm outline-primary"
            />
            {categoryData.image && !(categoryData.image instanceof File) && (
              <img
                src={categoryData.image}
                alt="Preview"
                className="mt-2 w-40 h-20 object-cover rounded-sm"
              />
            )}
          </div>

          <div className="col-span-12 sm:col-span-6 md:col-span-4">
            <label htmlFor="status" className="text-textColor text-sm mb-2">
              {t("status")}
            </label>
            <label className="flex items-center cursor-pointer mt-2 w-fit">
              <input
                id="status"
                type="checkbox"
                name="status"
                checked={categoryData.status}
                onChange={handleChange}
                className="sr-only peer"
              />
              <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-primary after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
            </label>
          </div>
        </div>

        <div className="w-full flex items-center justify-end gap-2">
          <button type="button" onClick={() => navigate(-1)} className="btn">
            {t("back")}
          </button>
          <button type="submit" className="btn btn-primary">
            {t("update")}
          </button>
        </div>
      </form>
    </section>
  );
};

export default UpdateCategory;
