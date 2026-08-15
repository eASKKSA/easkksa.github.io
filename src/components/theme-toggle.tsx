"use client";
import { type Locale, useLocale } from "next-intl";
import { useTheme } from "next-themes";
import { CiDark, CiLight, CiMonitor } from "react-icons/ci";

const themeLabels: Record<
  Locale,
  { group: string; light: string; system: string; dark: string }
> = {
  "pt-PT": {
    group: "Escolher aparência",
    light: "Modo claro",
    system: "Usar preferência do sistema",
    dark: "Modo escuro",
  },
  en: {
    group: "Choose appearance",
    light: "Light mode",
    system: "Use system preference",
    dark: "Dark mode",
  },
  fr: {
    group: "Choisir l’apparence",
    light: "Mode clair",
    system: "Utiliser le réglage du système",
    dark: "Mode sombre",
  },
  ja: {
    group: "表示モードを選ぶ",
    light: "ライトモード",
    system: "システム設定を使用",
    dark: "ダークモード",
  },
};

const themeOptions = [
  { key: "light" as const, icon: <CiLight /> },
  { key: "system" as const, icon: <CiMonitor /> },
  { key: "dark" as const, icon: <CiDark /> },
];

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const locale = useLocale();
  const labels = themeLabels[locale];
  const activeTheme = themeOptions.some((option) => option.key === theme)
    ? theme
    : "system";
  const selectedIdx = themeOptions.findIndex(
    (option) => option.key === activeTheme,
  );

  return (
    <div
      className="relative grid h-12 w-36 grid-cols-3 items-center rounded-full border border-gray-200 bg-white transition-colors select-none dark:border-gray-700 dark:bg-[#222]"
      role="radiogroup"
      aria-label={labels.group}
    >
      {/* Animated thumb */}
      <span
        className="absolute inset-y-1 left-0 w-1/3 rounded-full bg-primary shadow-[0_2px_8px_rgba(164,38,44,0.15)] transition-transform duration-300"
        style={{
          transform: `translateX(${selectedIdx * 100}%)`,
          zIndex: 1,
        }}
        aria-hidden="true"
      />
      {themeOptions.map((option) => (
        <label
          key={option.key}
          className={`relative z-10 flex h-12 cursor-pointer items-center justify-center rounded-full border-0 text-2xl transition-colors focus-within:ring-2 focus-within:ring-gold focus-within:ring-offset-2 ${
            activeTheme === option.key
              ? "text-white"
              : "text-gray-500 hover:text-primary dark:text-gray-300 dark:hover:text-white"
          }`}
        >
          <input
            type="radio"
            name="theme"
            value={option.key}
            checked={activeTheme === option.key}
            onChange={() => setTheme(option.key)}
            className="sr-only"
            aria-label={labels[option.key]}
          />
          {option.icon}
        </label>
      ))}
    </div>
  );
};

export default ThemeToggle;
