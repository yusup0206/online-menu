import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api";
import { useTranslation } from "react-i18next";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

const UpdateBanner = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bannerData, setBannerData] = useState({
    name: "",
    image: null,
    link: "",
    status: true,
    position: "",
    imageUrl: "", // To display the existing image
  });
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBanner = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/banner/get/${id}`);
        const { name, image, link, status, position } = data;
        setBannerData({
          name,
          link,
          status,
          position,
          imageUrl: image,
        });
      } catch (error) {
        console.error("Failed to fetch banner:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBanner();
  }, [id, setLoading]);

  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;
    if (name === "image") {
      setBannerData({ ...bannerData, image: files[0] });
    } else if (type === "checkbox") {
      setBannerData({ ...bannerData, [name]: checked });
    } else {
      setBannerData({ ...bannerData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", bannerData.name);
    formData.append("link", bannerData.link);
    formData.append("position", bannerData.position);
    formData.append("status", bannerData.status ? "true" : "false");
    if (bannerData.image instanceof File) {
      formData.append("image", bannerData.image);
    }

    setLoading(true);
    try {
      await api.put(`/banner/update/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/admin/banner");
      toast.success(t("updated"));
    } catch (error) {
      console.error("Failed to update banner:", error);
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
            {t("update_banner")}
          </h3>
        </div>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 sm:col-span-6 md:col-span-4">
            <label htmlFor="name" className="text-textColor text-sm mb-2">
              {t("name")}
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={bannerData.name}
              onChange={handleChange}
              className="w-full p-2 border-2 rounded-sm outline-primary"
              required
            />
          </div>

          <div className="col-span-12 sm:col-span-6 md:col-span-4">
            <label htmlFor="link" className="text-textColor text-sm mb-2">
              {t("link")}
            </label>
            <input
              id="link"
              type="text"
              name="link"
              value={bannerData.link}
              onChange={handleChange}
              className="w-full p-2 border-2 rounded-sm outline-primary"
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
              value={bannerData.position}
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
            {bannerData.imageUrl && !(bannerData.image instanceof File) && (
              <img
                src={bannerData.imageUrl}
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
                checked={bannerData.status}
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

export default UpdateBanner;
