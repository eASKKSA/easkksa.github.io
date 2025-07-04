import { Metadata } from "next";
import { hasLocale } from "next-intl";
import {
  mainPagePathnames,
  inDojoPagePathnames,
  philosophyPagePathnames,
  routing,
} from "@/i18n/routing";
import { notFound } from "next/navigation";
import { Thing, WithContext } from "schema-dts";
import { headers } from "next/headers";

export async function globalMetadata(locale: Locale): Promise<Metadata> {
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (!siteUrl) {
    throw new Error("NEXT_PUBLIC_SITE_URL is not defined");
  }
  const appHeaders = await headers();
  const fullPathname = appHeaders.get("x-next-pathname") ?? "/";

  // Remove locale prefix to get the pathname without locale
  const pathnameWithoutLocale = fullPathname.startsWith(`/${locale}`)
    ? fullPathname.substring(locale.length + 1) || "/"
    : fullPathname;

  let canonicalKey: string | undefined;
  let pageLocalizations: { [key: string]: string } | undefined;

  // Combine all pathname objects to search through them
  const allPathnames = {
    ...mainPagePathnames,
    ...philosophyPagePathnames,
    ...inDojoPagePathnames,
    "/": { "pt-PT": "/", en: "/" }, // Add homepage
    "/privacy-policy": {
      "pt-PT": "/politica-de-privacidade",
      en: "/privacy-policy",
    },
    "/not-found": { "pt-PT": "/nao-encontrado", en: "/not-found" },
  };

  // Find the canonical key for the current path
  for (const [key, pathnames] of Object.entries(allPathnames)) {
    if (Object.values(pathnames).includes(pathnameWithoutLocale)) {
      canonicalKey = key;
      pageLocalizations = pathnames;
      break;
    }
  }

  // Build the alternates object
  let alternates: Metadata["alternates"] = {
    canonical: `${siteUrl}${fullPathname}`, // Current page full URL
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

    // Add x-default pointing to the default locale version
    const defaultLocalePath = pageLocalizations[routing.defaultLocale];
    const defaultFinalPath = defaultLocalePath === "/" ? "" : defaultLocalePath;
    languageAlternates["x-default"] = `${siteUrl}${defaultFinalPath}`;

    alternates = {
      canonical: `${siteUrl}${fullPathname}`, // Current page full URL
      languages: languageAlternates,
    };
  }

  return {
    metadataBase: new URL(siteUrl),
    generator: "Next.js",
    applicationName: "ASKKSA",
    authors: [{ name: "ASKKSA", url: siteUrl }],
    creator: "Nuno Fernandes & Lubélio Fernandes",
    category: "Artes Marciais",

    // --- Robots & Indexing ---
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
      },
    },
    // --- Icons & Manifest ---
    icons: {
      icon: "/icons/favicon-32x32.png", // Assumes standard icon paths
      shortcut: "/favicon.ico",
      apple: "/icons/favicon-144x144.png",
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

type MetadataLDJSONProps = {
  jsonLd: WithContext<Thing>;
};

export async function MetadataLDJSON({
  jsonLd,
}: Readonly<MetadataLDJSONProps>) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
