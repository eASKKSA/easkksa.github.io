import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import type { Thing, WithContext } from "schema-dts";
import { routing } from "@/i18n/routing";
import { getSiteUrl, isProductionDeployment } from "@/lib/seo";

export async function globalMetadata(locale: Locale): Promise<Metadata> {
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  const siteUrl = getSiteUrl();

  const isProduction = isProductionDeployment();
  const otherVerification = Object.fromEntries(
    [
      ["msvalidate.01", process.env.BING_SITE_VERIFICATION],
      ["baidu-site-verification", process.env.BAIDU_SITE_VERIFICATION],
      ["naver-site-verification", process.env.NAVER_SITE_VERIFICATION],
      ["y_key", process.env.YAHOO_SITE_VERIFICATION],
    ].filter((entry): entry is [string, string] => Boolean(entry[1])),
  );

  return {
    metadataBase: new URL(siteUrl),
    generator: "Next.js",
    applicationName: "ASKKSA",
    authors: [{ name: "ASKKSA", url: siteUrl }],
    creator: "Nuno Fernandes & Lubélio Fernandes",
    publisher: "ASKKSA - Associação Shotokan Kokusai Karate Santo António",
    category: "Artes Marciais",

    verification: {
      ...(process.env.GOOGLE_SITE_VERIFICATION
        ? { google: process.env.GOOGLE_SITE_VERIFICATION }
        : {}),
      ...(process.env.YANDEX_SITE_VERIFICATION
        ? { yandex: process.env.YANDEX_SITE_VERIFICATION }
        : {}),
      ...(Object.keys(otherVerification).length > 0
        ? { other: otherVerification }
        : {}),
    },

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
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: required for JSON-LD structured data; content is sanitized via replaceAll
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replaceAll("<", String.raw`\u003c`),
      }}
    />
  );
}
