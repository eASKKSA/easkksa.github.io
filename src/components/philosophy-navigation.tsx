"use client";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

export default function PhilosophyNavigation() {
  const t = useTranslations("Philosophy.navigation");
  const [activeSection, setActiveSection] = useState("bushido");

  const sections = [
    { id: "bushido", label: t("bushido"), icon: "⚔️" },
    { id: "niju-kun", label: t("nijuKun"), icon: "📜" },
    { id: "dojo-kun", label: t("dojoKun"), icon: "🥋" },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100; // Account for sticky nav height
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="sticky top-24 lg:top-36 z-40 bg-white/95 dark:bg-black backdrop-blur-sm border-b shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-center space-x-2 md:space-x-8 py-4 overflow-x-auto">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                activeSection === section.id
                  ? "bg-red-600 text-white shadow-lg"
                  : "text-gray-600 dark:text-gray-300 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
              }`}
            >
              <span className="text-lg">{section.icon}</span>
              <span className="hidden sm:block">{section.label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
