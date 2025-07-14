import { getTranslations, getLocale } from "next-intl/server";
import { WebPage, WithContext } from "schema-dts";
import { Metadata } from "next";
import { getPathname } from "@/i18n/navigation";

import askksaThumb from "@/assets/askksa_thumb.svg";

export const jsonLd = async (): Promise<WithContext<WebPage>> => {
  const t = await getTranslations("InDojo");
  const orgT = await getTranslations("Organization");
  const locale = await getLocale();
  const pathname = getPathname({ href: "/in-dojo", locale: locale });

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: t("meta.title"),
    description: t("meta.description"),
    about: "Vida no Dojo de Karaté Shotokan",
    keywords: t("meta.keywords"),
    url: process.env.NEXT_PUBLIC_SITE_URL + pathname,
    image: {
      "@type": "ImageObject",
      url: askksaThumb.src,
      caption: "Sensei no Dojo - Vida no Karaté",
    },
    author: {
      "@type": "Organization",
      name: orgT("name"),
      url: process.env.NEXT_PUBLIC_SITE_URL,
      logo: process.env.NEXT_PUBLIC_SITE_URL + "/icons/icon-512x512.png",
    },
    publisher: {
      "@type": "Organization",
      name: orgT("name"),
      url: process.env.NEXT_PUBLIC_SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: process.env.NEXT_PUBLIC_SITE_URL + "/icons/icon-512x512.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": process.env.NEXT_PUBLIC_SITE_URL + pathname,
    },
    datePublished: "2024-01-01T00:00:00+00:00",
    dateModified: "2025-07-10T10:00:00+00:00",
    inLanguage: locale,
    isPartOf: {
      "@type": "WebSite",
      name: orgT("name"),
      url: process.env.NEXT_PUBLIC_SITE_URL,
    },
    mentions: [
      {
        "@type": "Thing",
        name: "Dojo",
        description: "Local de treino de artes marciais",
      },
      {
        "@type": "Thing",
        name: "Saudação",
        description: "Ritual de respeito no Karaté",
      },
      {
        "@type": "Thing",
        name: "Etiqueta",
        description: "Regras de conduta no dojo",
      },
      {
        "@type": "Thing",
        name: "Graduações",
        description: "Sistema de níveis no Karaté",
      },
    ],
  };
};

export async function metadata(): Promise<Metadata> {
  const t = await getTranslations("InDojo");
  const locale = await getLocale();
  const pathname = getPathname({ href: "/in-dojo", locale: locale });
  const otherLocale = locale === "pt-PT" ? "en" : "pt-PT";
  const otherPathname = getPathname({ href: "/in-dojo", locale: otherLocale });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
    keywords: t("meta.keywords"),
    alternates: {
      canonical: pathname,
      languages: {
        [otherLocale]: otherPathname,
        "x-default": getPathname({ href: "/in-dojo", locale: "en" }),
      },
    },
    openGraph: {
      title: t("meta.title"),
      siteName: "ASKKSA: Associação Shotokan Kokusai Karate Santo António",
      locale: locale,
      description: t("meta.description"),
      url: pathname,
      images: [
        {
          url: askksaThumb.src,
          width: 800,
          height: 600,
          alt: "Sensei no Dojo - Vida no Karaté",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("meta.title"),
      description: t("meta.description"),
      images: [askksaThumb.src],
      site: "@askksa_madeira",
    },
  };
}
