import { getTranslations } from "next-intl/server";
import { Article, WithContext } from "schema-dts";
import { Metadata } from "next";

import historyBannerUrl from "@/assets/masters-of-karate.jpg";
import { getPathname } from "@/i18n/navigation";
import { Locale } from "next-intl";

export const jsonLd = async (
  t: TFunction,
  locale: Locale,
): Promise<WithContext<Article>> => {
  const pathname = getPathname({ href: "/history", locale: locale });

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: t("meta.title"),
    description: t("meta.description"),
    about: "História do Karaté Shotokan",
    articleSection: "História",
    keywords: t("meta.keywords"),
    url: process.env.NEXT_PUBLIC_SITE_URL + pathname,
    image: {
      "@type": "ImageObject",
      url: historyBannerUrl.src,
      caption: "Mestres Fundadores do Karaté",
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
    dateModified: new Date().toISOString(),
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
        description: "Fundador do Karaté Shotokan moderno",
      },
      {
        "@type": "Person",
        name: "Sokon Matsumura",
        description: "Mestre histórico do Karaté de Okinawa",
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
          name: locale === "pt-PT" ? "História" : "History",
          item: process.env.NEXT_PUBLIC_SITE_URL + pathname,
        },
      ],
    },
  } as any;
};

export async function metadata(locale: Locale): Promise<Metadata> {
  const t = await getTranslations("History");
  const pathname = getPathname({ href: "/history", locale: locale });
  const otherLocale = locale === "pt-PT" ? "en" : "pt-PT";
  const otherPathname = getPathname({ href: "/history", locale: otherLocale });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
    keywords: t("meta.keywords"),
    alternates: {
      canonical: pathname,
      languages: {
        [otherLocale]: otherPathname,
        "x-default": getPathname({ href: "/history", locale: "en" }),
      },
    },
    openGraph: {
      title: t("meta.title"),
      siteName: "ASKKSA: Associação Shotokan Kokusai Karate Santo António",
      locale: locale,
      description: t("meta.description"),
      url: process.env.NEXT_PUBLIC_SITE_URL + pathname,
      type: "article",
      images: [
        {
          url: historyBannerUrl.src,
          width: 1200,
          height: 600,
          alt: "Mestres Fundadores do Karaté",
        },
        {
          url: "/icons/icon-512x512.png",
          width: 512,
          height: 512,
          alt: t("meta.title"),
        },
      ],
      publishedTime: "2024-01-01T00:00:00+00:00",
      modifiedTime: new Date().toISOString(),
      authors: ["ASKKSA"],
      section: "História",
      tags: t("meta.keywords").split(", "),
    },
    twitter: {
      card: "summary_large_image",
      title: t("meta.title"),
      description: t("meta.description"),
      images: [historyBannerUrl.src],
    },
  };
}
