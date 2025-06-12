import { defineRouting } from "next-intl/routing";

export const mainPagePathnames = {
  "/": {
    "pt-PT": "/",
    en: "/",
  },
  "/about": {
    "pt-PT": "/sobre",
    en: "/about",
  },
  "/news": {
    "pt-PT": "/noticias",
    en: "/news",
  },
  "/dojo": {
    "pt-PT": "/dojo",
    en: "/dojo",
  },
  "/history": {
    "pt-PT": "/historia",
    en: "/history",
  },
  "/philosophy": {
    "pt-PT": "/filosofia",
    en: "/philosophy",
  },
  "/shotokan-ski": {
    "pt-PT": "/shotokan-ski",
    en: "/shotokan-ski",
  },
};

export const routing = defineRouting({
  locales: ["pt-PT", "en"],
  defaultLocale: "pt-PT",
  localePrefix: "as-needed",
  pathnames: mainPagePathnames,
});
