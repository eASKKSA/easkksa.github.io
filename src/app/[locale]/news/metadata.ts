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
    "@type": "WebPage",
    name: t("meta.title"),
    description: t("meta.description"),
    about: "Notícias e Eventos ASKKSA",
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
    dateModified: "2025-07-10T10:00:00+00:00",
    inLanguage: locale,
    isPartOf: {
      "@type": "WebSite",
      name: t("name"),
      url: process.env.NEXT_PUBLIC_SITE_URL,
    },
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
      url: pathname,
      images: [
        {
          url: "/icons/icon-512x512.png",
          width: 512,
          height: 512,
          alt: t("meta.title"),
        },
      ],
      type: "website",
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
