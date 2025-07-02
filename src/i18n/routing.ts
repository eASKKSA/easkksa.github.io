import { defineRouting } from "next-intl/routing";

export const mainPagePathnames = {
  "/about": {
    "pt-PT": "/sobre",
  },
  "/news": {
    "pt-PT": "/noticias",
  },
  "/in-dojo": {
    "pt-PT": "/no-dojo",
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
  "/philosophy/niju-kun": {
    "pt-PT": "/filosofia/niju-kun",
  },
};

export const inDojoPagePathnames = {
  "/in-dojo/salutation": {
    "pt-PT": "/no-dojo/saudacao",
  },
  "/in-dojo/rules": {
    "pt-PT": "/no-dojo/regras",
  },
  "/in-dojo/vocabulary": {
    "pt-PT": "/no-dojo/vocabulario",
  },
  "/in-dojo/grades": {
    "pt-PT": "/no-dojo/graduacoes",
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
    ...inDojoPagePathnames,
    "/privacy-policy": {
      "pt-PT": "/politica-de-privacidade",
    },
    "/not-found": {
      "pt-PT": "/nao-encontrado",
    },
  },
});
