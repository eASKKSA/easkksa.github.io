"use client";
import { LuBookOpenCheck, LuListOrdered, LuShield } from "react-icons/lu";
import { Link, usePathname } from "@/i18n/navigation";

type PhilosophyNavigationProps = {
  labels: {
    title: string;
    bushido: string;
    nijuKun: string;
    dojoKun: string;
  };
};

export default function PhilosophyNavigation({
  labels,
}: Readonly<PhilosophyNavigationProps>) {
  const pathname = usePathname();
  const sections = [
    {
      id: "bushido",
      label: labels.bushido,
      icon: LuShield,
      href: "/philosophy/bushido" as const,
    },
    {
      id: "niju-kun",
      label: labels.nijuKun,
      icon: LuListOrdered,
      href: "/philosophy/niju-kun" as const,
    },
    {
      id: "dojo-kun",
      label: labels.dojoKun,
      icon: LuBookOpenCheck,
      href: "/philosophy/dojo-kun" as const,
    },
  ];

  return (
    <nav
      aria-label={labels.title}
      className="sticky top-[96px] z-40 mb-5! mt-0! grid grid-cols-3 gap-2 rounded-[1.35rem] border border-black/10 bg-[#fffdf8]/95 p-2 shadow-[0_12px_32px_rgba(22,18,15,0.09)] backdrop-blur-xl sm:top-[110px] sm:flex sm:justify-center md:mb-10! md:gap-3 lg:top-[125px] lg:p-3 dark:border-white/10 dark:bg-[#171717]/95 dark:shadow-black/25"
    >
      {sections.map((section) => {
        const Icon = section.icon;
        const isActive = section.href === pathname;

        return (
          <Link
            key={section.id}
            href={section.href}
            aria-current={isActive ? "page" : undefined}
            className={`flex min-h-11 min-w-0 items-center justify-center gap-1.5 rounded-xl px-2 py-2.5 text-xs font-semibold transition-colors duration-200 sm:gap-2 sm:px-4 sm:text-base ${
              isActive
                ? "bg-primary text-white shadow-[0_6px_18px_rgba(181,34,43,0.2)]"
                : "text-stone-600 hover:bg-black/5 hover:text-primary dark:text-stone-300 dark:hover:bg-white/8 dark:hover:text-white"
            }`}
          >
            <Icon aria-hidden="true" className="size-4 shrink-0" />
            <span className="truncate">{section.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
