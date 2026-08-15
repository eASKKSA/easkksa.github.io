import type { Metadata } from "next";
import type { Locale } from "next-intl";
import { getTranslations } from "next-intl/server";
import type { Article, WithContext } from "schema-dts";
import topImage from "@/assets/style-ski/top.jpg";
import { getPathname } from "@/i18n/navigation";
import { getLocalizedAlternates } from "@/lib/seo";

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
    about: t("meta.title"),
    articleSection: t("title"),
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
      logo: `${process.env.NEXT_PUBLIC_SITE_URL}/icons/icon-512x512.png`,
    },
    publisher: {
      "@type": "Organization",
      name: t("name"),
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

  return {
    title: t("meta.title"),
    description: t("meta.description"),
    alternates: getLocalizedAlternates("/style-ski", locale),
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
      section: t("title"),
      tags: t("meta.keywords").split(", "),
    },
    twitter: {
      card: "summary_large_image",
      title: t("meta.title"),
      description: t("meta.description"),
      images: [topImage.src],
    },
  };
}
