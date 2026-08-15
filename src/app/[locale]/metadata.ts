import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type {
  LocalBusiness,
  SportsOrganization,
  WebSite,
  WithContext,
} from "schema-dts";
import heroImage from "@/assets/in-dojo/Sensei_Seiza.jpeg";
import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { getLocalizedAlternates, localizedText } from "@/lib/seo";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

// WebSite Schema - Removed SearchAction (no internal search on site)
export const websiteSchema = async (
  _locale: Locale,
): Promise<WithContext<WebSite>> => {
  const t = await getTranslations("Organization");

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: t("name"),
    url: siteUrl,
    inLanguage: routing.locales,
    publisher: { "@id": `${siteUrl}/#organization` },
  };
};

// Enhanced SportsOrganization + LocalBusiness combo for maximum SEO
export const jsonLd = async (
  t: TFunction,
  locale: Locale,
): Promise<WithContext<SportsOrganization & LocalBusiness>> => {
  const pathname = getPathname({ href: "/", locale: locale });
  return {
    "@context": "https://schema.org",
    "@id": `${siteUrl}/#organization`,
    "@type": ["SportsOrganization", "LocalBusiness"],
    name: t("name"),
    legalName: t("name"),
    alternateName: "ASKKSA",
    sport: t("sport"),
    description: t("description"),
    url: siteUrl + pathname,
    logo: {
      "@type": "ImageObject",
      url: `${siteUrl}/icons/icon-512x512.png`,
    },
    image: {
      "@type": "ImageObject",
      url: `${siteUrl}${heroImage.src}`,
      width: heroImage.width,
      height: heroImage.height,
      caption: t("name"),
    },
    foundingDate: "2000-04-01",
    telephone: "+351960384090",
    email: "direcao@askksa.pt",
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
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: t("contactType"),
        telephone: "+351960384090",
        email: "direcao@askksa.pt",
        availableLanguage: ["Portuguese", "English", "French", "Japanese"],
      },
    ],
    // LocalBusiness specific properties
    priceRange: "€€",
    paymentAccepted: "Cash, Bank Transfer",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "19:30",
        closes: "21:30",
      },
    ],
    geo: {
      "@type": "GeoCoordinates",
      latitude: "32.64960322122704",
      longitude: "-16.925423720138244",
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
        image: `${siteUrl}/icons/icon-512x512.png`,
        telephone: "+351960384090",
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
        image: `${siteUrl}/icons/icon-512x512.png`,
        telephone: "+351960384090",
      },
    ],
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
    areaServed: [
      {
        "@type": "City",
        name: "Funchal",
      },
      {
        "@type": "City",
        name: "Câmara de Lobos",
      },
      {
        "@type": "AdministrativeArea",
        name: "Madeira",
      },
    ],
  } as unknown as WithContext<SportsOrganization & LocalBusiness>;
};

export async function metadata(locale: Locale): Promise<Metadata> {
  const t = await getTranslations("Home");
  const pathname = getPathname({ href: "/", locale: locale });
  return {
    title: t("meta.title"),
    description: t("meta.description"),
    alternates: getLocalizedAlternates("/", locale),
    openGraph: {
      title: t("meta.title"),
      siteName: "ASKKSA: Associação Shotokan Kokusai Karate Santo António",
      locale: locale,
      description: t("meta.description"),
      url: siteUrl + pathname,
      type: "website",
      images: [
        {
          url: `${siteUrl}${heroImage.src}`,
          width: heroImage.width,
          height: heroImage.height,
          alt: localizedText(locale, {
            "pt-PT": "Praticantes da ASKKSA em seiza no dojo",
            en: "ASKKSA students in seiza at the dojo",
            fr: "Pratiquants de l’ASKKSA en seiza dans le dojo",
            ja: "道場で正座するASKKSAの稽古生",
          }),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("meta.title"),
      description: t("meta.description"),
      images: [`${siteUrl}${heroImage.src}`],
    },
  };
}
