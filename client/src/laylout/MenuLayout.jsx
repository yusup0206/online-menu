import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

// components
import Header from "../menu/components/Header";
import Footer from "../menu/components/Footer";
import api from "../api";
import Loader from "../admin/components/Loader";
import { FaArrowUp } from "react-icons/fa";

const MenuLayout = () => {
  const [information, setInformation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const fetchInformation = async () => {
      setLoading(true);
      try {
        const response = await api.get("/information/get");
        setInformation(response.data);
      } catch (error) {
        console.error("Error fetching information:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInformation();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (loading) {
    return (
      <section className="w-full h-screen flex items-center justify-center">
        <Loader color="primary" size="3xl" />
      </section>
    );
  }

  return (
    <>
      <Header information={information} />
      <main className="min-h-[calc(100vh-76px-60px)] py-5 relative">
        <Outlet context={{ information }} />

        <button
          onClick={scrollToTop}
          className={`
            fixed bottom-4 right-4 size-10 border-2 border-white text-white bg-primary
            flex items-center justify-center rounded-md transition-all duration-300
            ${
              showScrollButton
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }
          `}
        >
          <FaArrowUp className="size-5" />
        </button>
      </main>
      <Footer information={information} />
    </>
  );
};

export default MenuLayout;
