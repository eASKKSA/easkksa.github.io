import { getTranslations } from "next-intl/server";
import { WebPage, WithContext } from "schema-dts";
import { Metadata } from "next";

import principlesImage from "@/assets/philosofy/principios.gif";
import { getPathname } from "@/i18n/navigation";

export const jsonLd = async (
  t: TFunction,
  locale: Locale,
): Promise<WithContext<WebPage>> => {
  const pathname = getPathname({ href: "/philosophy", locale: locale });

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: t("meta.title"),
    description: t("meta.description"),
    about: "Filosofia do Karaté Shotokan",
    keywords: t("meta.keywords"),
    url: process.env.NEXT_PUBLIC_SITE_URL + pathname,
    image: {
      "@type": "ImageObject",
      url: principlesImage.src,
      caption: "Filosofia do Karaté - Bushido, Niju Kun e Dojo Kun",
    },
    author: {
      "@type": "Organization",
      name: t("name"),
      url: process.env.NEXT_PUBLIC_SITE_URL,
      logo: process.env.NEXT_PUBLIC_SITE_URL + "/icons/icon-512x512.png",
    },
    publisher: {
      "@type": "Organization",
      name: t("name"),
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
      name: t("name"),
      url: process.env.NEXT_PUBLIC_SITE_URL,
    },
    mentions: [
      {
        "@type": "Person",
        name: "Gichin Funakoshi",
        description: "Criador dos princípios Niju Kun e Dojo Kun",
      },
      {
        "@type": "Thing",
        name: "Bushido",
        description: "Código de ética dos Samurais adaptado ao Karaté",
      },
      {
        "@type": "Thing",
        name: "Niju Kun",
        description: "Os 20 princípios filosóficos do Karaté Shotokan",
      },
      {
        "@type": "Thing",
        name: "Dojo Kun",
        description: "As 5 máximas fundamentais do dojo",
      },
    ],
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Início",
          item: process.env.NEXT_PUBLIC_SITE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Filosofia",
          item: process.env.NEXT_PUBLIC_SITE_URL + pathname,
        },
      ],
    },
  };
};

export async function metadata(locale: Locale): Promise<Metadata> {
  const t = await getTranslations("Philosophy");
  const pathname = getPathname({ href: "/philosophy", locale: locale });
  const otherLocale = locale === "pt-PT" ? "en" : "pt-PT";
  const otherPathname = getPathname({
    href: "/philosophy",
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
        "x-default": getPathname({ href: "/philosophy", locale: "en" }),
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
          url: principlesImage.src,
          width: 800,
          height: 600,
          alt: "Gichin Funakoshi - Fundador do Karaté Shotokan",
        },
        {
          url: "/icons/icon-512x512.png",
          width: 512,
          height: 512,
          alt: t("meta.title"),
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("meta.title"),
      description: t("meta.description"),
      images: [principlesImage.src],
      site: "@askksa_madeira",
    },
  };
}
