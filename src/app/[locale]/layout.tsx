import { GoogleTagManager } from "@next/third-parties/google";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import Script from "next/script";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { globalMetadata } from "@/app/metadata";
import Background from "@/components/background";
import CookieWarning from "@/components/cookie-warning";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Providers from "@/components/providers";
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
      <Script id="gtag-init" strategy="beforeInteractive">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
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
      {process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID && (
        <GoogleTagManager
          gtmId={process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID}
        />
      )}
      <body>
        <NextIntlClientProvider>
          <Providers>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <Background />
            <CookieWarning />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
