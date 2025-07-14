import { getTranslations, getLocale } from "next-intl/server";
import { AboutPage, WithContext } from "schema-dts";
import { Metadata } from "next";
import { headers } from "next/headers";

import jorgeFreitas from "@/assets/senseis/jorge_freitas.webp";

export const jsonLd = async (): Promise<WithContext<AboutPage>> => {
  const t = await getTranslations("About");
  const orgT = await getTranslations("Organization");
  const appHeaders = await headers();
  const fullPathname = appHeaders.get("x-next-pathname") ?? "/about";

  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: t("meta.title"),
    description: t("meta.description"),
    about: {
      "@type": "SportsOrganization",
      name: orgT("name"),
      foundingDate: "2000-04-01",
      description: "Associação Shotokan Kokusai Karate de Santo António",
      sport: "Karaté Shotokan",
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
    url: process.env.NEXT_PUBLIC_SITE_URL + fullPathname,
    image: {
      "@type": "ImageObject",
      url: process.env.NEXT_PUBLIC_SITE_URL + "/icons/favicon-512x512.png",
      caption: "ASKKSA - Associação Shotokan Kokusai Karate Santo António",
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
    datePublished: "2000-04-01T00:00:00+00:00",
    dateModified: new Date().toISOString(),
    inLanguage: await getLocale(),
    isPartOf: {
      "@type": "WebSite",
      name: orgT("name"),
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

export async function metadata(): Promise<Metadata> {
  const t = await getTranslations("About");
  const appHeaders = await headers();
  const fullPathname = appHeaders.get("x-next-pathname") ?? "/about";
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
          url: jorgeFreitas.src,
          width: 400,
          height: 400,
          alt: "Equipa de Instrutores ASKKSA",
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
      images: [jorgeFreitas.src],
      site: "@askksa_madeira",
    },
  };
}
