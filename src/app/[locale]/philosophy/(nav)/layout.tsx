import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { globalMetadata } from "@/app/metadata";
import PhilosophyNavigation from "@/components/philosophy-navigation";
import { routing } from "@/i18n/routing";

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
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations("Philosophy.navigation");

  return (
    <>
      <PhilosophyNavigation
        labels={{
          title: t("title"),
          bushido: t("bushido"),
          nijuKun: t("nijuKun"),
          dojoKun: t("dojoKun"),
        }}
      />
      {children}
    </>
  );
}
