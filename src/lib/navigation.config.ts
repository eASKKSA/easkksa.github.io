// lib/navigation.config.ts

export type Locale = "pt" | "en";

// Route map for all navigation items
export const routeMap = {
  news: { pt: "/pt/noticias", en: "/en/news" },
  about: { pt: "/pt/quem-somos", en: "/en/about" },
  dojo: { pt: "/pt/dojo", en: "/en/dojo" },
  history: { pt: "/pt/historia", en: "/en/history" },
  philosophy: { pt: "/pt/filosofia", en: "/en/philosophy" },
  shotokan: { pt: "/pt/shotokan-ski", en: "/en/shotokan-ski" },
  home: { pt: "/pt", en: "/en" }, // Add home route for the logo link
};

export interface NavigationItem {
  id: keyof typeof routeMap;
  label: Record<Locale, string>;
}

export const navigationItems: NavigationItem[] = [
  { id: "news", label: { pt: "Notícias", en: "News" } },
  { id: "about", label: { pt: "Quem Somos", en: "About" } },
  { id: "dojo", label: { pt: "No Dojo", en: "Dojo" } },
  { id: "history", label: { pt: "História", en: "History" } },
  { id: "philosophy", label: { pt: "Filosofia", en: "Philosophy" } },
  { id: "shotokan", label: { pt: "Shotokan SKI", en: "Shotokan SKI" } },
];
