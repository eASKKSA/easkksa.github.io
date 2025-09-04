import { Metadata } from "next";
import { globalMetadata } from "@/app/metadata";
import { routing } from "@/i18n/routing";
import InDojoNavigation from "@/components/in-dojo-navigation";

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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <InDojoNavigation />
      {children}
    </>
  );
}
