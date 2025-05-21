import React, { useState, useEffect } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useAppStore from "../../store/appStore";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

const CreateProduct = () => {
  const navigate = useNavigate();
  const [productData, setProductData] = useState({
    nameEn: "",
    nameRu: "",
    nameTm: "",
    descriptionEn: "",
    descriptionRu: "",
    descriptionTm: "",
    price: "",
    image: null,
    status: true,
    position: "",
    category: "",
  });
  const [categories, setCategories] = useState([]);
  const { t } = useTranslation();
  const language = useAppStore((state) => state.language);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await api.get("/category/get?limit=1000"); // Adjust limit as needed to fetch all categories
        setCategories(data.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;
    if (name === "image") {
      setProductData({ ...productData, image: files[0] });
    } else if (type === "checkbox") {
      setProductData({ ...productData, [name]: checked });
    } else {
      setProductData({ ...productData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nameEn", productData.nameEn);
    formData.append("nameRu", productData.nameRu);
    formData.append("nameTm", productData.nameTm);
    formData.append("descriptionEn", productData.descriptionEn);
    formData.append("descriptionRu", productData.descriptionRu);
    formData.append("descriptionTm", productData.descriptionTm);
    formData.append("price", productData.price);
    formData.append("position", productData.position);
    formData.append("status", productData.status ? "true" : "false");
    formData.append("image", productData.image);
    formData.append("category", productData.category);

    setLoading(true);
    try {
      await api.post("/product/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/admin/product");
      toast.success(t("created"));
    } catch (error) {
      console.error("Failed to create product:", error);
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
            {t("create_product")}
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
                value={productData[lang]}
                onChange={handleChange}
                className="w-full p-2 border-2 rounded-sm outline-primary"
                required
              />
            </div>
          ))}

          {["descriptionEn", "descriptionRu", "descriptionTm"].map((lang) => (
            <div key={`desc-${lang}`} className="col-span-12">
              <label htmlFor={lang} className="text-textColor text-sm mb-2">
                {t("description")} {lang.slice(-2).toUpperCase()}
              </label>
              <textarea
                id={lang}
                name={lang}
                value={productData[lang]}
                onChange={handleChange}
                className="w-full p-2 border-2 rounded-sm outline-primary"
                rows="3"
                required
              />
            </div>
          ))}

          <div className="col-span-12 sm:col-span-6 md:col-span-4">
            <label htmlFor="price" className="text-textColor text-sm mb-2">
              {t("price")}
            </label>
            <input
              id="price"
              type="number"
              name="price"
              value={productData.price}
              onChange={handleChange}
              className="w-full p-2 border-2 rounded-sm outline-primary"
              required
            />
          </div>

          <div className="col-span-12 sm:col-span-6 md:col-span-4">
            <label htmlFor="position" className="text-textColor text-sm mb-2">
              {t("position")}
            </label>
            <input
              id="position"
              type="number"
              name="position"
              value={productData.position}
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
              required
            />
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
                checked={productData.status}
                onChange={handleChange}
                className="sr-only peer"
              />
              <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-primary after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
            </label>
          </div>

          <div className="col-span-12 sm:col-span-6 md:col-span-4">
            <label htmlFor="category" className="text-textColor text-sm mb-2">
              {t("category")}
            </label>
            <select
              id="category"
              name="category"
              value={productData.category}
              onChange={handleChange}
              className="w-full p-2 border-2 rounded-sm outline-primary"
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {language === "en"
                    ? cat.nameEn
                    : language === "ru"
                    ? cat.nameRu
                    : cat.nameTm}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="w-full flex items-center justify-end gap-2">
          <button onClick={() => navigate(-1)} className="btn">
            {t("back")}
          </button>
          <button className="btn btn-primary">{t("submit")}</button>
        </div>
      </form>
    </section>
  );
};

export default CreateProduct;
