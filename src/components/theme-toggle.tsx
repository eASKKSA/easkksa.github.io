"use client";
import { useTheme } from "next-themes";
import { CiDark, CiLight, CiMonitor } from "react-icons/ci";

const themeOptions = [
  { key: "light" as const, icon: <CiLight />, aria: "Light mode" },
  { key: "system" as const, icon: <CiMonitor />, aria: "System default" },
  { key: "dark" as const, icon: <CiDark />, aria: "Dark mode" },
];

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const selectedIdx = themeOptions.findIndex((opt) => opt.key === theme);

  if (selectedIdx === -1) {
    console.warn(`Theme "${theme}" not found in options, defaulting to light.`);
    setTheme("light");
    return null; // or return a default state
  }
  return (
    <div
      className={`relative w-36 h-10 flex items-center rounded-full border transition-colors select-none dark:bg-[#222] dark:border-gray-700 bg-white border-gray-200`}
      role="radiogroup"
      aria-label="Theme selection"
      tabIndex={0}
    >
      {/* Animated thumb */}
      <span
        className="absolute top-1 left-1 w-10 h-8 rounded-full transition-transform duration-300"
        style={{
          background: "#a4262c",
          transform: `translateX(${selectedIdx * 47}px)`,
          boxShadow: "0 2px 8px 0 rgba(164,38,44,0.15)",
          zIndex: 1,
        }}
        aria-hidden="true"
      />
      {themeOptions.map((option) => (
        <label
          key={option.key}
          className={`relative z-10 flex-1 flex items-center justify-center h-12 text-2xl
    transition-colors rounded-full cursor-pointer border-0
    ${
      theme === option.key
        ? "text-white"
        : "dark:text-gray-300 dark:hover:text-white text-gray-500 hover:text-primary"
    }
  `}
        >
          <input
            type="radio"
            name="theme"
            value={option.key}
            checked={theme === option.key}
            onChange={() => setTheme(option.key)}
            className="sr-only"
            aria-label={option.aria}
          />
          {option.icon}
        </label>
      ))}
    </div>
  );
};

export default ThemeToggle;
