import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { Article, WithContext } from "schema-dts";

import senseiSeizaImage from "@/assets/in-dojo/Sensei_Seiza.jpeg";
import { getPathname } from "@/i18n/navigation";
import { getLocalizedAlternates } from "@/lib/seo";

export const jsonLd = async (locale: Locale): Promise<WithContext<Article>> => {
  const t = await getTranslations("Salutation");
  const orgT = await getTranslations("Organization");
  const pathname = getPathname({ href: "/in-dojo/salutation", locale: locale });

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
      url: senseiSeizaImage.src,
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
        name: "OSS",
        description:
          "Saudação universal do Karaté que significa perseverança sob pressão",
      },
      {
        "@type": "Thing",
        name: "SEIZA",
        description: "Posição formal de sentar no Karaté",
      },
      {
        "@type": "Thing",
        name: "MOKUSO",
        description: "Período de meditação no início e fim do treino",
      },
      {
        "@type": "Thing",
        name: "REI",
        description: "Saudação formal no Karaté",
      },
    ],
  };
};

export async function generateMetadata({
  params,
}: Readonly<{ params: Promise<{ locale: Locale }> }>): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations("Salutation");
  const pathname = getPathname({ href: "/in-dojo/salutation", locale: locale });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
    alternates: getLocalizedAlternates("/in-dojo/salutation", locale),
    openGraph: {
      title: t("meta.title"),
      siteName: "ASKKSA: Associação Shotokan Kokusai Karate Santo António",
      locale: locale,
      description: t("meta.description"),
      url: pathname,
      images: [
        {
          url: senseiSeizaImage.src,
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
      images: [senseiSeizaImage.src],
      site: "@askksa_madeira",
    },
  };
}
