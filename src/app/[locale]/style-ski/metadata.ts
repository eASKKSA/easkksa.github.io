import { getTranslations, getLocale } from "next-intl/server";
import { Article, WithContext } from "schema-dts";
import { Metadata } from "next";
import { headers } from "next/headers";

import topImage from "@/assets/style-ski/top.jpg";

export const jsonLd = async (): Promise<WithContext<Article>> => {
  const t = await getTranslations("ShotokanKatas");
  const orgT = await getTranslations("Organization");
  const appHeaders = await headers();
  const fullPathname = appHeaders.get("x-next-pathname") ?? "/shotokan-katas";

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: t("meta.title"),
    description: t("meta.description"),
    about: "26 Katas do Karaté Shotokan",
    articleSection: "Técnica",
    keywords: t("meta.keywords"),
    url: process.env.NEXT_PUBLIC_SITE_URL + fullPathname,
    image: {
      "@type": "ImageObject",
      url: topImage.src,
      caption: "Shotokan Karate-Do International Federation",
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
        "@type": "Person",
        name: "Gichin Funakoshi",
        description: "Fundador do estilo Shotokan e criador dos katas",
      },
      {
        "@type": "Thing",
        name: "Shotokan",
        description: "Estilo de Karaté com 26 katas tradicionais",
      },
      {
        "@type": "Thing",
        name: "Kata",
        description: "Forma de combate imaginário do Karaté",
      },
    ],
  };
};

export async function metadata(): Promise<Metadata> {
  const t = await getTranslations("ShotokanKatas");
  const appHeaders = await headers();
  const fullPathname = appHeaders.get("x-next-pathname") ?? "/shotokan-katas";
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
          url: topImage.src,
          width: 600,
          height: 200,
          alt: "Shotokan Karate-Do International Federation",
        },
      ],
      type: "article",
      section: "Técnica",
      tags: t("meta.keywords").split(", "),
    },
    twitter: {
      card: "summary_large_image",
      title: t("meta.title"),
      description: t("meta.description"),
      images: [topImage.src],
      site: "@askksa_madeira",
    },
  };
}
