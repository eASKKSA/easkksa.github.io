import { getTranslations, getLocale } from "next-intl/server";
import { Article, WithContext } from "schema-dts";
import { Metadata } from "next";
import { headers } from "next/headers";

import senseiSeizaImage from "@/assets/in-dojo/Sensei_by_VCRC.jpg";

export const jsonLd = async (): Promise<WithContext<Article>> => {
  const t = await getTranslations("Salutation");
  const orgT = await getTranslations("Organization");
  const appHeaders = await headers();
  const fullPathname =
    appHeaders.get("x-next-pathname") ?? "/in-dojo/salutation";

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: t("meta.title"),
    description: t("meta.description"),
    about: "Saudação e Rituais no Karaté Shotokan",
    articleSection: "Dojo",
    keywords: t("meta.keywords"),
    url: process.env.NEXT_PUBLIC_SITE_URL + fullPathname,
    image: {
      "@type": "ImageObject",
      url: senseiSeizaImage.src,
      caption: "Sensei em posição Seiza - Saudação no Karaté",
    },
    author: {
      "@type": "Organization",
      name: orgT("name"),
      url: process.env.NEXT_PUBLIC_SITE_URL,
      logo: process.env.NEXT_PUBLIC_SITE_URL + "/icons/favicon-512x512.png",
    },
    publisher: {
      "@type": "Organization",
      name: orgT("name"),
      url: process.env.NEXT_PUBLIC_SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: process.env.NEXT_PUBLIC_SITE_URL + "/icons/favicon-512x512.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": process.env.NEXT_PUBLIC_SITE_URL + fullPathname,
    },
    datePublished: "2024-01-01T00:00:00+00:00",
    dateModified: new Date().toISOString(),
    inLanguage: await getLocale(),
    isPartOf: {
      "@type": "WebSite",
      name: orgT("name"),
      url: process.env.NEXT_PUBLIC_SITE_URL,
    },
    mentions: [
      {
        "@type": "Thing",
        name: "OSS",
        description:
          "Saudação universal do Karaté que significa perseverança sob pressão",
      },
      {
        "@type": "Thing",
        name: "SEIZA",
        description: "Posição formal de sentar no Karaté",
      },
      {
        "@type": "Thing",
        name: "MOKUSO",
        description: "Período de meditação no início e fim do treino",
      },
      {
        "@type": "Thing",
        name: "REI",
        description: "Saudação formal no Karaté",
      },
    ],
  };
};

export async function metadata(): Promise<Metadata> {
  const t = await getTranslations("Salutation");
  const appHeaders = await headers();
  const fullPathname =
    appHeaders.get("x-next-pathname") ?? "/in-dojo/salutation";
  const locale = await getLocale();

  return {
    title: t("meta.title"),
    description: t("meta.description"),
    keywords: t("meta.keywords"),
    openGraph: {
      title: t("meta.title"),
      siteName: "ASKKSA: Associação Shotokan Kokusai Karate Santo António",
      locale: locale,
      description: t("meta.description"),
      url: fullPathname,
      images: [
        {
          url: senseiSeizaImage.src,
          width: 800,
          height: 600,
          alt: t("meta.title"),
        },
        {
          url: "/icons/favicon-512x512.png",
          width: 512,
          height: 512,
          alt: t("meta.title"),
        },
      ],
      type: "article",
      section: "Dojo",
      tags: t("meta.keywords").split(", "),
    },
    twitter: {
      card: "summary_large_image",
      title: t("meta.title"),
      description: t("meta.description"),
      images: [senseiSeizaImage.src],
      site: "@askksa_madeira",
    },
  };
}
