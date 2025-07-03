import { getTranslations, getLocale } from "next-intl/server";
import { WebPage, WithContext } from "schema-dts";
import { Metadata } from "next";
import { headers } from "next/headers";

export const jsonLd = async (): Promise<WithContext<WebPage>> => {
  const t = await getTranslations("News");
  const orgT = await getTranslations("Organization");
  const appHeaders = await headers();
  const fullPathname = appHeaders.get("x-next-pathname") ?? "/news";

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: t("meta.title"),
    description: t("meta.description"),
    about: "Notícias e Eventos ASKKSA",
    keywords: t("meta.keywords"),
    url: process.env.NEXT_PUBLIC_SITE_URL + fullPathname,
    image: {
      "@type": "ImageObject",
      url: process.env.NEXT_PUBLIC_SITE_URL + "/askksa_logo.svg",
      caption: "ASKKSA - Notícias e Eventos",
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
  };
};

export async function metadata(): Promise<Metadata> {
  const t = await getTranslations("News");
  const appHeaders = await headers();
  const fullPathname = appHeaders.get("x-next-pathname") ?? "/news";
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
          alt: "ASKKSA - Notícias e Eventos",
        },
        {
          url: "/icons/favicon-512x512.png",
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
      images: ["/askksa_logo.svg"],
      site: "@askksa_madeira",
    },
  };
}
