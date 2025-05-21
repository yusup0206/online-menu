import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import { useTranslation } from "react-i18next";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

const Information = () => {
  const navigate = useNavigate();
  const [informationData, setInformationData] = useState({
    phone1: "",
    phone2: "",
    phone3: "",
    addressEn: "",
    addressRu: "",
    addressTm: "",
    addressLink: "",
    logo: null,
  });
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [isCreate, setIsCreate] = useState(false); // Track create vs. update

  useEffect(() => {
    const fetchInformation = async () => {
      setLoading(true);
      try {
        const response = await api.get("/information/admin/get");
        if (response.data) {
          // If information exists, set it to state for updating
          setInformationData(response.data);
          setIsCreate(false);
        } else {
          //if information does not exist, set default data
          setIsCreate(true);
        }
      } catch (error) {
        console.error("Failed to fetch information:", error);
        setIsCreate(true); // Assume create if fetch fails (or returns empty)
      } finally {
        setLoading(false);
      }
    };
    fetchInformation();
  }, [setLoading]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "logo") {
      setInformationData({ ...informationData, logo: files[0] });
    } else {
      setInformationData({ ...informationData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("phone1", informationData.phone1);
    formData.append("phone2", informationData.phone2 || "");
    formData.append("phone3", informationData.phone3 || "");
    formData.append("addressEn", informationData.addressEn || "");
    formData.append("addressRu", informationData.addressRu || "");
    formData.append("addressTm", informationData.addressTm || "");
    formData.append("addressLink", informationData.addressLink || "");
    if (informationData.logo) {
      formData.append("logo", informationData.logo);
    }

    setLoading(true);
    try {
      if (isCreate) {
        await api.post("/information/create", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success(t("created"));
      } else {
        await api.put("/information/update", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success(t("updated"));
      }

      navigate("/admin/information");
    } catch (error) {
      console.error("Failed to submit information:", error);
      toast.error(error);
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
            {isCreate ? t("create_information") : t("update_information")}
          </h3>
        </div>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 sm:col-span-6 md:col-span-4">
            <label htmlFor="phone1" className="text-textColor text-sm mb-2">
              {t("phone")} 1
            </label>
            <input
              id="phone1"
              type="tel"
              name="phone1"
              value={informationData.phone1}
              onChange={handleChange}
              required
              className="w-full p-2 border-2 rounded-sm outline-primary"
              pattern="\+[0-9]{6,15}"
            />
          </div>
          <div className="col-span-12 sm:col-span-6 md:col-span-4">
            <label htmlFor="phone2" className="text-textColor text-sm mb-2">
              {t("phone")} 2
            </label>
            <input
              id="phone2"
              type="tel"
              name="phone2"
              value={informationData.phone2}
              onChange={handleChange}
              className="w-full p-2 border-2 rounded-sm outline-primary"
              pattern="\+[0-9]{6,15}"
            />
          </div>
          <div className="col-span-12 sm:col-span-6 md:col-span-4">
            <label htmlFor="phone3" className="text-textColor text-sm mb-2">
              {t("phone")} 3
            </label>
            <input
              id="phone3"
              type="tel"
              name="phone3"
              value={informationData.phone3}
              onChange={handleChange}
              className="w-full p-2 border-2 rounded-sm outline-primary"
              pattern="\+[0-9]{6,15}"
            />
          </div>

          <div className="col-span-12 sm:col-span-6 md:col-span-4">
            <label htmlFor="addressEn" className="text-textColor text-sm mb-2">
              {t("address")} (En)
            </label>
            <input
              id="addressEn"
              name="addressEn"
              value={informationData.addressEn}
              onChange={handleChange}
              className="w-full p-2 border-2 rounded-sm outline-primary"
            />
          </div>
          <div className="col-span-12 sm:col-span-6 md:col-span-4">
            <label htmlFor="addressRu" className="text-textColor text-sm mb-2">
              {t("address")} (Ru)
            </label>
            <input
              id="addressRu"
              name="addressRu"
              value={informationData.addressRu}
              onChange={handleChange}
              className="w-full p-2 border-2 rounded-sm outline-primary"
            />
          </div>
          <div className="col-span-12 sm:col-span-6 md:col-span-4">
            <label htmlFor="addressTm" className="text-textColor text-sm mb-2">
              {t("address")} (Tm)
            </label>
            <input
              id="addressTm"
              name="addressTm"
              value={informationData.addressTm}
              onChange={handleChange}
              className="w-full p-2 border-2 rounded-sm outline-primary"
            />
          </div>
          <div className="col-span-12 sm:col-span-6 md:col-span-4">
            <label
              htmlFor="addressLink"
              className="text-textColor text-sm mb-2"
            >
              {t("address_link")}
            </label>
            <input
              id="addressLink"
              name="addressLink"
              value={informationData.addressLink}
              onChange={handleChange}
              className="w-full p-2 border-2 rounded-sm outline-primary"
            />
          </div>

          <div className="col-span-12 sm:col-span-6 md:col-span-4">
            <label htmlFor="logo" className="text-textColor text-sm mb-2">
              {t("logo")}
            </label>
            <input
              id="logo"
              type="file"
              name="logo"
              onChange={handleChange}
              className="w-full p-2 border-2 rounded-sm outline-primary"
            />
            {informationData.logo &&
              !(informationData.logo instanceof File) && (
                <img
                  src={informationData.logo}
                  alt="Logo Preview"
                  className="mt-2 w-40 h-20 object-contain rounded-sm"
                />
              )}
          </div>
        </div>

        <div className="w-full flex items-center justify-end gap-2">
          <button type="button" onClick={() => navigate(-1)} className="btn">
            {t("back")}
          </button>
          <button type="submit" className="btn btn-primary">
            {isCreate ? t("submit") : t("update")}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Information;
