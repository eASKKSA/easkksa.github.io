import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { Article, WithContext } from "schema-dts";

import nijuKunImage from "@/assets/philosofy/principios.gif";
import { getPathname } from "@/i18n/navigation";
import {
  getAbsoluteUrl,
  getLocalizedAlternates,
  getOpenGraphAlternateLocales,
  getOpenGraphLocale,
  getSeoLabels,
} from "@/lib/seo";

export const jsonLd = async (locale: Locale): Promise<WithContext<Article>> => {
  const t = await getTranslations("NijuKun");
  const orgT = await getTranslations("Organization");
  const pathname = getPathname({
    href: "/philosophy/niju-kun",
    locale: locale,
  });
  const labels = getSeoLabels(locale);

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: t("meta.title"),
    description: t("meta.description"),
    about: t("meta.title"),
    articleSection: t("title"),
    url: process.env.NEXT_PUBLIC_SITE_URL + pathname,
    image: {
      "@type": "ImageObject",
      url: getAbsoluteUrl(nijuKunImage.src),
      caption: t("title"),
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
    inLanguage: locale,
    isPartOf: {
      "@type": "WebSite",
      name: orgT("name"),
      url: process.env.NEXT_PUBLIC_SITE_URL,
    },
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
          item:
            process.env.NEXT_PUBLIC_SITE_URL +
            getPathname({ href: "/philosophy", locale }),
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Niju Kun",
          item: process.env.NEXT_PUBLIC_SITE_URL + pathname,
        },
      ],
    },
  } as WithContext<Article>;
};

export async function generateMetadata({
  params,
}: Readonly<{ params: Promise<{ locale: Locale }> }>): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations("NijuKun");
  const pathname = getPathname({
    href: "/philosophy/niju-kun",
    locale: locale,
  });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
    alternates: getLocalizedAlternates("/philosophy/niju-kun", locale),
    openGraph: {
      title: t("meta.title"),
      siteName: "ASKKSA: Associação Shotokan Kokusai Karate Santo António",
      locale: getOpenGraphLocale(locale),
      alternateLocale: getOpenGraphAlternateLocales(locale),
      description: t("meta.description"),
      url: pathname,
      images: [
        {
          url: nijuKunImage.src,
          width: nijuKunImage.width,
          height: nijuKunImage.height,
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
      section: t("title"),
      tags: t("meta.keywords").split(", "),
    },
    twitter: {
      card: "summary_large_image",
      title: t("meta.title"),
      description: t("meta.description"),
      images: [nijuKunImage.src],
    },
  };
}
