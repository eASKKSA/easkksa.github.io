import { Metadata } from "next";
import { hasLocale } from "next-intl";
import { mainPagePathnames, routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { SportsOrganization, WithContext } from "schema-dts";
import { headers } from "next/headers";

export async function globalMetadata(locale: Locale): Promise<Metadata> {
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  const t = await getTranslations("Organization");
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (!siteUrl) {
    throw new Error("NEXT_PUBLIC_SITE_URL is not defined");
  }
  const appHeaders = await headers();
  const fullPathname = appHeaders.get("x-next-pathname") ?? "/";

  // 2. Find the canonical key (e.g., "/about") for the current path (e.g., "/sobre")
  const pathnameWithoutLocale = fullPathname.startsWith(`/${locale}`)
    ? fullPathname.substring(locale.length + 1) || "/"
    : fullPathname;

  let canonicalKey: string | undefined;
  let pageLocalizations: { [key: string]: string } | undefined;

  for (const [key, pathnames] of Object.entries(mainPagePathnames)) {
    if (Object.values(pathnames).includes(pathnameWithoutLocale)) {
      canonicalKey = key; // Found it! The key is "/about"
      pageLocalizations = pathnames; // The object with { "pt-PT": "/sobre", "en": "/about" }
      break;
    }
  }

  // 3. Dynamically build the 'alternates' object
  let alternates: Metadata["alternates"] = {
    canonical: fullPathname, // Default to self-referencing
  };

  if (canonicalKey && pageLocalizations) {
    const languageAlternates: { [key: string]: string } = {};

    routing.locales.forEach((altLocale) => {
      const pathForLocale = pageLocalizations![altLocale as Locale];
      const isDefaultLocale = altLocale === routing.defaultLocale;
      const prefix =
        isDefaultLocale && routing.localePrefix === "as-needed"
          ? ""
          : `/${altLocale}`;
      const finalPath = pathForLocale === "/" ? "" : pathForLocale;
      languageAlternates[altLocale] = `${siteUrl}${prefix}${finalPath}`;
    });

    alternates = {
      // Per your request, canonical points to the base path (the key)
      canonical: canonicalKey,
      languages: languageAlternates,
    };
  }

  return {
    metadataBase: new URL(siteUrl),
    title: {
      absolute: t("name"),
    },
    description: t("description"),
    generator: "Next.js",
    applicationName: "ASKKSA",
    authors: [{ name: "ASKKSA", url: siteUrl }],
    creator: "ASKKSA",
    category: "Artes Marciais",

    // --- Robots & Indexing ---
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    openGraph: {
      title: t("name"),
      description: t("description"),
      url: process.env.NEXT_PUBLIC_SITE_URL,
      images: [
        {
          url: "/icons/favicon-512x512.png",
          width: 512,
          height: 512,
          alt: t("name"),
        },
      ],
      type: "website",
      locale: locale,
    },
    // --- Icons & Manifest ---
    icons: {
      icon: "/icons/favicon-32x32.png", // Assumes standard icon paths
      shortcut: "/favicon.ico",
      apple: "/icons/apple-touch-icon.png",
    },
    manifest: `/icons/manifest.json`, // Assumes a standard manifest location

    alternates: alternates,

    // --- App & Device Integration ---
    appleWebApp: {
      title: "ASKKSA",
      capable: true,
      statusBarStyle: "default",
    },

    // --- Other ---
    bookmarks: [siteUrl], // Sets the homepage as a bookmark
  };
}

export async function MetadataLDJSON() {
  const t = await getTranslations("Organization");

  // Dynamically build JSON-LD with translations
  const jsonLd: WithContext<SportsOrganization> = {
    "@context": "https://schema.org",
    "@type": "SportsOrganization",
    name: t("name"),
    sport: t("sport"),
    description: t("description"),
    url: process.env.NEXT_PUBLIC_SITE_URL,
    logo: "/icons/favicon-512x512.png",
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
          postalCode: "9004-524",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: "32.64960322122704",
          longitude: "-16.925423720138244",
        },
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
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: "32.66403626393345",
          longitude: "-16.940252710073036",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
