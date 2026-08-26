import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { AboutPage, WithContext } from "schema-dts";

import jorgeFreitas from "@/assets/senseis/jorge_freitas.webp";
import { getPathname } from "@/i18n/navigation";
import {
  getLocalizedAlternates,
  getOpenGraphAlternateLocales,
  getOpenGraphLocale,
  getSeoLabels,
} from "@/lib/seo";

export const jsonLd = async (
  t: TFunction,
  locale: Locale,
): Promise<WithContext<AboutPage>> => {
  const pathname = getPathname({ href: "/about", locale: locale });
  const labels = getSeoLabels(locale);

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
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/icons/icon-512x512.png`,
      caption: "ASKKSA - Associação Shotokan Kokusai Karate Santo António",
    },
    author: {
      "@type": "Organization",
      name: t("orgName"),
      url: process.env.NEXT_PUBLIC_SITE_URL,
      logo: `${process.env.NEXT_PUBLIC_SITE_URL}/icons/icon-512x512.png`,
    },
    publisher: {
      "@type": "Organization",
      name: t("orgName"),
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
      name: t("orgName"),
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
          name: labels.about,
          item: process.env.NEXT_PUBLIC_SITE_URL + pathname,
        },
      ],
    },
    mentions: [
      {
        "@type": "Person",
        name: "Jorge Freitas",
        jobTitle: "Shihan - 6º DAN",
        description: labels.qualifiedInstructor,
        worksFor: {
          "@type": "SportsOrganization",
          name: "ASKKSA",
        },
      },
      {
        "@type": "Person",
        name: "Rafael Jardim",
        jobTitle: "Sensei - 5º DAN",
        description: labels.qualifiedInstructor,
        worksFor: {
          "@type": "SportsOrganization",
          name: "ASKKSA",
        },
      },
      {
        "@type": "Person",
        name: "Marisa Gomes",
        jobTitle: "Sensei - 5º DAN",
        description: labels.qualifiedInstructorFemale,
        worksFor: {
          "@type": "SportsOrganization",
          name: "ASKKSA",
        },
      },
      {
        "@type": "Person",
        name: "Tito Velosa",
        jobTitle: "Sensei - 5º DAN",
        description: labels.qualifiedInstructor,
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

  return {
    title: t("meta.title"),
    description: t("meta.description"),
    applicationName: "ASKKSA",
    alternates: getLocalizedAlternates("/about", locale),
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
