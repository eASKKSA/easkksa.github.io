import type { Locale } from "next-intl";
import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const OPEN_GRAPH_LOCALES: Record<Locale, string> = {
  "pt-PT": "pt_PT",
  en: "en_GB",
  es: "es_ES",
  fr: "fr_FR",
  ja: "ja_JP",
};

export type SeoHref = Extract<
  Parameters<typeof getPathname>[0]["href"],
  string
>;

export function getLocalizedAlternates(href: SeoHref, locale: Locale) {
  const canonical = getPathname({ href, locale });

  return {
    canonical,
    languages: {
      ...Object.fromEntries(
        routing.locales.map((language) => [
          language,
          getPathname({ href, locale: language }),
        ]),
      ),
      "x-default": getPathname({ href, locale: routing.defaultLocale }),
    },
  };
}

export function getSiteUrl() {
  const value = process.env.NEXT_PUBLIC_SITE_URL;
  if (!value) {
    throw new Error("NEXT_PUBLIC_SITE_URL is not defined");
  }

  return value.replace(/\/$/, "");
}

export function isProductionDeployment() {
  return process.env.VERCEL_ENV
    ? process.env.VERCEL_ENV === "production"
    : process.env.NODE_ENV === "production";
}

export function getAbsoluteUrl(pathname: string) {
  return new URL(pathname, `${getSiteUrl()}/`).toString();
}

export function getOpenGraphLocale(locale: Locale) {
  return OPEN_GRAPH_LOCALES[locale];
}

export function getOpenGraphAlternateLocales(locale: Locale) {
  return routing.locales
    .filter((candidate) => candidate !== locale)
    .map((candidate) => OPEN_GRAPH_LOCALES[candidate]);
}

export function localizedText<T>(locale: Locale, values: Record<Locale, T>): T {
  return values[locale];
}

export function getSeoLabels(locale: Locale) {
  return localizedText(locale, {
    "pt-PT": {
      about: "Sobre",
      faq: "Perguntas Frequentes",
      grades: "Graduações",
      history: "História",
      home: "Início",
      inDojo: "No Dojo",
      news: "Notícias",
      newsAndEvents: "Notícias e Eventos ASKKSA",
      philosophy: "Filosofia",
      rules: "Regras",
      vocabulary: "Vocabulário",
      qualifiedInstructor: "Instrutor qualificado de Karaté Shotokan",
      qualifiedInstructorFemale: "Instrutora qualificada de Karaté Shotokan",
    },
    en: {
      about: "About",
      faq: "FAQ",
      grades: "Grades",
      history: "History",
      home: "Home",
      inDojo: "In the Dojo",
      news: "News",
      newsAndEvents: "ASKKSA News and Events",
      philosophy: "Philosophy",
      rules: "Rules",
      vocabulary: "Vocabulary",
      qualifiedInstructor: "Qualified Shotokan Karate Instructor",
      qualifiedInstructorFemale: "Qualified Shotokan Karate Instructor",
    },
    es: {
      about: "Sobre la ASKKSA",
      faq: "Preguntas frecuentes",
      grades: "Grados",
      history: "Historia",
      home: "Inicio",
      inDojo: "En el dojo",
      news: "Noticias",
      newsAndEvents: "Noticias y eventos de la ASKKSA",
      philosophy: "Filosofía",
      rules: "Normas",
      vocabulary: "Vocabulario",
      qualifiedInstructor: "Instructor cualificado de kárate Shotokan",
      qualifiedInstructorFemale: "Instructora cualificada de kárate Shotokan",
    },
    fr: {
      about: "À propos",
      faq: "Questions fréquentes",
      grades: "Grades",
      history: "Histoire",
      home: "Accueil",
      inDojo: "Dans le dojo",
      news: "Actualités",
      newsAndEvents: "Actualités et événements de l’ASKKSA",
      philosophy: "Philosophie",
      rules: "Règles",
      vocabulary: "Vocabulaire",
      qualifiedInstructor: "Instructeur qualifié de Karaté Shotokan",
      qualifiedInstructorFemale: "Instructrice qualifiée de Karaté Shotokan",
    },
    ja: {
      about: "ASKKSAについて",
      faq: "よくある質問",
      grades: "級・段位",
      history: "空手の歴史",
      home: "ホーム",
      inDojo: "道場について",
      news: "ニュース",
      newsAndEvents: "ASKKSAのニュースと行事",
      philosophy: "空手の理念",
      rules: "道場の規則",
      vocabulary: "用語集",
      qualifiedInstructor: "ショットカン空手の有資格指導員",
      qualifiedInstructorFemale: "ショットカン空手の有資格指導員",
    },
  });
}
