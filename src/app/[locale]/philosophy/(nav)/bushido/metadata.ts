import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { Article, WithContext } from "schema-dts";

import ethicalCodeImage from "@/assets/philosofy/codigo-etica-karate.jpg";
import { getPathname } from "@/i18n/navigation";
import { getLocalizedAlternates, getSeoLabels } from "@/lib/seo";

export const jsonLd = async (locale: Locale): Promise<WithContext<Article>> => {
  const t = await getTranslations("Bushido");
  const orgT = await getTranslations("Organization");
  const pathname = getPathname({
    href: "/philosophy/bushido",
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
      url: ethicalCodeImage.src,
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
          name: "Bushido",
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
  const t = await getTranslations("Bushido");
  const pathname = getPathname({
    href: "/philosophy/bushido",
    locale: locale,
  });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
    alternates: getLocalizedAlternates("/philosophy/bushido", locale),
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
      section: t("title"),
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
