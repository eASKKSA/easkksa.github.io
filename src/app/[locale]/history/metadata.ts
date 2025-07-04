import { getTranslations, getLocale } from "next-intl/server";
import { Article, WithContext } from "schema-dts";
import { Metadata } from "next";
import { headers } from "next/headers";

import historyBannerUrl from "@/assets/masters-of-karate.jpg";

export const jsonLd = async (): Promise<WithContext<Article>> => {
  const t = await getTranslations("History");
  const orgT = await getTranslations("Organization");
  const appHeaders = await headers();
  const fullPathname = appHeaders.get("x-next-pathname") ?? "/history";

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: t("meta.title"),
    description: t("meta.description"),
    about: "História do Karaté Shotokan",
    articleSection: "História",
    keywords: t("meta.keywords"),
    url: process.env.NEXT_PUBLIC_SITE_URL + fullPathname,
    image: {
      "@type": "ImageObject",
      url: historyBannerUrl.src,
      caption: "Mestres Fundadores do Karaté",
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
        description: "Fundador do Karaté Shotokan moderno",
      },
      {
        "@type": "Person",
        name: "Sokon Matsumura",
        description: "Mestre histórico do Karaté de Okinawa",
      },
    ],
  };
};

export async function metadata(): Promise<Metadata> {
  const t = await getTranslations("History");
  const appHeaders = await headers();
  const fullPathname = appHeaders.get("x-next-pathname") ?? "/history";
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
          url: historyBannerUrl.src,
          width: 1200,
          height: 600,
          alt: "Mestres Fundadores do Karaté",
        },
        {
          url: "/icons/favicon-512x512.png",
          width: 512,
          height: 512,
          alt: t("meta.title"),
        },
      ],
      type: "article",
      section: "História",
      tags: t("meta.keywords").split(", "),
    },
    twitter: {
      card: "summary_large_image",
      title: t("meta.title"),
      description: t("meta.description"),
      images: [historyBannerUrl.src],
      site: "@askksa_madeira",
    },
  };
}
