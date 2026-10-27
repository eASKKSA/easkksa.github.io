import { getTranslations } from "next-intl/server";
import PhilosophyNavigation from "@/components/philosophy-navigation";

export default async function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
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
