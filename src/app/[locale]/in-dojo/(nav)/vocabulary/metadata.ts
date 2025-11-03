import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import type { Article, WithContext } from "schema-dts";
import { getPathname } from "@/i18n/navigation";

export const jsonLd = async (): Promise<WithContext<Article>> => {
  const t = await getTranslations("Vocabulary");
  const orgT = await getTranslations("Organization");
  const locale = await getLocale();
  const pathname = getPathname({ href: "/in-dojo/vocabulary", locale: locale });

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: t("meta.title"),
    description: t("meta.description"),
    about: "Vocabulário Japonês do Karaté Shotokan",
    articleSection: "Dojo",
    keywords: t("meta.keywords"),
    url: process.env.NEXT_PUBLIC_SITE_URL + pathname,
    image: {
      "@type": "ImageObject",
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/icons/icon-512x512.png`,
      caption: "ASKKSA - Vocabulário Japonês do Karaté",
    },
    author: {
      "@type": "Organization",
      name: orgT("name"),
      url: process.env.NEXT_PUBLIC_SITE_URL,
      logo: `${process.env.NEXT_PUBLIC_SITE_URL}/icons/icon-512x512.png`,
    },
    publisher: {
      "@type": "Organization",
      name: orgT("name"),
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
        name: "Hiragana",
        description: "Sistema de escrita japonesa",
      },
      {
        "@type": "Thing",
        name: "Katakana",
        description: "Sistema de escrita japonesa",
      },
      {
        "@type": "Thing",
        name: "Kanji",
        description: "Sistema de escrita japonesa com caracteres chineses",
      },
      {
        "@type": "Thing",
        name: "Dojo",
        description: "Local de treino de artes marciais",
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
          name: locale === "pt-PT" ? "No Dojo" : "In Dojo",
          item:
            process.env.NEXT_PUBLIC_SITE_URL +
            getPathname({ href: "/in-dojo", locale }),
        },
        {
          "@type": "ListItem",
          position: 3,
          name: locale === "pt-PT" ? "Vocabulário" : "Vocabulary",
          item: process.env.NEXT_PUBLIC_SITE_URL + pathname,
        },
      ],
    },
  } as WithContext<Article>;
};

export async function metadata(): Promise<Metadata> {
  const t = await getTranslations("Vocabulary");
  const locale = await getLocale();
  const pathname = getPathname({ href: "/in-dojo/vocabulary", locale: locale });
  const otherLocale = locale === "pt-PT" ? "en" : "pt-PT";
  const otherPathname = getPathname({
    href: "/in-dojo/vocabulary",
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
        "x-default": getPathname({ href: "/in-dojo/vocabulary", locale: "en" }),
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
          url: "/icons/icon-512x512.png",
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
      images: ["/icons/icon-512x512.png"],
      site: "@askksa_madeira",
    },
  };
}
