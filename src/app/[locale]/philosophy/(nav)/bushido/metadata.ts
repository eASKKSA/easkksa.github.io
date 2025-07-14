import { getTranslations, getLocale } from "next-intl/server";
import { Article, WithContext } from "schema-dts";
import { Metadata } from "next";

import ethicalCodeImage from "@/assets/philosofy/codigo-etica-karate.jpg";
import { getPathname } from "@/i18n/navigation";

export const jsonLd = async (): Promise<WithContext<Article>> => {
  const t = await getTranslations("Bushido");
  const orgT = await getTranslations("Organization");
  const locale = await getLocale();
  const pathname = getPathname({
    href: "/philosophy/bushido",
    locale: locale,
  });

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: t("meta.title"),
    description: t("meta.description"),
    about: "Código de Ética Bushido no Karaté Shotokan",
    articleSection: "Filosofia",
    keywords: t("meta.keywords"),
    url: process.env.NEXT_PUBLIC_SITE_URL + pathname,
    image: {
      "@type": "ImageObject",
      url: ethicalCodeImage.src,
      caption: "Código de Ética Bushido",
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
        "@type": "Thing",
        name: "Honra",
        description: "Primeiro princípio do Bushido",
      },
      {
        "@type": "Thing",
        name: "Lealdade",
        description: "Segundo princípio do Bushido",
      },
      {
        "@type": "Thing",
        name: "Sinceridade",
        description: "Terceiro princípio do Bushido",
      },
      {
        "@type": "Thing",
        name: "Coragem",
        description: "Quarto princípio do Bushido",
      },
      {
        "@type": "Thing",
        name: "Bondade",
        description: "Quinto princípio do Bushido",
      },
      {
        "@type": "Thing",
        name: "Modéstia",
        description: "Sexto princípio do Bushido",
      },
      {
        "@type": "Thing",
        name: "Justiça",
        description: "Sétimo princípio do Bushido",
      },
      {
        "@type": "Thing",
        name: "Respeito",
        description: "Oitavo princípio do Bushido",
      },
      {
        "@type": "Thing",
        name: "Autocontrolo",
        description: "Nono princípio do Bushido",
      },
    ],
  };
};

export async function metadata(): Promise<Metadata> {
  const t = await getTranslations("Bushido");
  const locale = await getLocale();
  const pathname = getPathname({
    href: "/philosophy/bushido",
    locale: locale,
  });
  const otherLocale = locale === "pt-PT" ? "en" : "pt-PT";
  const otherPathname = getPathname({
    href: "/philosophy/bushido",
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
        "x-default": getPathname({
          href: "/philosophy/bushido",
          locale: "en",
        }),
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
          url: ethicalCodeImage.src,
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
      section: "Filosofia",
      tags: t("meta.keywords").split(", "),
    },
    twitter: {
      card: "summary_large_image",
      title: t("meta.title"),
      description: t("meta.description"),
      images: [ethicalCodeImage.src],
      site: "@askksa_madeira",
    },
  };
}
