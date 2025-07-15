import { getTranslations } from "next-intl/server";
import { AboutPage, WithContext } from "schema-dts";
import { Metadata } from "next";

import jorgeFreitas from "@/assets/senseis/jorge_freitas.webp";
import { getPathname } from "@/i18n/navigation";

export const jsonLd = async (
  t: TFunction,
  locale: Locale,
): Promise<WithContext<AboutPage>> => {
  const pathname = getPathname({ href: "/about", locale: locale });

  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: t("meta.title"),
    description: t("meta.description"),
    about: {
      "@type": "SportsOrganization",
      name: t("orgName"),
      foundingDate: "2000-04-01",
      description: t("orgDescription"),
      sport: t("orgSport"),
      memberOf: [
        {
          "@type": "Organization",
          name: "FNK-P - Federação Nacional de Karate Portugal",
        },
        {
          "@type": "Organization",
          name: "AKRAM - Associação de Karate da Região Autónoma da Madeira",
        },
      ],
    },
    url: process.env.NEXT_PUBLIC_SITE_URL + pathname,
    image: {
      "@type": "ImageObject",
      url: process.env.NEXT_PUBLIC_SITE_URL + "/icons/icon-512x512.png",
      caption: "ASKKSA - Associação Shotokan Kokusai Karate Santo António",
    },
    author: {
      "@type": "Organization",
      name: t("orgName"),
      url: process.env.NEXT_PUBLIC_SITE_URL,
      logo: process.env.NEXT_PUBLIC_SITE_URL + "/icons/icon-512x512.png",
    },
    publisher: {
      "@type": "Organization",
      name: t("orgName"),
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
    datePublished: "2000-04-01T00:00:00+00:00",
    dateModified: "2025-07-10T10:00:00+00:00",
    inLanguage: locale,
    isPartOf: {
      "@type": "WebSite",
      name: t("orgName"),
      url: process.env.NEXT_PUBLIC_SITE_URL,
    },
    mentions: [
      {
        "@type": "Person",
        name: "Jorge Freitas",
        jobTitle: "Shihan - 6º DAN",
        description: "Instrutor qualificado de Karaté Shotokan",
      },
      {
        "@type": "Person",
        name: "Rafael Jardim",
        jobTitle: "Sensei - 5º DAN",
        description: "Instrutor qualificado de Karaté Shotokan",
      },
      {
        "@type": "Person",
        name: "Marisa Gomes",
        jobTitle: "Sensei - 5º DAN",
        description: "Instrutora qualificada de Karaté Shotokan",
      },
      {
        "@type": "Person",
        name: "Tito Velosa",
        jobTitle: "Sensei - 4º DAN",
        description: "Instrutor qualificado de Karaté Shotokan",
      },
    ],
  };
};

export async function metadata(locale: Locale): Promise<Metadata> {
  const t = await getTranslations("About");
  const pathname = getPathname({ href: "/about", locale: locale });
  const otherLocale = locale === "pt-PT" ? "en" : "pt-PT";
  const otherPathname = getPathname({ href: "/about", locale: otherLocale });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
    keywords: t("meta.keywords"),
    applicationName: "ASKKSA",
    alternates: {
      canonical: pathname,
      languages: {
        [otherLocale]: otherPathname,
        "x-default": getPathname({ href: "/about", locale: "en" }),
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
          url: jorgeFreitas.src,
          width: 400,
          height: 400,
          alt: "Equipa de Instrutores ASKKSA",
        },
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
      images: [jorgeFreitas.src],
      site: "@askksa_madeira",
    },
  };
}
