"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { type Locale, useLocale } from "next-intl";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { FaBars, FaCog, FaGlobe, FaTimes } from "react-icons/fa";
import mainLogo from "@/app/icon.svg";
import { Link, usePathname } from "@/i18n/navigation";
import { mainPagePathnames } from "@/i18n/routing";

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
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
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
type NavbarProps = {
  labels: Record<string, string>;
};

const Navbar: React.FC<NavbarProps> = ({ labels }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  const pathname = usePathname();
  const currentLocale = useLocale();

  // Split navigation items for the desktop layout
  const middleIndex = Math.ceil(navigationItems.length / 2);
  const leftItems = navigationItems.slice(0, middleIndex);
  const rightItems = navigationItems.slice(middleIndex);

  useEffect(() => {
    let animationFrame = 0;
    const updateHeader = () => {
      animationFrame = 0;
      headerRef.current?.setAttribute(
        "data-scrolled",
        String(window.scrollY > 10),
      );
    };
    const handleScroll = () => {
      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(updateHeader);
      }
    };

    updateHeader();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      data-scrolled="false"
      className="border-b border-transparent data-[scrolled=true]:bg-white/90 data-[scrolled=true]:backdrop-blur-lg data-[scrolled=true]:border-gray-200/80 data-[scrolled=true]:shadow-sm dark:data-[scrolled=true]:bg-[#1a1a1a]/90 dark:data-[scrolled=true]:border-gray-800/80"
    >
      <div className="hidden lg:block">
        <div className="flex items-center mx-auto md:max-w-5xl xl:max-w-7xl">
          {/* The main grid container for all 7 items */}
          <nav
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
                  {labels[item.labelKey]}
                </Link>
              );
            })}

            {/* Logo: Takes the center (4th) grid column */}
            <Link href="/" aria-label="Home" prefetch={false}>
              <Image
                src={mainLogo}
                alt="ASKKSA Karate Club Logo"
                width={100}
                height={100}
                className="h-32 w-auto transition-transform hover:scale-105 hover:animate-logo-pulse-grow"
                priority
                fetchPriority="high"
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
                  {labels[item.labelKey]}
                </Link>
              );
            })}
          </nav>
        </div>
        {/* Position settings absolutely to not interfere with the grid layout */}
        <div className="absolute top-1/2 right-10 -translate-y-1/2">
          <SettingsMenu currentLocale={currentLocale} />
        </div>
      </div>
      <div className="lg:hidden">
        <div className="flex h-24 p-4 items-center justify-between">
          <Link href="/" aria-label="Home" prefetch={false}>
            <Image
              src={mainLogo}
              alt="ASKKSA Logo"
              width={96}
              height={96}
              className="py-1"
              priority
              unoptimized
            />
          </Link>
          <button
            type="button"
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
                  {labels[item.labelKey]}
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
      </div>
    </header>
  );
};

export default Navbar;
