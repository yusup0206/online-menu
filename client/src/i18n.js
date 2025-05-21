import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import ru from "./locales/ru.json";
import tm from "./locales/tm.json";
import useAppStore from "./store/appStore";

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
  lng: useAppStore.getState().language,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

useAppStore.subscribe(
  (state) => state.language,
  (language) => {
    i18next.changeLanguage(language);
  }
);

export default i18next;
