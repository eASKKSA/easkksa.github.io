import { getTranslations, getLocale } from "next-intl/server";
import { WebPage, WithContext } from "schema-dts";
import { Metadata } from "next";
import { headers } from "next/headers";

export const jsonLd = async (): Promise<WithContext<WebPage>> => {
  const t = await getTranslations("Philosophy");
  const orgT = await getTranslations("Organization");
  const appHeaders = await headers();
  const fullPathname = appHeaders.get("x-next-pathname") ?? "/philosophy";

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: t("meta.title"),
    description: t("meta.description"),
    about: "Filosofia do Karaté Shotokan",
    keywords: t("meta.keywords"),
    url: process.env.NEXT_PUBLIC_SITE_URL + fullPathname,
    image: {
      "@type": "ImageObject",
      url:
        process.env.NEXT_PUBLIC_SITE_URL +
        "/assets/philosofy/codigo-etica-karate.jpg",
      caption: "Filosofia do Karaté - Bushido, Niju Kun e Dojo Kun",
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
    mentions: [
      {
        "@type": "Person",
        name: "Gichin Funakoshi",
        description: "Criador dos princípios Niju Kun e Dojo Kun",
      },
      {
        "@type": "Thing",
        name: "Bushido",
        description: "Código de ética dos Samurais adaptado ao Karaté",
      },
      {
        "@type": "Thing",
        name: "Niju Kun",
        description: "Os 20 princípios filosóficos do Karaté Shotokan",
      },
      {
        "@type": "Thing",
        name: "Dojo Kun",
        description: "As 5 máximas fundamentais do dojo",
      },
    ],
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Início",
          item: process.env.NEXT_PUBLIC_SITE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Filosofia",
          item: process.env.NEXT_PUBLIC_SITE_URL + fullPathname,
        },
      ],
    },
  };
};

export async function metadata(): Promise<Metadata> {
  const t = await getTranslations("Philosophy");
  const appHeaders = await headers();
  const fullPathname = appHeaders.get("x-next-pathname") ?? "/philosophy";
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
          url: "/assets/philosofy/codigo-etica-karate.jpg",
          width: 800,
          height: 600,
          alt: "Filosofia do Karaté - Bushido",
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
      images: ["/assets/philosofy/codigo-etica-karate.jpg"],
      site: "@askksa_madeira",
    },
  };
}
