"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { type Locale, useLocale } from "next-intl";
import { useEffect, useRef, useState } from "react";
import {
  LuCheck,
  LuChevronDown,
  LuGlobe,
  LuMenu,
  LuSunMoon,
  LuUserRound,
  LuX,
} from "react-icons/lu";
import mainLogo from "@/app/icon.svg";
import TrackableLink from "@/components/trackable-link";
import { Link, usePathname } from "@/i18n/navigation";
import { mainPagePathnames } from "@/i18n/routing";
import { MEMBERS_PORTAL_URL } from "@/lib/site-links";

const ThemeToggle = dynamic(() => import("@/components/theme-toggle"), {
  ssr: false,
});

const navigationItems = Object.keys(mainPagePathnames)
  .filter((canonicalPath) => canonicalPath !== "/")
  .map((canonicalPath) => ({
    href: canonicalPath as keyof typeof mainPagePathnames,
    labelKey: canonicalPath.substring(1),
  }));

const middleIndex = Math.ceil(navigationItems.length / 2);
const leftNavigationItems = navigationItems.slice(0, middleIndex);
const rightNavigationItems = navigationItems.slice(middleIndex);

const localeOptions: ReadonlyArray<{
  code: Locale;
  label: string;
  name: string;
}> = [
  { code: "pt-PT", label: "PT", name: "Português" },
  { code: "en", label: "EN", name: "English" },
  { code: "fr", label: "FR", name: "Français" },
  { code: "ja", label: "日本語", name: "日本語" },
];

const navbarUi: Record<
  Locale,
  {
    appearance: string;
    chooseLanguage: string;
    home: string;
    language: string;
    menu: string;
    openAppearance: string;
    primaryFirst: string;
    primarySecond: string;
    mobileNavigation: string;
  }
> = {
  "pt-PT": {
    appearance: "Aparência",
    chooseLanguage: "Escolher idioma",
    home: "Página inicial",
    language: "Idioma",
    menu: "Alternar menu",
    openAppearance: "Escolher aparência",
    primaryFirst: "Navegação principal, primeira parte",
    primarySecond: "Navegação principal, segunda parte",
    mobileNavigation: "Navegação principal móvel",
  },
  en: {
    appearance: "Appearance",
    chooseLanguage: "Choose language",
    home: "Home",
    language: "Language",
    menu: "Toggle menu",
    openAppearance: "Choose appearance",
    primaryFirst: "Main navigation, first section",
    primarySecond: "Main navigation, second section",
    mobileNavigation: "Main mobile navigation",
  },
  fr: {
    appearance: "Apparence",
    chooseLanguage: "Choisir la langue",
    home: "Accueil",
    language: "Langue",
    menu: "Ouvrir ou fermer le menu",
    openAppearance: "Choisir l’apparence",
    primaryFirst: "Navigation principale, première partie",
    primarySecond: "Navigation principale, deuxième partie",
    mobileNavigation: "Navigation principale mobile",
  },
  ja: {
    appearance: "表示設定",
    chooseLanguage: "言語を選ぶ",
    home: "ホーム",
    language: "言語",
    menu: "メニューを切り替える",
    openAppearance: "表示モードを選ぶ",
    primaryFirst: "メインナビゲーション前半",
    primarySecond: "メインナビゲーション後半",
    mobileNavigation: "モバイルメインナビゲーション",
  },
};

function isNavigationItemActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

function LocaleLinks({
  currentLocale,
  layout,
  onSelect,
}: Readonly<{
  currentLocale: Locale;
  layout: "grid" | "list";
  onSelect?: () => void;
}>) {
  const pathname = usePathname();
  const ui = navbarUi[currentLocale];

  return (
    <nav
      className={layout === "list" ? "grid gap-1" : "grid grid-cols-2 gap-2"}
      aria-label={ui.language}
    >
      {localeOptions.map(({ code, label, name }) => (
        <Link
          key={code}
          href={pathname}
          locale={code}
          hrefLang={code}
          lang={code}
          title={name}
          onClick={onSelect}
          aria-current={currentLocale === code ? "page" : undefined}
          className={`flex min-h-11 items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-colors duration-200 ${
            currentLocale === code
              ? "bg-primary text-white"
              : "text-stone-700 hover:bg-black/5 hover:text-ink dark:text-stone-200 dark:hover:bg-white/10 dark:hover:text-white"
          }`}
        >
          <span lang={code}>{name}</span>
          {currentLocale === code ? (
            <LuCheck className="size-4 shrink-0" aria-hidden="true" />
          ) : (
            <span className="text-xs font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500">
              {label}
            </span>
          )}
        </Link>
      ))}
    </nav>
  );
}

function LanguageMenu({ currentLocale }: Readonly<{ currentLocale: Locale }>) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const ui = navbarUi[currentLocale];
  const currentOption = localeOptions.find(
    (option) => option.code === currentLocale,
  );

  useEffect(() => {
    if (!isOpen) return;
    panelRef.current
      ?.querySelector<HTMLElement>("[aria-current='page']")
      ?.focus();

    const close = (event: MouseEvent | KeyboardEvent) => {
      if (event instanceof KeyboardEvent && event.key === "Escape") {
        setIsOpen(false);
        triggerRef.current?.focus();
      } else if (
        event instanceof MouseEvent &&
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", close);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        aria-label={ui.chooseLanguage}
        aria-expanded={isOpen}
        aria-controls="desktop-language-menu"
        className="flex h-11 items-center gap-2 rounded-full border border-black/10 px-3 text-sm font-bold text-stone-700 transition-colors duration-200 hover:border-primary hover:text-primary dark:border-white/15 dark:text-stone-200"
      >
        <LuGlobe className="size-4" aria-hidden="true" />
        <span lang={currentLocale}>{currentOption?.label}</span>
        <LuChevronDown
          className={`size-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>
      <div
        ref={panelRef}
        id="desktop-language-menu"
        className={`absolute right-0 top-full mt-3 w-56 origin-top-right rounded-2xl border border-black/10 bg-[#fffdf8] p-3 shadow-2xl transition-all duration-200 dark:border-white/10 dark:bg-[#202020] ${
          isOpen
            ? "visible translate-y-0 opacity-100"
            : "pointer-events-none invisible -translate-y-2 opacity-0"
        }`}
      >
        <p className="mb-2 px-2 text-xs font-bold uppercase tracking-[0.18em] text-stone-500 dark:text-stone-400">
          {ui.language}
        </p>
        <LocaleLinks
          currentLocale={currentLocale}
          layout="list"
          onSelect={() => setIsOpen(false)}
        />
      </div>
    </div>
  );
}

function AppearanceMenu({
  currentLocale,
}: Readonly<{ currentLocale: Locale }>) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const ui = navbarUi[currentLocale];

  useEffect(() => {
    if (!isOpen) return;
    panelRef.current?.querySelector<HTMLInputElement>("input:checked")?.focus();

    const close = (event: MouseEvent | KeyboardEvent) => {
      if (event instanceof KeyboardEvent && event.key === "Escape") {
        setIsOpen(false);
        triggerRef.current?.focus();
      } else if (
        event instanceof MouseEvent &&
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", close);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        aria-label={ui.openAppearance}
        aria-expanded={isOpen}
        aria-controls="desktop-appearance-menu"
        className="grid size-11 place-items-center rounded-full border border-black/10 text-stone-600 transition-colors duration-200 hover:border-primary hover:text-primary dark:border-white/15 dark:text-stone-300"
      >
        <LuSunMoon className="size-[18px]" aria-hidden="true" />
      </button>
      <div
        ref={panelRef}
        id="desktop-appearance-menu"
        className={`absolute right-0 top-full mt-3 w-48 origin-top-right rounded-2xl border border-black/10 bg-[#fffdf8] p-4 shadow-2xl transition-all duration-200 dark:border-white/10 dark:bg-[#202020] ${
          isOpen
            ? "visible translate-y-0 opacity-100"
            : "pointer-events-none invisible -translate-y-2 opacity-0"
        }`}
      >
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-stone-500 dark:text-stone-400">
          {ui.appearance}
        </p>
        <ThemeToggle />
      </div>
    </div>
  );
}

export default function Navbar({
  labels,
}: Readonly<{ labels: Record<string, string> }>) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const currentLocale = useLocale();
  const ui = navbarUi[currentLocale];

  useEffect(() => {
    const updateHeader = () => {
      headerRef.current?.setAttribute(
        "data-scrolled",
        String(window.scrollY > 16),
      );
    };
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isMenuOpen]);

  return (
    <header ref={headerRef} data-scrolled="false">
      <div className="relative mx-auto flex h-[68px] max-w-[1420px] items-center rounded-[1.35rem] border border-black/8 bg-[#fffdf8]/94 px-3 shadow-[0_12px_40px_rgba(22,18,15,0.08)] backdrop-blur-xl transition-all duration-300 group-data-[scrolled=true]:border-black/12 group-data-[scrolled=true]:bg-[#fffdf8] group-data-[scrolled=true]:shadow-[0_16px_48px_rgba(22,18,15,0.14)] min-[1360px]:h-[76px] dark:border-white/10 dark:bg-[#171717]/94 dark:group-data-[scrolled=true]:border-white/15 dark:group-data-[scrolled=true]:bg-[#171717]">
        <div className="grid w-full grid-cols-[1fr_auto_1fr] items-center min-[1360px]:hidden">
          <TrackableLink
            href={MEMBERS_PORTAL_URL}
            aria-label={labels.portalFull}
            title={labels.portalFull}
            className="grid size-11 place-items-center rounded-full bg-ink text-white transition-colors duration-200 hover:bg-primary dark:bg-white dark:text-ink dark:hover:bg-primary dark:hover:text-white"
            gtmEvent="portal_click"
            gtmParams={{ placement: "navbar_mobile_quick" }}
          >
            <LuUserRound className="size-5" aria-hidden="true" />
          </TrackableLink>
          <Link
            href="/"
            aria-label={ui.home}
            prefetch={false}
            className="logo-pulse-trigger relative z-10 grid size-[76px] place-items-center rounded-full border border-black/10 bg-[#fffdf8] shadow-[0_8px_24px_rgba(22,18,15,0.14)] transition-colors duration-200 hover:border-primary dark:border-white/15 dark:bg-[#171717]"
          >
            <Image
              src={mainLogo}
              alt=""
              width={72}
              height={72}
              className="size-[72px] animate-logo-pulse-grow"
              priority
              fetchPriority="high"
              unoptimized
            />
          </Link>
          <button
            type="button"
            onClick={() => setIsMenuOpen((value) => !value)}
            aria-label={ui.menu}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            className="grid size-11 justify-self-end place-items-center rounded-full bg-ink text-white transition-colors duration-200 hover:bg-primary dark:bg-white dark:text-ink dark:hover:bg-primary dark:hover:text-white"
          >
            {isMenuOpen ? (
              <LuX className="size-5" aria-hidden="true" />
            ) : (
              <LuMenu className="size-5" aria-hidden="true" />
            )}
          </button>
        </div>

        <div className="hidden w-full grid-cols-[1fr_124px_1fr] items-center min-[1360px]:grid">
          <div className="flex min-w-0 items-center pr-7">
            <div className="flex shrink-0 items-center border-r border-black/10 pr-3 dark:border-white/10">
              <TrackableLink
                href={MEMBERS_PORTAL_URL}
                aria-label={labels.portalFull}
                title={labels.portalFull}
                className="flex h-11 items-center gap-2 rounded-full bg-ink px-3.5 text-sm font-bold text-white transition-colors duration-200 hover:bg-primary dark:bg-white dark:text-ink dark:hover:bg-primary dark:hover:text-white"
                gtmEvent="portal_click"
                gtmParams={{ placement: "navbar_desktop" }}
              >
                <LuUserRound className="size-4" aria-hidden="true" />
                <span>{labels.portal}</span>
              </TrackableLink>
            </div>
            <nav
              aria-label={ui.primaryFirst}
              className="ml-auto flex min-w-0 items-center gap-1"
            >
              {leftNavigationItems.map((item) => {
                const isActive = isNavigationItemActive(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`group relative whitespace-nowrap px-3 py-3 font-display text-[15px] font-semibold uppercase tracking-[0.07em] transition-colors duration-200 ${
                      isActive
                        ? "text-primary"
                        : "text-stone-600 hover:text-ink dark:text-stone-300 dark:hover:text-white"
                    }`}
                  >
                    {labels[item.labelKey]}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-3 bottom-1 h-0.5 rounded-full bg-primary transition-opacity duration-200 ${
                        isActive
                          ? "opacity-100"
                          : "opacity-0 group-hover:opacity-50"
                      }`}
                    />
                  </Link>
                );
              })}
            </nav>
          </div>

          <Link
            href="/"
            aria-label={ui.home}
            prefetch={false}
            className="logo-pulse-trigger relative z-10 grid size-[106px] justify-self-center place-items-center rounded-full border border-black/10 bg-[#fffdf8] shadow-[0_12px_34px_rgba(22,18,15,0.18)] transition-[width,height,border-color] duration-300 hover:border-primary min-[1360px]:group-data-[scrolled=true]:size-[92px] dark:border-white/15 dark:bg-[#171717]"
          >
            <Image
              src={mainLogo}
              alt=""
              width={100}
              height={100}
              className="size-[100px] animate-logo-pulse-grow transition-[width,height] duration-300 min-[1360px]:group-data-[scrolled=true]:size-[86px]"
              priority
              fetchPriority="high"
              unoptimized
            />
          </Link>

          <div className="flex min-w-0 items-center pl-7">
            <nav
              aria-label={ui.primarySecond}
              className="flex min-w-0 items-center gap-1"
            >
              {rightNavigationItems.map((item) => {
                const isActive = isNavigationItemActive(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`group relative whitespace-nowrap px-3 py-3 font-display text-[15px] font-semibold uppercase tracking-[0.07em] transition-colors duration-200 ${
                      isActive
                        ? "text-primary"
                        : "text-stone-600 hover:text-ink dark:text-stone-300 dark:hover:text-white"
                    }`}
                  >
                    {labels[item.labelKey]}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-3 bottom-1 h-0.5 rounded-full bg-primary transition-opacity duration-200 ${
                        isActive
                          ? "opacity-100"
                          : "opacity-0 group-hover:opacity-50"
                      }`}
                    />
                  </Link>
                );
              })}
            </nav>
            <div className="ml-auto flex shrink-0 items-center gap-2 border-l border-black/10 pl-3 dark:border-white/10">
              <LanguageMenu currentLocale={currentLocale} />
              <AppearanceMenu currentLocale={currentLocale} />
            </div>
          </div>
        </div>
      </div>

      <div
        id="mobile-navigation"
        className={`fixed inset-x-4 top-[104px] max-h-[calc(100dvh-120px)] overflow-y-auto rounded-[1.75rem] border border-black/10 bg-[#fffdf8] p-5 shadow-2xl transition-all duration-300 min-[1360px]:hidden dark:border-white/10 dark:bg-[#171717] ${
          isMenuOpen
            ? "visible translate-y-0 opacity-100"
            : "pointer-events-none invisible -translate-y-4 opacity-0"
        }`}
      >
        <nav aria-label={ui.mobileNavigation} className="grid gap-1">
          {navigationItems.map((item, index) => {
            const isActive = isNavigationItemActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-lg font-semibold transition-colors ${
                  isActive
                    ? "bg-primary text-white"
                    : "hover:bg-black/5 dark:hover:bg-white/8"
                }`}
              >
                <span>{labels[item.labelKey]}</span>
                <span className="font-display text-sm opacity-45">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </Link>
            );
          })}
        </nav>
        <TrackableLink
          href={MEMBERS_PORTAL_URL}
          onClick={() => setIsMenuOpen(false)}
          className="mt-4 flex min-h-12 items-center justify-center gap-2 rounded-xl bg-ink px-4 py-3 font-semibold text-white transition-colors duration-200 hover:bg-primary dark:bg-white dark:text-ink dark:hover:bg-primary dark:hover:text-white"
          gtmEvent="portal_click"
          gtmParams={{ placement: "navbar_mobile" }}
        >
          <LuUserRound className="size-5" aria-hidden="true" />
          <span>{labels.portalFull}</span>
        </TrackableLink>
        <div className="my-5 h-px bg-black/10 dark:bg-white/10" />
        <div>
          <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-stone-500 dark:text-stone-400">
            <LuGlobe className="size-4" aria-hidden="true" />
            <span>{ui.language}</span>
          </div>
          <LocaleLinks
            currentLocale={currentLocale}
            layout="grid"
            onSelect={() => setIsMenuOpen(false)}
          />
        </div>
        <div className="mt-5">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-stone-500 dark:text-stone-400">
            {ui.appearance}
          </p>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
