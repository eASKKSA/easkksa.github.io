import { getTranslations, getLocale } from "next-intl/server";
import { Article, WithContext } from "schema-dts";
import { Metadata } from "next";

import dojoKunImage from "@/assets/philosofy/dojo-kun.jpg";
import { getPathname } from "@/i18n/navigation";

export const jsonLd = async (): Promise<WithContext<Article>> => {
  const t = await getTranslations("DojoKun");
  const orgT = await getTranslations("Organization");
  const locale = await getLocale();
  const pathname = getPathname({
    href: "/philosophy/dojo-kun",
    locale: locale,
  });

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: t("meta.title"),
    description: t("meta.description"),
    about: "Dojo Kun - 5 Máximas do Karaté Shotokan",
    articleSection: "Filosofia",
    keywords: t("meta.keywords"),
    url: process.env.NEXT_PUBLIC_SITE_URL + pathname,
    image: {
      "@type": "ImageObject",
      url: dojoKunImage.src,
      caption: "Dojo Kun - 5 Máximas de Gichin Funakoshi",
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
        "@type": "Person",
        name: "Gichin Funakoshi",
        description: "Criador das 5 máximas Dojo Kun",
      },
      {
        "@type": "Thing",
        name: "Dojo Kun",
        description: "As 5 máximas fundamentais do dojo de Karaté",
      },
    ],
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
          name: locale === "pt-PT" ? "Filosofia" : "Philosophy",
          item: process.env.NEXT_PUBLIC_SITE_URL + getPathname({ href: "/philosophy", locale }),
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Dojo Kun",
          item: process.env.NEXT_PUBLIC_SITE_URL + pathname,
        },
      ],
    },
  } as any;
};

export async function metadata(): Promise<Metadata> {
  const t = await getTranslations("DojoKun");
  const locale = await getLocale();
  const pathname = getPathname({
    href: "/philosophy/dojo-kun",
    locale: locale,
  });
  const otherLocale = locale === "pt-PT" ? "en" : "pt-PT";
  const otherPathname = getPathname({
    href: "/philosophy/dojo-kun",
    locale: otherLocale,
  });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
    keywords: t("meta.keywords"),
    alternates: {
      canonical: pathname,
      languages: {
        [otherLocale]: otherPathname,
        "x-default": getPathname({
          href: "/philosophy/dojo-kun",
          locale: "en",
        }),
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
          url: dojoKunImage.src,
          width: 800,
          height: 600,
          alt: t("meta.title"),
        },
        {
          url: "/icons/icon-512x512.png",
          width: 512,
          height: 512,
          alt: t("meta.title"),
        },
      ],
      type: "article",
      section: "Filosofia",
      tags: t("meta.keywords").split(", "),
    },
    twitter: {
      card: "summary_large_image",
      title: t("meta.title"),
      description: t("meta.description"),
      images: [dojoKunImage.src],
      site: "@askksa_madeira",
    },
  };
}
