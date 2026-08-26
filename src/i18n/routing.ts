import { defineRouting } from "next-intl/routing";

export const mainPagePathnames = {
  "/about": {
    "pt-PT": "/sobre",
    en: "/about",
    es: "/sobre",
    fr: "/a-propos",
    ja: "/about",
  },
  "/news": {
    "pt-PT": "/noticias",
    en: "/news",
    es: "/noticias",
    fr: "/actualites",
    ja: "/news",
  },
  "/in-dojo": {
    "pt-PT": "/no-dojo",
    en: "/in-dojo",
    es: "/en-el-dojo",
    fr: "/dans-le-dojo",
    ja: "/dojo",
  },
  "/history": {
    "pt-PT": "/historia",
    en: "/history",
    es: "/historia",
    fr: "/histoire",
    ja: "/history",
  },
  "/philosophy": {
    "pt-PT": "/filosofia",
    en: "/philosophy",
    es: "/filosofia",
    fr: "/philosophie",
    ja: "/philosophy",
  },
  "/style-ski": {
    "pt-PT": "/estilo-ski",
    en: "/style-ski",
    es: "/estilo-ski",
    fr: "/style-ski",
    ja: "/style-ski",
  },
} as const;

export const philosophyPagePathnames = {
  "/philosophy/bushido": {
    "pt-PT": "/filosofia/bushido",
    en: "/philosophy/bushido",
    es: "/filosofia/bushido",
    fr: "/philosophie/bushido",
    ja: "/philosophy/bushido",
  },
  "/philosophy/dojo-kun": {
    "pt-PT": "/filosofia/dojo-kun",
    en: "/philosophy/dojo-kun",
    es: "/filosofia/dojo-kun",
    fr: "/philosophie/dojo-kun",
    ja: "/philosophy/dojo-kun",
  },
  "/philosophy/niju-kun": {
    "pt-PT": "/filosofia/niju-kun",
    en: "/philosophy/niju-kun",
    es: "/filosofia/niju-kun",
    fr: "/philosophie/niju-kun",
    ja: "/philosophy/niju-kun",
  },
};

export const inDojoPagePathnames = {
  "/in-dojo/salutation": {
    "pt-PT": "/no-dojo/saudacao",
    en: "/in-dojo/salutation",
    es: "/en-el-dojo/saludo",
    fr: "/dans-le-dojo/salutation",
    ja: "/dojo/reigi",
  },
  "/in-dojo/rules": {
    "pt-PT": "/no-dojo/regras",
    en: "/in-dojo/rules",
    es: "/en-el-dojo/reglas",
    fr: "/dans-le-dojo/regles",
    ja: "/dojo/rules",
  },
  "/in-dojo/vocabulary": {
    "pt-PT": "/no-dojo/vocabulario",
    en: "/in-dojo/vocabulary",
    es: "/en-el-dojo/vocabulario",
    fr: "/dans-le-dojo/vocabulaire",
    ja: "/dojo/vocabulary",
  },
  "/in-dojo/grades": {
    "pt-PT": "/no-dojo/graduacoes",
    en: "/in-dojo/grades",
    es: "/en-el-dojo/grados",
    fr: "/dans-le-dojo/grades",
    ja: "/dojo/grades",
  },
};

export const routing = defineRouting({
  locales: ["pt-PT", "en", "es", "fr", "ja"],
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
      es: "/preguntas-frecuentes",
      fr: "/questions-frequentes",
      ja: "/faq",
    },
    "/privacy-policy": {
      "pt-PT": "/politica-de-privacidade",
      en: "/privacy-policy",
      es: "/politica-de-privacidad",
      fr: "/politique-de-confidentialite",
      ja: "/privacy-policy",
    },
  },
});
