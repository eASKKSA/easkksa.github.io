import { getTranslations, getLocale } from "next-intl/server";
import { Article, WithContext } from "schema-dts";
import { Metadata } from "next";
import { headers } from "next/headers";

export const jsonLd = async (): Promise<WithContext<Article>> => {
  const t = await getTranslations("Vocabulary");
  const orgT = await getTranslations("Organization");
  const appHeaders = await headers();
  const fullPathname =
    appHeaders.get("x-next-pathname") ?? "/in-dojo/vocabulary";

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: t("meta.title"),
    description: t("meta.description"),
    about: "Vocabulário Japonês do Karaté Shotokan",
    articleSection: "Dojo",
    keywords: t("meta.keywords"),
    url: process.env.NEXT_PUBLIC_SITE_URL + fullPathname,
    image: {
      "@type": "ImageObject",
      url: process.env.NEXT_PUBLIC_SITE_URL + "/askksa_logo.svg",
      caption: "ASKKSA - Vocabulário Japonês do Karaté",
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
  };
};

export async function metadata(): Promise<Metadata> {
  const t = await getTranslations("Vocabulary");
  const appHeaders = await headers();
  const fullPathname =
    appHeaders.get("x-next-pathname") ?? "/in-dojo/vocabulary";
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
          url: "/askksa_logo.svg",
          width: 400,
          height: 400,
          alt: "ASKKSA - Vocabulário Japonês do Karaté",
        },
        {
          url: "/icons/favicon-512x512.png",
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
      images: ["/askksa_logo.svg"],
      site: "@askksa_madeira",
    },
  };
}
