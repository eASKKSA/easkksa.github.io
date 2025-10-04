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

  return (
    <html
      lang={typedLocale}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
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
