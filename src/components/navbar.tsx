"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  navigationItems,
  routeMap,
  type Locale,
} from "@/lib/navigation.config";
import { Settings, Menu, X, Globe } from "lucide-react"; // Simple, clean icons
import dynamic from "next/dynamic";

const ThemeToggle = dynamic(() => import("@/components/theme-toggle"), {
  ssr: false,
});

// --- A Simple, Self-Contained Settings Menu Component ---
const SettingsMenu: React.FC<{
  currentLocale: Locale;
  onLanguageChange: (locale: Locale) => void;
}> = ({ currentLocale, onLanguageChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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
        <Settings
          size={20}
          className={`transition-transform duration-300 ${isOpen ? "rotate-90" : ""}`}
        />
      </button>

      {/* Dropdown Panel */}
      <div
        className={`absolute top-full right-0 mt-2 w-48 origin-top-right rounded-xl border bg-white shadow-lg transition-all duration-200 ease-out dark:bg-[#222] dark:border-gray-700
          ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}
      >
        {/* We can put the ThemeToggle directly here */}
        <div className="p-2">
          <ThemeToggle />
        </div>
        <div className="my-1 h-px bg-gray-200 dark:bg-gray-700" />
        <div className="flex flex-col gap-1 p-2">
          <span className="flex items-center gap-2 px-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
            <Globe size={16} /> Language
          </span>
          <div className="flex justify-around pt-1">
            {(["pt", "en"] as Locale[]).map((locale) => (
              <button
                key={locale}
                onClick={() => onLanguageChange(locale)}
                className={`w-full py-1.5 rounded-md text-sm font-medium transition-colors ${
                  currentLocale === locale
                    ? "bg-primary text-white"
                    : "hover:bg-gray-100 dark:hover:bg-white/10"
                }`}
              >
                {locale.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main Navbar Component ---
const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = pathname.startsWith("/en") ? "en" : "pt";

  // Split navigation items for the desktop layout
  const middleIndex = Math.ceil(navigationItems.length / 2);
  const leftItems = navigationItems.slice(0, middleIndex);
  const rightItems = navigationItems.slice(middleIndex);

  const handleLanguageChange = (targetLocale: Locale) => {
    if (currentLocale === targetLocale) return;
    const newPath = pathname.replace(`/${currentLocale}`, `/${targetLocale}`);
    router.push(newPath);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const closeMenuOnResize = () =>
      window.innerWidth >= 1024 && setIsMenuOpen(false);
    window.addEventListener("resize", closeMenuOnResize);
    return () => window.removeEventListener("resize", closeMenuOnResize);
  }, [isMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-lg dark:bg-[#1a1a1a]/90 border-b border-gray-200/80 dark:border-gray-800/80 shadow-sm"
          : "border-b border-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        {/* --- Desktop Navigation (Logo in Middle) --- */}
        <div className="hidden lg:block">
          {/* Add a max-width container to prevent the navbar from stretching too far on large screens.
      'mx-auto' will center it. 'max-w-7xl' is a common choice, but you can adjust it. */}
          <div className="mx-auto max-w-7xl px-4">
            <div className="relative flex h-36 items-center">
              {/* The main grid container for all 7 items */}
              <nav className="grid w-full grid-cols-7 items-center justify-items-center">
                {/* Left Items: Each link is a grid item */}
                {leftItems.map((item) => (
                  <Link
                    key={item.id}
                    href={routeMap[item.id][currentLocale]}
                    className={`rounded-md px-3 py-2 text-xl font-bold transition-colors ${
                      pathname === routeMap[item.id][currentLocale]
                        ? "text-primary"
                        : "text-gray-900 hover:text-primary dark:text-gray-300 dark:hover:text-primary"
                    }`}
                  >
                    {item.label[currentLocale]}
                  </Link>
                ))}

                {/* Logo: Takes the center (4th) grid column */}
                <div className="flex-shrink-0">
                  <Link href={routeMap.home[currentLocale]} aria-label="Home">
                    <Image
                      src="/askksa_logo.svg"
                      alt="ASKKSA Karate Club Logo"
                      width={100}
                      height={100}
                      className="h-32 w-auto transition-transform hover:scale-105" // Slightly smaller to fit h-32 container
                      priority
                    />
                  </Link>
                </div>

                {/* Right Items: Each link is a grid item */}
                {rightItems.map((item) => (
                  <Link
                    key={item.id}
                    href={routeMap[item.id][currentLocale]}
                    className={`text-nowrap rounded-md px-3 py-2 text-xl font-bold transition-colors ${
                      pathname === routeMap[item.id][currentLocale]
                        ? "text-primary"
                        : "text-gray-900 hover:text-primary dark:text-gray-300 dark:hover:text-primary"
                    }`}
                  >
                    {item.label[currentLocale]}
                  </Link>
                ))}
              </nav>
            </div>
            {/* Position settings absolutely to not interfere with the grid layout */}
            <div className="absolute top-1/2 right-10 -translate-y-1/2">
              <SettingsMenu
                currentLocale={currentLocale}
                onLanguageChange={handleLanguageChange}
              />
            </div>
          </div>
        </div>

        {/* --- Mobile Navigation --- */}
        <div className="lg:hidden flex h-20 items-center justify-between">
          <SettingsMenu
            currentLocale={currentLocale}
            onLanguageChange={handleLanguageChange}
          />
          <Link href={routeMap.home[currentLocale]} aria-label="Home">
            <Image
              priority
              src="/askksa_logo.svg"
              alt="ASKKSA Logo"
              width={10}
              height={10}
              className="h-20 py-1 w-auto"
            />
          </Link>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-full transition-colors hover:bg-gray-100 dark:hover:bg-white/10"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel (Simple Dropdown) */}
      <div
        className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${isMenuOpen ? "max-h-screen" : "max-h-0"}`}
      >
        <nav className="flex flex-col gap-1 border-t border-gray-200/80 dark:border-gray-800/80 bg-white/90 dark:bg-[#1a1a1a]/90 p-4">
          {navigationItems.map((item) => (
            <Link
              key={item.id}
              href={routeMap[item.id][currentLocale]}
              onClick={() => setIsMenuOpen(false)}
              className={`px-4 py-3 rounded-lg text-lg font-semibold transition-colors ${
                pathname === routeMap[item.id][currentLocale]
                  ? "bg-primary/10 text-primary"
                  : "hover:bg-gray-100 dark:hover:bg-white/5"
              }`}
            >
              {item.label[currentLocale]}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
