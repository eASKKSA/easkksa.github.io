import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import type { Thing, WithContext } from "schema-dts";
import { routing } from "@/i18n/routing";

export async function globalMetadata(locale: Locale): Promise<Metadata> {
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (!siteUrl) {
    throw new Error("NEXT_PUBLIC_SITE_URL is not defined");
  }

  const isProduction = process.env.VERCEL_ENV === "production";

  return {
    metadataBase: new URL(siteUrl),
    generator: "Next.js",
    applicationName: "ASKKSA",
    authors: [{ name: "ASKKSA", url: siteUrl }],
    creator: "Nuno Fernandes & Lubélio Fernandes",
    publisher: "ASKKSA - Associação Shotokan Kokusai Karate Santo António",
    category: "Artes Marciais",

    // --- Robots & Indexing ---
    robots: {
      index: isProduction,
      follow: isProduction,
      googleBot: {
        index: isProduction,
        follow: isProduction,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },

    // --- App & Device Integration ---
    appleWebApp: {
      title: "ASKKSA",
      capable: true,
      statusBarStyle: "default",
      startupImage: [
        {
          url: "/icons/icon-512x512.png",
          media: "(device-width: 768px) and (device-height: 1024px)",
        },
      ],
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
    // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for JSON-LD structured data
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replaceAll("<", String.raw`\u003c`),
      }}
    />
  );
}
