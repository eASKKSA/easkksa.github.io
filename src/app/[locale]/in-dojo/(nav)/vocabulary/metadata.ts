import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { Article, WithContext } from "schema-dts";
import { getPathname } from "@/i18n/navigation";
import { getLocalizedAlternates, getSeoLabels } from "@/lib/seo";

export const jsonLd = async (locale: Locale): Promise<WithContext<Article>> => {
  const t = await getTranslations("Vocabulary");
  const orgT = await getTranslations("Organization");
  const pathname = getPathname({ href: "/in-dojo/vocabulary", locale: locale });
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
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/icons/icon-512x512.png`,
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
          name: labels.home,
          item: process.env.NEXT_PUBLIC_SITE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: labels.inDojo,
          item:
            process.env.NEXT_PUBLIC_SITE_URL +
            getPathname({ href: "/in-dojo", locale }),
        },
        {
          "@type": "ListItem",
          position: 3,
          name: labels.vocabulary,
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
  const t = await getTranslations("Vocabulary");
  const pathname = getPathname({ href: "/in-dojo/vocabulary", locale: locale });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
    alternates: getLocalizedAlternates("/in-dojo/vocabulary", locale),
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
      section: t("title"),
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
