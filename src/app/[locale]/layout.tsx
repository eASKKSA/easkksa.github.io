import "@/app/globals.css";
import Background from "@/components/background";
import Providers from "@/components/providers";
import Navbar from "@/components/navbar";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { SportsOrganization, WithContext } from "schema-dts";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { GoogleAnalytics } from "@next/third-parties/google";
import CookieWarning from "@/components/cookie-warning";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";

export async function generateMetadata({
  params,
}: Readonly<{
  params: Promise<{ locale: Locale }>;
}>): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  const t = await getTranslations("Organization");
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (!siteUrl) {
    throw new Error("NEXT_PUBLIC_SITE_URL is not defined");
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

    alternates: {
      canonical: siteUrl,
      languages: {
        "pt-PT": siteUrl,
        en: `${siteUrl}/en`,
      },
    },

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

export default async function Layout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}>) {
  const { locale } = await params;
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
      "https://www.youtube.com/@askksa_madeira",
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
  const gaId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;
  if (!gaId) {
    throw new Error("NEXT_PUBLIC_GOOGLE_ANALYTICS_ID is not defined");
  }
  const hasConsent = getCookie("cookie_consent", { cookies }) === "true";

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <NextIntlClientProvider>
          <Providers>
            <Navbar />
            {children}
            <Background />
            <CookieWarning />
            {hasConsent && (
              <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
            )}
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
