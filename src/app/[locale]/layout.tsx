import Background from "@/components/background";
import Providers from "@/components/providers";
import Navbar from "@/components/navbar";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import CookieWarning from "@/components/cookie-warning";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import { globalMetadata, MetadataLDJSON } from "@/app/metadata";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Footer from "@/components/footer";
import PageAnimationWrapper from "@/components/page-animation-wrapper";

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
  const hasConsent = getCookie("cookie_consent", { cookies }) === "true";
  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <MetadataLDJSON />
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
      {hasConsent && <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />}
    </html>
  );
}
