import i18next from "i18next";
import translation from "zod-i18n-map/locales/pt/zod.json";

export const initTranslation = () => {
  i18next.init({
    lng: "pt",
    resources: {
      pt: { zod: translation },
    },
  });
};