import Background from "@/components/background";
import Providers from "@/components/providers";
import Navbar from "@/components/navbar";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { Metadata } from "next";
import { GoogleTagManager } from "@next/third-parties/google";
import CookieWarning from "@/components/cookie-warning";
import { globalMetadata } from "@/app/metadata";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Footer from "@/components/footer";
import Script from "next/script";
import { cookies } from "next/headers";

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

  return (
    <html
      lang={typedLocale}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <Script
        id="gtag-init"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            ${
              hasConsent
                ? `
            gtag('consent', 'update', {
              'ad_storage': '${consentGiven ? "granted" : "denied"}',
              'ad_user_data': '${consentGiven ? "granted" : "denied"}',
              'ad_personalization': '${consentGiven ? "granted" : "denied"}',
              'analytics_storage': '${consentGiven ? "granted" : "denied"}',
              'personalization_storage': '${consentGiven ? "granted" : "denied"}'
            });
            `
                : ""
            }
          `,
        }}
      />
      <GoogleTagManager
        gtmId={process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID!}
      />
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
