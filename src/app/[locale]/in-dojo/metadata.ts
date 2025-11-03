import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { WebPage, WithContext } from "schema-dts";
import askksaThumb from "@/assets/askksa_thumb.svg";
import { getPathname } from "@/i18n/navigation";

export const jsonLd = async (
  t: TFunction,
  locale: Locale,
): Promise<WithContext<WebPage>> => {
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
      name: t("name"),
      url: process.env.NEXT_PUBLIC_SITE_URL,
      logo: `${process.env.NEXT_PUBLIC_SITE_URL}/icons/icon-512x512.png`,
    },
    publisher: {
      "@type": "Organization",
      name: t("name"),
      url: process.env.NEXT_PUBLIC_SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/icons/icon-512x512.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": process.env.NEXT_PUBLIC_SITE_URL + pathname,
    },
    datePublished: "2024-01-01T00:00:00+00:00",
    dateModified: new Date().toISOString(),
    inLanguage: locale,
    isPartOf: {
      "@type": "WebSite",
      name: t("name"),
      url: process.env.NEXT_PUBLIC_SITE_URL,
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: locale === "pt-PT" ? "Início" : "Home",
          item: process.env.NEXT_PUBLIC_SITE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: locale === "pt-PT" ? "No Dojo" : "In Dojo",
          item: process.env.NEXT_PUBLIC_SITE_URL + pathname,
        },
      ],
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

export async function metadata(locale: Locale): Promise<Metadata> {
  const t = await getTranslations("InDojo");
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
      url: process.env.NEXT_PUBLIC_SITE_URL + pathname,
      type: "website",
      images: [
        {
          url: askksaThumb.src,
          width: 800,
          height: 600,
          alt: "Sensei no Dojo - Vida no Karaté",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("meta.title"),
      description: t("meta.description"),
      images: [askksaThumb.src],
    },
  };
}
