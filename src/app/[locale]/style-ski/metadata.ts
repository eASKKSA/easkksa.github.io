import { getTranslations } from "next-intl/server";
import { Article, WithContext } from "schema-dts";
import { Metadata } from "next";

import topImage from "@/assets/style-ski/top.jpg";
import { getPathname } from "@/i18n/navigation";
import { Locale } from "next-intl";

export const jsonLd = async (
  t: TFunction,
  locale: Locale,
): Promise<WithContext<Article>> => {
  const pathname = getPathname({ href: "/style-ski", locale: locale });

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: t("meta.title"),
    description: t("meta.description"),
    about: "26 Katas do Karaté Shotokan",
    articleSection: "Técnica",
    keywords: t("meta.keywords"),
    url: process.env.NEXT_PUBLIC_SITE_URL + pathname,
    image: {
      "@type": "ImageObject",
      url: topImage.src,
      caption: "Shotokan Karate-Do International Federation",
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

export async function metadata(locale: Locale): Promise<Metadata> {
  const t = await getTranslations("ShotokanKatas");
  const pathname = getPathname({ href: "/style-ski", locale: locale });
  const otherLocale = locale === "pt-PT" ? "en" : "pt-PT";
  const otherPathname = getPathname({
    href: "/style-ski",
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
        "x-default": getPathname({ href: "/style-ski", locale: "en" }),
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
          url: topImage.src,
          width: 600,
          height: 200,
          alt: "Shotokan Karate-Do International Federation",
        },
      ],
      section: "Técnica",
      tags: t("meta.keywords").split(", "),
      publishedTime: "2024-01-01T00:00:00+00:00",
      modifiedTime: new Date().toISOString(),
    },
    twitter: {
      card: "summary_large_image",
      title: t("meta.title"),
      description: t("meta.description"),
      images: [topImage.src],
    },
  };
}
