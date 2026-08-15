import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { WebPage, WithContext } from "schema-dts";

import principlesImage from "@/assets/philosofy/principios.gif";
import { getPathname } from "@/i18n/navigation";
import { getLocalizedAlternates, getSeoLabels } from "@/lib/seo";

export const jsonLd = async (
  t: TFunction,
  locale: Locale,
): Promise<WithContext<WebPage>> => {
  const pathname = getPathname({ href: "/philosophy", locale: locale });
  const labels = getSeoLabels(locale);

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: t("meta.title"),
    description: t("meta.description"),
    about: t("meta.title"),
    url: process.env.NEXT_PUBLIC_SITE_URL + pathname,
    image: {
      "@type": "ImageObject",
      url: principlesImage.src,
      caption: t("title"),
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
          name: labels.home,
          item: process.env.NEXT_PUBLIC_SITE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: labels.philosophy,
          item: process.env.NEXT_PUBLIC_SITE_URL + pathname,
        },
      ],
    },
  };
};

export async function metadata(locale: Locale): Promise<Metadata> {
  const t = await getTranslations("Philosophy");
  const pathname = getPathname({ href: "/philosophy", locale: locale });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
    alternates: getLocalizedAlternates("/philosophy", locale),
    openGraph: {
      title: t("meta.title"),
      siteName: "ASKKSA: Associação Shotokan Kokusai Karate Santo António",
      locale: locale,
      description: t("meta.description"),
      url: process.env.NEXT_PUBLIC_SITE_URL + pathname,
      type: "website",
      images: [
        {
          url: principlesImage.src,
          width: 800,
          height: 600,
          alt: t("title"),
        },
        {
          url: "/icons/icon-512x512.png",
          width: 512,
          height: 512,
          alt: t("meta.title"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("meta.title"),
      description: t("meta.description"),
      images: [principlesImage.src],
    },
  };
}
