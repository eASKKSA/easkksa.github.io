"use client";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { GiKimono, GiCrossedSwords } from "react-icons/gi";
import { FaScroll } from "react-icons/fa";

export default function PhilosophyNavigation() {
  const t = useTranslations("Philosophy.navigation");
  const pathname = usePathname();
  const sections = [
    {
      id: "bushido",
      label: t("bushido"),
      icon: <GiCrossedSwords className="text-lg" />,
      href: "/philosophy/bushido" as const,
    },
    {
      id: "niju-kun",
      label: t("nijuKun"),
      icon: <FaScroll className="text-lg" />,
      href: "/philosophy/niju-kun" as const,
    },
    {
      id: "dojo-kun",
      label: t("dojoKun"),
      icon: <GiKimono className="text-lg" />,
      href: "/philosophy/dojo-kun" as const,
    },
  ];

  return (
    <nav className="sticky top-[120px] lg:top-[150px] z-40 header-scrolled flex justify-center space-x-2 md:space-x-8 py-2 lg:py-4 rounded-full mb-3! mt-0! md:mb-10!">
      {sections.map((section) => (
        <Link
          key={section.id}
          href={section.href}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
            section.href === pathname
              ? "bg-primary text-white shadow-lg"
              : "text-gray-600 dark:text-gray-300 hover:text-primary hover:bg-red-50 dark:hover:bg-red-900/20"
          }`}
        >
          {section.icon}
          <span className="hidden sm:block">{section.label}</span>
        </Link>
      ))}
    </nav>
  );
}
