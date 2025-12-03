import { useMemo } from "react";
import { useLanguage } from "../context/LanguageContext";

const options = [
  { code: "es", label: "🇪🇸" },
  { code: "en", label: "🇺🇸" },
  { code: "de", label: "🇩🇪" },
];

export default function LanguageSwitcher({ variant = "dark" }) {
  const { language, changeLanguage, isReady } = useLanguage();

  const styles = useMemo(() => {
    const base =
      "text-xs font-semibold rounded-full border focus:outline-none focus:ring-2 focus:ring-electric transition-all";

    if (variant === "light") {
      return `${base} bg-white text-petrol border-white/40 hover:border-electric/60 px-3 py-2 shadow-soft`;
    }

    return `${base} bg-white/10 text-white border-white/20 hover:border-electric/60 px-3 py-2`;
  }, [variant]);

  return (
    <div className="flex items-center">
      <select
        value={language}
        disabled={!isReady}
        onChange={(event) => changeLanguage(event.target.value)}
        className={`${styles} min-w-[64px] text-center`}
        aria-label="Seleccionar idioma"
      >
        {options.map((option) => (
          <option key={option.code} value={option.code}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
