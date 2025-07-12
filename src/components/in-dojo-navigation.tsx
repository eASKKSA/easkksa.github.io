"use client";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { FaScroll, FaPray, FaBook, FaMedal } from "react-icons/fa";

export default function InDojoNavigation() {
  const t = useTranslations("InDojo.navigation");
  const pathname = usePathname();
  const sections = [
    {
      id: "salutation",
      label: t("salutation"),
      icon: <FaPray className="text-lg" />,
      href: "/in-dojo/salutation" as const,
    },
    {
      id: "rules",
      label: t("rules"),
      icon: <FaScroll className="text-lg" />,
      href: "/in-dojo/rules" as const,
    },
    {
      id: "vocabulary",
      label: t("vocabulary"),
      icon: <FaBook className="text-lg" />,
      href: "/in-dojo/vocabulary" as const,
    },
    {
      id: "grades",
      label: t("grades"),
      icon: <FaMedal className="text-lg" />,
      href: "/in-dojo/grades" as const,
    },
  ];

  return (
    <nav className="sticky top-[120px] lg:top-[150px] z-40 bg-white/90 backdrop-blur-lg dark:bg-[#1a1a1a]/90 border-b border-gray-200/80 dark:border-gray-800/80 shadow-sm flex justify-center space-x-2 md:space-x-8 py-2 lg:py-4 rounded-full mb-3! mt-0! md:mb-10!">
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
