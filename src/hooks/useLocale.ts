// src/hooks/useLocale.ts
import pt from "@/locales/pt";
import en from "@/locales/en";
import { useLocation } from "react-router-dom";

const locales = { pt, en };
type Locale = keyof typeof locales;

export function useLocale() {
    const { pathname } = useLocation();
    const lang = pathname.startsWith("/en") ? "en" : "pt";
    return { t: locales[lang as Locale], lang: lang as Locale };
}
