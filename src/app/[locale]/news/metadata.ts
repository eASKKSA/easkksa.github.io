import { getTranslations } from "next-intl/server";
import { WebPage, WithContext } from "schema-dts";
import { Metadata } from "next";
import { getPathname } from "@/i18n/navigation";

export const jsonLd = async (
  t: TFunction,
  locale: Locale,
): Promise<WithContext<WebPage>> => {
  const pathname = getPathname({ href: "/news", locale: locale });

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: t("meta.title"),
    description: t("meta.description"),
    about: locale === "pt-PT" ? "Notícias e Eventos ASKKSA" : "ASKKSA News and Events",
    keywords: t("meta.keywords"),
    url: process.env.NEXT_PUBLIC_SITE_URL + pathname,
    image: {
      "@type": "ImageObject",
      url: process.env.NEXT_PUBLIC_SITE_URL + "/icons/icon-512x512.png",
      caption: "ASKKSA - Notícias e Eventos",
    },
    author: {
      "@type": "Organization",
      name: t("name"),
      url: process.env.NEXT_PUBLIC_SITE_URL,
      logo: process.env.NEXT_PUBLIC_SITE_URL + "/icons/icon-512x512.png",
    },
    publisher: {
      "@type": "Organization",
      name: t("name"),
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
    dateModified: new Date().toISOString(),
    inLanguage: locale,
    isPartOf: {
      "@type": "WebSite",
      name: t("name"),
      url: process.env.NEXT_PUBLIC_SITE_URL,
    },
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
          name: locale === "pt-PT" ? "Notícias" : "News",
          item: process.env.NEXT_PUBLIC_SITE_URL + pathname,
        },
      ],
    },
    hasPart: [
      {
        "@type": "SocialMediaPosting",
        headline: "Facebook ASKKSA",
        url: "https://www.facebook.com/ASKKSA.MADEIRA",
        author: {
          "@type": "Organization",
          name: "ASKKSA",
        },
      },
      {
        "@type": "SocialMediaPosting",
        headline: "Instagram @askksa_madeira",
        url: "https://www.instagram.com/askksa_madeira/",
        author: {
          "@type": "Organization",
          name: "ASKKSA",
        },
      },
      {
        "@type": "VideoObject",
        name: "ASKKSA YouTube Channel",
        description: locale === "pt-PT" ? "Vídeos de katas, técnicas e eventos" : "Videos of katas, techniques and events",
        thumbnailUrl: process.env.NEXT_PUBLIC_SITE_URL + "/icons/icon-512x512.png",
        uploadDate: "2024-01-01T00:00:00+00:00",
        contentUrl: "https://www.youtube.com/@manuelrafaelpitajard",
      },
    ],
  };
};

export async function metadata(locale: Locale): Promise<Metadata> {
  const t = await getTranslations("News");
  const pathname = getPathname({ href: "/news", locale: locale });
  const otherLocale = locale === "pt-PT" ? "en" : "pt-PT";
  const otherPathname = getPathname({ href: "/news", locale: otherLocale });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
    keywords: t("meta.keywords"),
    alternates: {
      canonical: pathname,
      languages: {
        [otherLocale]: otherPathname,
        "x-default": getPathname({ href: "/news", locale: "en" }),
      },
    },
    openGraph: {
      title: t("meta.title"),
      siteName: "ASKKSA: Associação Shotokan Kokusai Karate Santo António",
      locale: locale,
      description: t("meta.description"),
      url: process.env.NEXT_PUBLIC_SITE_URL + pathname,
      type: "website",
      images: [
        {
          url: "/icons/icon-512x512.png",
          width: 512,
          height: 512,
          alt: t("meta.title"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("meta.title"),
      description: t("meta.description"),
      images: ["/icons/icon-512x512.png"],
    },
  };
}
