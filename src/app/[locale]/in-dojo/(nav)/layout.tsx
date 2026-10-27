import { getTranslations } from "next-intl/server";
import InDojoNavigation from "@/components/in-dojo-navigation";

export default async function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const t = await getTranslations("InDojo.navigation");

  return (
    <>
      <InDojoNavigation
        labels={{
          title: t("title"),
          salutation: t("salutation"),
          rules: t("rules"),
          vocabulary: t("vocabulary"),
          grades: t("grades"),
        }}
      />
      {children}
    </>
  );
}
