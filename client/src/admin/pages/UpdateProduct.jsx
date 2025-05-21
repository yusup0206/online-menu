import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api";
import { useTranslation } from "react-i18next";
import useAppStore from "../../store/appStore";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

const UpdateProduct = () => {
  const { id } = useParams();
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
    imageUrl: "", // To display the existing image
  });
  const [categories, setCategories] = useState([]);
  const { t } = useTranslation();
  const language = useAppStore((state) => state.language);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/product/get/${id}`);
        const {
          nameEn,
          nameRu,
          nameTm,
          descriptionEn,
          descriptionRu,
          descriptionTm,
          price,
          image,
          status,
          position,
          category,
        } = data;
        setProductData({
          nameEn,
          nameRu,
          nameTm,
          descriptionEn,
          descriptionRu,
          descriptionTm,
          price,
          status,
          position,
          category: category ? category._id : "", // Set category ID
          imageUrl: image,
        });
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const { data } = await api.get("/category/get?limit=1000"); // Adjust limit as needed
        setCategories(data.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchProduct();
    fetchCategories();
  }, [id, setLoading]);

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
    formData.append("category", productData.category);
    if (productData.image instanceof File) {
      formData.append("image", productData.image);
    }

    setLoading(true);
    try {
      await api.put(`/product/update/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/admin/product");
      toast.success(t("updated"));
    } catch (error) {
      console.error("Failed to update product:", error);
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
            {t("update_product")}
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
            />
            {productData.imageUrl && !(productData.image instanceof File) && (
              <img
                src={productData.imageUrl}
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

export default UpdateProduct;
