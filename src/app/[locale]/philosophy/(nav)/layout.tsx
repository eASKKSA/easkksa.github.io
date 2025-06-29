import { Metadata } from "next";
import { globalMetadata } from "@/app/metadata";
import { routing } from "@/i18n/routing";
import PhilosophyNavigation from "@/components/philosophy-navigation";

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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <PhilosophyNavigation />
      {children}
    </>
  );
}
