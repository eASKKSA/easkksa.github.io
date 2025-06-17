import { defineRouting } from "next-intl/routing";

export const mainPagePathnames = {
  "/about": {
    "pt-PT": "/sobre",
  },
  "/news": {
    "pt-PT": "/noticias",
  },
  "/dojo": {
    "pt-PT": "/dojo",
  },
  "/history": {
    "pt-PT": "/historia",
  },
  "/philosophy": {
    "pt-PT": "/filosofia",
  },
  "/style-ski": {
    "pt-PT": "/estilo-ski",
  },
};

export const routing = defineRouting({
  locales: ["pt-PT", "en"],
  defaultLocale: "pt-PT",
  localePrefix: "as-needed",
  pathnames: {
    "/": "/",
    ...mainPagePathnames,
    "/privacy-policy": {
      "pt-PT": "/politica-de-privacidade",
    },
    "/not-found": {
      "pt-PT": "/nao-encontrado",
    },
  },
});
