import { getTranslations, getLocale } from "next-intl/server";
import { Article, WithContext } from "schema-dts";
import { Metadata } from "next";
import { headers } from "next/headers";

export const jsonLd = async (): Promise<WithContext<Article>> => {
  const t = await getTranslations("NijuKun");
  const orgT = await getTranslations("Organization");
  const appHeaders = await headers();
  const fullPathname =
    appHeaders.get("x-next-pathname") ?? "/philosophy/niju-kun";

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: t("meta.title"),
    description: t("meta.description"),
    about: "Niju Kun - 20 Princípios do Karaté Shotokan",
    articleSection: "Filosofia",
    keywords: t("meta.keywords"),
    url: process.env.NEXT_PUBLIC_SITE_URL + fullPathname,
    image: {
      "@type": "ImageObject",
      url:
        process.env.NEXT_PUBLIC_SITE_URL + "/assets/philosofy/principios.gif",
      caption: "Niju Kun - 20 Princípios de Gichin Funakoshi",
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
        description: "Criador dos 20 princípios Niju Kun",
      },
      {
        "@type": "Thing",
        name: "Niju Kun",
        description: "Os 20 princípios fundamentais do Karaté Shotokan",
      },
    ],
  };
};

export async function metadata(): Promise<Metadata> {
  const t = await getTranslations("NijuKun");
  const appHeaders = await headers();
  const fullPathname =
    appHeaders.get("x-next-pathname") ?? "/philosophy/niju-kun";
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
          url: "/assets/philosofy/principios.gif",
          width: 600,
          height: 400,
          alt: "Niju Kun - 20 Princípios de Gichin Funakoshi",
        },
        {
          url: "/icons/favicon-512x512.png",
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
      images: ["/assets/philosofy/principios.gif"],
      site: "@askksa_madeira",
    },
  };
}
