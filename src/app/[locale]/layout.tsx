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

  // Read consent cookie on server-side for initial state
  const cookieStore = await cookies();
  const consentCookie = cookieStore.get("cookie_consent");
  const hasConsent = consentCookie !== undefined;
  const consentGranted = consentCookie?.value === "true";

  return (
    <html
      lang={typedLocale}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
        {/* Initialize Consent Mode v2 BEFORE GTM */}
        <Script
          id="consent-mode-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}

gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
  functionality_storage: 'granted',
  personalization_storage: 'denied',
  security_storage: 'granted',
  wait_for_update: ${hasConsent ? 0 : 500}
});

${
  consentGranted
    ? `gtag('consent', 'update', {
  ad_storage: 'granted',
  ad_user_data: 'granted',
  ad_personalization: 'granted',
  analytics_storage: 'granted',
  personalization_storage: 'granted'
});`
    : ""
}
            `.trim(),
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
