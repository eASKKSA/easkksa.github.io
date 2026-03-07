import { GoogleTagManager } from "@next/third-parties/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import Script from "next/script";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { globalMetadata } from "@/app/metadata";
import AnalyticsWithConsent from "@/components/analytics";
import Background from "@/components/background";
import ConsentProvider from "@/components/consent-provider";
import CookieWarning from "@/components/cookie-warning";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Providers from "@/components/providers";
import WebVitals from "@/components/web-vitals";
import { routing } from "@/i18n/routing";

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

  // Read cookie consent on server-side
  const cookieStore = await cookies();
  const cookieConsent = cookieStore.get("cookie_consent");
  const consentGiven = cookieConsent?.value === "true";
  const hasConsent = cookieConsent !== undefined;
  const consentStatus = consentGiven ? "granted" : "denied";

  return (
    <html
      lang={typedLocale}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <Script id="gtag-init" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              'ad_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied',
              'analytics_storage': 'denied',
              'personalization_storage': 'denied',
              'wait_for_update': 500
            });
            ${
              hasConsent
                ? `
            gtag('consent', 'update', {
              'ad_storage': '${consentStatus}',
              'ad_user_data': '${consentStatus}',
              'ad_personalization': '${consentStatus}',
              'analytics_storage': '${consentStatus}',
              'personalization_storage': '${consentStatus}'
            });
            `
                : ""
            }
          `}
        </Script>
      </head>
      {process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID && (
        <GoogleTagManager
          gtmId={process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID}
        />
      )}
      <body>
        <ConsentProvider initialConsent={consentGiven}>
          <NextIntlClientProvider>
            <Providers>
              <Navbar />
              <main>{children}</main>
              <Footer />
              <Background />
              <CookieWarning />
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
