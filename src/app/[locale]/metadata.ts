import { getTranslations, getLocale } from "next-intl/server";
import { SportsOrganization, WithContext } from "schema-dts";
import { Metadata } from "next";
import { getPathname } from "@/i18n/navigation";

export const jsonLd = async (): Promise<WithContext<SportsOrganization>> => {
  const t = await getTranslations("Organization");
  const locale = await getLocale();
  const pathname = getPathname({ href: "/", locale: locale });

  return {
    "@context": "https://schema.org",
    "@type": "SportsOrganization",
    name: t("name"),
    sport: t("sport"),
    description: t("description"),
    url: process.env.NEXT_PUBLIC_SITE_URL + pathname,
    logo: "/icons/icon-512x512.png",
    foundingDate: "2000-04-01",
    founder: "Rafael Jardim",
    sameAs: [
      "https://www.facebook.com/ASKKSA.MADEIRA",
      "https://www.instagram.com/askksa_madeira/",
      "https://www.youtube.com/@manuelrafaelpitajard",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: t("addressLocality"),
      addressRegion: t("addressRegion"),
      addressCountry: t("addressCountry"),
      postalCode: "9004-524",
      streetAddress: t("streetAddress"),
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: t("contactType"),
      telephone: "+351960384090",
      email: "direcao@askksa.pt",
    },
    location: [
      {
        "@type": "SportsActivityLocation",
        name: t("dojo1.name"),
        address: {
          "@type": "PostalAddress",
          name: t("dojo1.address.name"),
          addressLocality: t("dojo1.address.addressLocality"),
          addressRegion: t("dojo1.address.addressRegion"),
          addressCountry: t("dojo1.address.addressCountry"),
          streetAddress: "Estr. da Liberdade 1",
          postalCode: "9004-524",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: "32.64960322122704",
          longitude: "-16.925423720138244",
        },
        image: "/icons/icon-512x512.png",
        telephone: "+351960384090",
        priceRange: "25€",
      },
      {
        "@type": "SportsActivityLocation",
        name: t("dojo2.name"),
        address: {
          "@type": "PostalAddress",
          name: t("dojo2.address.name"),
          addressLocality: t("dojo2.address.addressLocality"),
          addressRegion: t("dojo2.address.addressRegion"),
          addressCountry: t("dojo2.address.addressCountry"),
          streetAddress: "Caminho das Romeiras 10",
          postalCode: "9020-117",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: "32.66403626393345",
          longitude: "-16.940252710073036",
        },
        image: "/icons/icon-512x512.png",
        telephone: "+351960384090",
        priceRange: "25€",
      },
    ],
  };
};

export async function metadata(): Promise<Metadata> {
  const t = await getTranslations("Home");
  const locale = await getLocale();
  const pathname = getPathname({ href: "/", locale: locale });
  const otherLocale = locale === "pt-PT" ? "en" : "pt-PT";
  const otherPathname = getPathname({ href: "/", locale: otherLocale });
  return {
    title: t("meta.title"),
    description: t("meta.description"),
    keywords: t("meta.keywords"),
    applicationName: "ASKKSA",
    alternates: {
      canonical: pathname,
      languages: {
        [otherLocale]: otherPathname,
        "x-default": getPathname({ href: "/", locale: "en" }),
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
          url: "/icons/favicon-512x512.png",
          width: 512,
          height: 512,
          alt: t("meta.title"),
        },
      ],
      type: "website",
    },
  };
}
