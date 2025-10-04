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
          url: "https://www.fnkp.pt",
        },
        {
          "@type": "Organization",
          name: "AKRAM - Associação de Karate da Região Autónoma da Madeira",
          url: "https://www.akram.pt",
        },
      ],
      address: {
        "@type": "PostalAddress",
        streetAddress: "Escola Horácio Bento de Gouveia, Estr. da Liberdade 1",
        addressLocality: "Funchal",
        addressRegion: "Madeira",
        postalCode: "9004-524",
        addressCountry: "PT",
      },
      telephone: "+351960384090",
      email: "direcao@askksa.pt",
      areaServed: {
        "@type": "City",
        name: "Funchal",
      },
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
    dateModified: new Date().toISOString(),
    inLanguage: locale,
    isPartOf: {
      "@type": "WebSite",
      name: t("orgName"),
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
          name: locale === "pt-PT" ? "Sobre" : "About",
          item: process.env.NEXT_PUBLIC_SITE_URL + pathname,
        },
      ],
    },
    mentions: [
      {
        "@type": "Person",
        name: "Jorge Freitas",
        jobTitle: "Shihan - 6º DAN",
        description: locale === "pt-PT" ? "Instrutor qualificado de Karaté Shotokan" : "Qualified Shotokan Karate Instructor",
        worksFor: {
          "@type": "SportsOrganization",
          name: "ASKKSA",
        },
      },
      {
        "@type": "Person",
        name: "Rafael Jardim",
        jobTitle: "Sensei - 5º DAN",
        description: locale === "pt-PT" ? "Instrutor qualificado de Karaté Shotokan" : "Qualified Shotokan Karate Instructor",
        worksFor: {
          "@type": "SportsOrganization",
          name: "ASKKSA",
        },
      },
      {
        "@type": "Person",
        name: "Marisa Gomes",
        jobTitle: "Sensei - 5º DAN",
        description: locale === "pt-PT" ? "Instrutora qualificada de Karaté Shotokan" : "Qualified Shotokan Karate Instructor",
        worksFor: {
          "@type": "SportsOrganization",
          name: "ASKKSA",
        },
      },
      {
        "@type": "Person",
        name: "Tito Velosa",
        jobTitle: "Sensei - 4º DAN",
        description: locale === "pt-PT" ? "Instrutor qualificado de Karaté Shotokan" : "Qualified Shotokan Karate Instructor",
        worksFor: {
          "@type": "SportsOrganization",
          name: "ASKKSA",
        },
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
      url: process.env.NEXT_PUBLIC_SITE_URL + pathname,
      type: "website",
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
    },
    twitter: {
      card: "summary_large_image",
      title: t("meta.title"),
      description: t("meta.description"),
      images: [jorgeFreitas.src],
    },
  };
}
