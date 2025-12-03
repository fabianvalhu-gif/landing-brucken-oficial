import { useMemo } from "react";
import { useLanguage } from "../context/LanguageContext";

const options = [
  { code: "es", label: "Español" },
  { code: "en", label: "English" },
  { code: "de", label: "Deutsch" },
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

  const labelColor =
    variant === "light" ? "text-neutral-600" : "text-white/80";

  return (
    <label className={`flex items-center gap-2 text-[13px] ${labelColor}`}>
      <span className="hidden sm:inline-flex items-center gap-1">
        <span aria-hidden>🌐</span>
        <span className="text-xs">Idioma</span>
      </span>
      <select
        value={language}
        disabled={!isReady}
        onChange={(event) => changeLanguage(event.target.value)}
        className={styles}
      >
        {options.map((option) => (
          <option key={option.code} value={option.code}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
