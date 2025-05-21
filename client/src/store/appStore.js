import { create } from "zustand";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import en from "../locales/en.json";
import ru from "../locales/ru.json";
import tm from "../locales/tm.json";

const useAppStore = create((set, get) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,
  isSuperAdmin:
    JSON.parse(localStorage.getItem("user"))?.user?.isSuperAdmin || false,
  loading: false,
  language: localStorage.getItem("language") || "tm",

  setUser: (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    set({
      user,
      isSuperAdmin: user?.user?.isSuperAdmin === true,
    });
  },

  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
    set({ user: null, isSuperAdmin: false });
  },
  setLoading: (isLoading) => set({ loading: isLoading }),
  setLanguage: (language) => {
    set({ language });
    localStorage.setItem("language", language);
    i18next.changeLanguage(language);
  },
  initI18n: () => {
    i18next.use(initReactI18next).init({
      resources: {
        en: {
          translation: en,
        },
        ru: {
          translation: ru,
        },
        tm: {
          translation: tm,
        },
      },
      lng: get().language,
      fallbackLng: "en",
      interpolation: {
        escapeValue: false,
      },
    });
  },
}));

export default useAppStore;
