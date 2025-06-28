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

export const philosophyPagePathnames = {
  "/philosophy/bushido": {
    "pt-PT": "/filosofia/bushido",
  },
  "/philosophy/dojo-kun": {
    "pt-PT": "/filosofia/dojo-kun",
  },
  "/philosophy/tenets": {
    "pt-PT": "/filosofia/principios",
  },
};

export const routing = defineRouting({
  locales: ["pt-PT", "en"],
  defaultLocale: "pt-PT",
  localePrefix: "as-needed",
  pathnames: {
    "/": "/",
    ...mainPagePathnames,
    ...philosophyPagePathnames,
    "/privacy-policy": {
      "pt-PT": "/politica-de-privacidade",
    },
    "/not-found": {
      "pt-PT": "/nao-encontrado",
    },
  },
});
