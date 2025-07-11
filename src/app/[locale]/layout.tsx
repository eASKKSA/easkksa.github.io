import Background from "@/components/background";
import Providers from "@/components/providers";
import Navbar from "@/components/navbar";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import CookieWarning from "@/components/cookie-warning";
import { globalMetadata } from "@/app/metadata";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Footer from "@/components/footer";
import PageAnimationWrapper from "@/components/page-animation-wrapper";
import { headers } from "next/headers";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: Readonly<{
  params: Promise<{ locale: Locale }>;
}>): Promise<Metadata> {
  const { locale } = await params;
  return await globalMetadata(locale);
}

function isMobileDevice(userAgent: string): boolean {
  const mobileRegex =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i;
  return mobileRegex.test(userAgent);
}

export default async function Layout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const headersList = await headers();
  const userAgent = headersList.get("user-agent") || "";
  const isMobile = isMobileDevice(userAgent);

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://maps.googleapis.com" />
        <link rel="preconnect" href="https://maps.gstatic.com" />
        {isMobile ? (
          <link
            rel="preload"
            href="/askksa-background-tiger-mobile.webp"
            as="image"
            type="image/webp"
          />
        ) : (
          <link
            rel="preload"
            href="/askksa-background-tiger.svg"
            as="image"
            type="image/svg+xml"
          />
        )}
        <link
          rel="preload"
          href="/askksa_logo.svg"
          as="image"
          type="image/svg+xml"
        />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID!} />
      </head>
      <body>
        <NextIntlClientProvider>
          <Providers>
            <Navbar />
            <PageAnimationWrapper>{children}</PageAnimationWrapper>
            <Footer />
            <Background />
            <CookieWarning />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
