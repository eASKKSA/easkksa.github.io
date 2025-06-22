import { Metadata } from "next";
import { hasLocale } from "next-intl";
import { mainPagePathnames, routing } from "@/i18n/routing";
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
