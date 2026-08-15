import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import { notFound } from "next/navigation";
import Script from "next/script";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { globalMetadata } from "@/app/metadata";
import AnalyticsWithConsent from "@/components/analytics";
import Background from "@/components/background";
import ConsentProvider from "@/components/consent-provider";
import CookieWarning from "@/components/cookie-warning";
import Footer from "@/components/footer";
import GoogleTagManagerWithConsent from "@/components/google-tag-manager-with-consent";
import Navbar from "@/components/navbar";
import Providers from "@/components/providers";
import ViewportRevealObserver from "@/components/viewport-reveal";
import WebVitals from "@/components/web-vitals";
import { mainPagePathnames, routing } from "@/i18n/routing";
import { localizedText } from "@/lib/seo";

const bodyFont = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const displayFont = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: Readonly<{
  params: Promise<{ locale: string }>;
}>): Promise<Metadata> {
  const { locale } = await params;
  return await globalMetadata(locale as Locale);
}

export default async function Layout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const typedLocale = locale as Locale;

  if (!hasLocale(routing.locales, typedLocale)) {
    notFound();
  }

  setRequestLocale(typedLocale);
  const navbarT = await getTranslations("Navbar");
  const cookieT = await getTranslations("CookieWarning");
  const navbarLabels = Object.fromEntries(
    [
      ...Object.keys(mainPagePathnames).map((pathname) => pathname.slice(1)),
      "portal",
      "portalFull",
    ].map((key) => [key, navbarT(key)]),
  );
  const cookieLabels = {
    ariaLabel: cookieT("ariaLabel"),
    privacyTitle: cookieT("privacyTitle"),
    description: cookieT("description"),
    linkText: cookieT("linkText"),
    acceptAll: cookieT("acceptAll"),
    acceptNecessary: cookieT("acceptNecessary"),
  };

  return (
    <html
      lang={typedLocale}
      className={`${bodyFont.variable} ${displayFont.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <Script id="gtag-init" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            var consentCookie = document.cookie
              .split('; ')
              .find(function(row) { return row.indexOf('cookie_consent=') === 0; });
            var storedConsent = consentCookie
              ? consentCookie.substring('cookie_consent='.length)
              : undefined;
            document.documentElement.dataset.cookieConsent = storedConsent || 'unset';
            gtag('consent', 'default', {
              'ad_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied',
              'analytics_storage': 'denied',
              'personalization_storage': 'denied',
              'wait_for_update': 500
            });
            if (storedConsent !== undefined) {
              var consentStatus = storedConsent === 'true' ? 'granted' : 'denied';
              gtag('consent', 'update', {
                'ad_storage': consentStatus,
                'ad_user_data': consentStatus,
                'ad_personalization': consentStatus,
                'analytics_storage': consentStatus,
                'personalization_storage': consentStatus
              });
            }
          `}
        </Script>
      </head>
      <body>
        <ConsentProvider>
          <a
            href="#main-content"
            className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-full bg-gold px-5 py-3 font-bold text-ink transition-transform focus:translate-y-0"
          >
            {localizedText(typedLocale, {
              "pt-PT": "Saltar para o conteúdo",
              en: "Skip to content",
              fr: "Aller au contenu",
              ja: "本文へ移動",
            })}
          </a>
          {process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID && (
            <GoogleTagManagerWithConsent
              gtmId={process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID}
            />
          )}
          <NextIntlClientProvider messages={null}>
            <Providers>
              <Navbar labels={navbarLabels} />
              <main id="main-content">{children}</main>
              <Footer />
              <Background />
              <CookieWarning labels={cookieLabels} />
              <ViewportRevealObserver />
            </Providers>
          </NextIntlClientProvider>
          <AnalyticsWithConsent />
          <WebVitals />
        </ConsentProvider>
        {/* Speed Insights is anonymous — no consent required */}
        <SpeedInsights />
      </body>
    </html>
  );
}
