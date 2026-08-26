import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { WebPage, WithContext } from "schema-dts";
import askksaThumb from "@/assets/askksa_thumb.svg";
import { getPathname } from "@/i18n/navigation";
import {
  getAbsoluteUrl,
  getLocalizedAlternates,
  getOpenGraphAlternateLocales,
  getOpenGraphLocale,
  getSeoLabels,
} from "@/lib/seo";

export const jsonLd = async (
  t: TFunction,
  locale: Locale,
): Promise<WithContext<WebPage>> => {
  const pathname = getPathname({ href: "/in-dojo", locale: locale });
  const labels = getSeoLabels(locale);

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: t("meta.title"),
    description: t("meta.description"),
    about: t("meta.title"),
    url: process.env.NEXT_PUBLIC_SITE_URL + pathname,
    image: {
      "@type": "ImageObject",
      url: getAbsoluteUrl(askksaThumb.src),
      caption: t("title"),
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
          item: process.env.NEXT_PUBLIC_SITE_URL + pathname,
        },
      ],
    },
  };
};

export async function metadata(locale: Locale): Promise<Metadata> {
  const t = await getTranslations("InDojo");
  const pathname = getPathname({ href: "/in-dojo", locale: locale });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
    alternates: getLocalizedAlternates("/in-dojo", locale),
    openGraph: {
      title: t("meta.title"),
      siteName: "ASKKSA: Associação Shotokan Kokusai Karate Santo António",
      locale: getOpenGraphLocale(locale),
      alternateLocale: getOpenGraphAlternateLocales(locale),
      description: t("meta.description"),
      url: process.env.NEXT_PUBLIC_SITE_URL + pathname,
      type: "website",
      images: [
        {
          url: askksaThumb.src,
          width: askksaThumb.width,
          height: askksaThumb.height,
          alt: t("title"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("meta.title"),
      description: t("meta.description"),
      images: [askksaThumb.src],
    },
  };
}
