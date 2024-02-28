/* eslint-disable */
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translation_EN from "./en.json";

const resources = {
  en: {
    translation: translation_EN,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    fallbackLng: "en", // use en translations if detected language is not available
    keySeparator: true,
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
