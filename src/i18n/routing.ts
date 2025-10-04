import { defineRouting } from "next-intl/routing";

export const mainPagePathnames = {
  "/about": {
    "pt-PT": "/sobre",
    en: "/about",
  },
  "/news": {
    "pt-PT": "/noticias",
    en: "/news",
  },
  "/in-dojo": {
    "pt-PT": "/no-dojo",
    en: "/in-dojo",
  },
  "/history": {
    "pt-PT": "/historia",
    en: "/history",
  },
  "/philosophy": {
    "pt-PT": "/filosofia",
    en: "/philosophy",
  },
  "/style-ski": {
    "pt-PT": "/estilo-ski",
    en: "/style-ski",
  },
} as const;

export const philosophyPagePathnames = {
  "/philosophy/bushido": {
    "pt-PT": "/filosofia/bushido",
    en: "/philosophy/bushido",
  },
  "/philosophy/dojo-kun": {
    "pt-PT": "/filosofia/dojo-kun",
    en: "/philosophy/dojo-kun",
  },
  "/philosophy/niju-kun": {
    "pt-PT": "/filosofia/niju-kun",
    en: "/philosophy/niju-kun",
  },
};

export const inDojoPagePathnames = {
  "/in-dojo/salutation": {
    "pt-PT": "/no-dojo/saudacao",
    en: "/in-dojo/salutation",
  },
  "/in-dojo/rules": {
    "pt-PT": "/no-dojo/regras",
    en: "/in-dojo/rules",
  },
  "/in-dojo/vocabulary": {
    "pt-PT": "/no-dojo/vocabulario",
    en: "/in-dojo/vocabulary",
  },
  "/in-dojo/grades": {
    "pt-PT": "/no-dojo/graduacoes",
    en: "/in-dojo/grades",
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
    "/faq": {
      "pt-PT": "/perguntas-frequentes",
      en: "/faq",
    },
    "/privacy-policy": {
      "pt-PT": "/politica-de-privacidade",
      en: "/privacy-policy",
    },
  },
});
