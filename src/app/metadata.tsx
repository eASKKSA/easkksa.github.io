import { Metadata } from "next";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { Thing, WithContext } from "schema-dts";

export async function globalMetadata(locale: Locale): Promise<Metadata> {
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (!siteUrl) {
    throw new Error("NEXT_PUBLIC_SITE_URL is not defined");
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
