"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { FaCog, FaBars, FaTimes, FaGlobe } from "react-icons/fa";
import dynamic from "next/dynamic";
import { useLocale, type Locale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { mainPagePathnames } from "@/i18n/routing";

import mainLogo from "@/app/icon.svg";

const ThemeToggle = dynamic(() => import("@/components/theme-toggle"), {
  ssr: false,
});

// --- A Simple, Self-Contained Settings Menu Component ---
const SettingsMenu: React.FC<{
  currentLocale: Locale;
}> = ({ currentLocale }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Close the dropdown if clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full transition-colors hover:bg-gray-100 dark:hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        aria-label="Open settings menu"
      >
        <FaCog
          size={20}
          className={`transition-transform duration-300 ${isOpen ? "rotate-90" : ""}`}
        />
      </button>

      {/* Dropdown Panel */}
      <div
        className={`absolute justify-items-center top-full right-0 mt-2 origin-top-right rounded-xl border bg-white shadow-lg transition-all duration-200 ease-out dark:bg-[#222] dark:border-gray-700
          ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}
      >
        {/* We can put the ThemeToggle directly here */}
        <div className="p-2">
          <ThemeToggle />
        </div>
        <div className="my-1 h-px bg-gray-200 dark:bg-gray-700" />
        <div className="flex flex-col gap-1 p-2">
          <span className="flex items-center gap-2 px-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
            <FaGlobe size={16} /> Language
          </span>
          <div className="flex gap-2 justify-around pt-1">
            {(["pt-PT", "en"] as Locale[]).map((locale) => (
              <Link
                key={locale}
                href={pathname}
                locale={locale}
                className={`w-full py-1.5 rounded-md text-center text-sm font-medium transition-colors ${
                  currentLocale === locale
                    ? "bg-primary text-white"
                    : "hover:bg-gray-100 dark:hover:bg-white/10"
                }`}
              >
                {locale.toUpperCase()}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const navigationItems = Object.keys(mainPagePathnames)
  // We filter out the root path "/", as it's usually handled by a logo link
  .filter((canonicalPath) => canonicalPath !== "/")
  .map((canonicalPath) => ({
    // The href is the canonical path, e.g., "/about"
    href: canonicalPath as keyof typeof mainPagePathnames,
    // The labelKey is for fetching the translation, e.g., "about"
    labelKey: canonicalPath.substring(1),
  }));

// --- Main Navbar Component ---
const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const pathname = usePathname();
  const currentLocale = useLocale();
  const t = useTranslations("Navbar");

  // Split navigation items for the desktop layout
  const middleIndex = Math.ceil(navigationItems.length / 2);
  const leftItems = navigationItems.slice(0, middleIndex);
  const rightItems = navigationItems.slice(middleIndex);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    const handleResize = () => setIsMobile(window.innerWidth < 1024);

    handleScroll();
    handleResize();

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const closeMenuOnResize = () =>
      window.innerWidth >= 1024 && setIsMenuOpen(false);
    window.addEventListener("resize", closeMenuOnResize);
    return () => window.removeEventListener("resize", closeMenuOnResize);
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMobile) setIsMenuOpen(false);
  }, [isMobile]);

  return (
    <header
      role="banner"
      className={`${
        isScrolled
          ? "bg-white/90 backdrop-blur-lg dark:bg-[#1a1a1a]/90 border-b border-gray-200/80 dark:border-gray-800/80 shadow-sm"
          : "border-b border-transparent"
      }`}
    >
      {!isMobile ? (
        <>
          <div className="flex items-center mx-auto md:max-w-5xl xl:max-w-7xl">
            {/* The main grid container for all 7 items */}
            <nav
              role="navigation"
              aria-label="Main Navigation"
              className="grid w-full grid-cols-7 items-center justify-items-center"
            >
              {/* Left Items: Each link is a grid item */}
              {leftItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`rounded-md px-3 py-2 text-xl font-bold transition-colors ${
                      isActive
                        ? "text-primary"
                        : "text-gray-900 hover:text-primary dark:text-gray-300 dark:hover:text-primary"
                    }`}
                  >
                    {t(item.labelKey)}
                  </Link>
                );
              })}

              {/* Logo: Takes the center (4th) grid column */}
              <Link href="/" aria-label="Home">
                <Image
                  src={mainLogo}
                  alt="ASKKSA Karate Club Logo"
                  width={100}
                  height={100}
                  className="h-32 w-auto transition-transform hover:scale-105 hover:animate-logo-pulse-grow"
                  unoptimized
                />
              </Link>

              {/* Right Items: Each link is a grid item */}
              {rightItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-nowrap rounded-md px-3 py-2 text-xl font-bold transition-colors ${
                      isActive
                        ? "text-primary"
                        : "text-gray-900 hover:text-primary dark:text-gray-300 dark:hover:text-primary"
                    }`}
                  >
                    {t(item.labelKey)}
                  </Link>
                );
              })}
            </nav>
          </div>
          {/* Position settings absolutely to not interfere with the grid layout */}
          <div className="absolute top-1/2 right-10 -translate-y-1/2">
            <SettingsMenu currentLocale={currentLocale} />
          </div>
        </>
      ) : (
        <>
          <div className="flex h-24 p-4 items-center justify-between">
            <Link href="/" aria-label="Home">
              <Image
                src={mainLogo}
                alt="ASKKSA Logo"
                width={96}
                height={96}
                className="py-1"
                unoptimized
              />
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-full transition-colors hover:bg-gray-100 dark:hover:bg-white/10"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
          {/* Mobile Menu Panel (Simple Dropdown) */}
          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${isMenuOpen ? "max-h-screen" : "max-h-0"} border-gray-200/80 dark:border-gray-800/80 bg-white/90 dark:bg-[#1a1a1a]/90`}
          >
            <nav
              role="navigation"
              aria-label="Main Mobile Navigation"
              className="flex flex-col gap-1 border-t p-4"
            >
              {navigationItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`px-4 py-3 rounded-lg text-lg font-semibold transition-colors ${
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-gray-100 dark:hover:bg-white/5"
                    }`}
                  >
                    {t(item.labelKey)}
                  </Link>
                );
              })}
            </nav>
            <hr />
            <div className="flex items-center justify-between p-4">
              <ThemeToggle />
              <div className="flex flex-col gap-1 p-2">
                <span className="flex items-center gap-2 px-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  <FaGlobe size={16} /> Language
                </span>
                <div className="flex gap-2 justify-around pt-1">
                  {(["pt-PT", "en"] as Locale[]).map((locale) => (
                    <Link
                      key={locale}
                      href={pathname} // Use the home route for language change
                      locale={locale}
                      className={`w-full py-1.5 rounded-md text-sm text-center font-medium transition-colors ${
                        currentLocale === locale
                          ? "bg-primary text-white"
                          : "hover:bg-gray-100 dark:hover:bg-white/10"
                      }`}
                    >
                      {locale.toUpperCase()}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default Navbar;
