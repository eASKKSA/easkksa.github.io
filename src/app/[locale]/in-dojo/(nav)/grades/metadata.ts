import { getTranslations, getLocale } from "next-intl/server";
import { Article, WithContext } from "schema-dts";
import { Metadata } from "next";

import graduationsImage from "@/assets/in-dojo/graduacoes.jpg";
import { getPathname } from "@/i18n/navigation";

export const jsonLd = async (): Promise<WithContext<Article>> => {
  const t = await getTranslations("Graduations");
  const orgT = await getTranslations("Organization");
  const locale = await getLocale();
  const pathname = getPathname({ href: "/in-dojo/grades", locale: locale });

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: t("meta.title"),
    description: t("meta.description"),
    about: "Sistema de Graduações do Karaté Shotokan - Kyu e Dan",
    articleSection: "Dojo",
    keywords: t("meta.keywords"),
    url: process.env.NEXT_PUBLIC_SITE_URL + pathname,
    image: {
      "@type": "ImageObject",
      url: graduationsImage.src,
      caption: t("meta.title"),
    },
    author: {
      "@type": "Organization",
      name: orgT("name"),
      url: process.env.NEXT_PUBLIC_SITE_URL,
      logo: process.env.NEXT_PUBLIC_SITE_URL + "/icons/icon-512x512.png",
    },
    publisher: {
      "@type": "Organization",
      name: orgT("name"),
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
      name: orgT("name"),
      url: process.env.NEXT_PUBLIC_SITE_URL,
    },
    mentions: [
      {
        "@type": "Person",
        name: "Jigoro Kano",
        description: "Fundador do sistema de graduações Kyu e Dan",
      },
      {
        "@type": "Thing",
        name: "Kyu",
        description: "Sistema de graduações para alunos de Karaté",
      },
      {
        "@type": "Thing",
        name: "Dan",
        description: "Sistema de graduações para cintos negros de Karaté",
      },
      {
        "@type": "Thing",
        name: "Judo Kodokan",
        description: "Escola onde foi criado o sistema de graduações",
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
          item: process.env.NEXT_PUBLIC_SITE_URL + getPathname({ href: "/in-dojo", locale }),
        },
        {
          "@type": "ListItem",
          position: 3,
          name: locale === "pt-PT" ? "Graduações" : "Grades",
          item: process.env.NEXT_PUBLIC_SITE_URL + pathname,
        },
      ],
    },
  } as any;
};

export async function metadata(): Promise<Metadata> {
  const t = await getTranslations("Graduations");
  const locale = await getLocale();
  const pathname = getPathname({ href: "/in-dojo/grades", locale: locale });
  const otherLocale = locale === "pt-PT" ? "en" : "pt-PT";
  const otherPathname = getPathname({
    href: "/in-dojo/grades",
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
        "x-default": getPathname({ href: "/in-dojo/grades", locale: "en" }),
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
          url: graduationsImage.src,
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
      section: "Dojo",
      tags: t("meta.keywords").split(", "),
    },
    twitter: {
      card: "summary_large_image",
      title: t("meta.title"),
      description: t("meta.description"),
      images: [graduationsImage.src],
      site: "@askksa_madeira",
    },
  };
}
