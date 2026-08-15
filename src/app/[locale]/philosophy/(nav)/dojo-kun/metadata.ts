import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { Article, WithContext } from "schema-dts";

import dojoKunImage from "@/assets/philosofy/dojo-kun.jpg";
import { getPathname } from "@/i18n/navigation";
import { getLocalizedAlternates, getSeoLabels } from "@/lib/seo";

export const jsonLd = async (locale: Locale): Promise<WithContext<Article>> => {
  const t = await getTranslations("DojoKun");
  const orgT = await getTranslations("Organization");
  const pathname = getPathname({
    href: "/philosophy/dojo-kun",
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
      url: dojoKunImage.src,
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
          name: "Dojo Kun",
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
  const t = await getTranslations("DojoKun");
  const pathname = getPathname({
    href: "/philosophy/dojo-kun",
    locale: locale,
  });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
    alternates: getLocalizedAlternates("/philosophy/dojo-kun", locale),
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
      section: t("title"),
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
