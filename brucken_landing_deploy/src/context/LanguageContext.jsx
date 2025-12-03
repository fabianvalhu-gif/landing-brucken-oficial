import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const LanguageContext = createContext({
  language: "es",
  changeLanguage: () => {},
  isReady: false,
});

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("es");
  const [isReady, setIsReady] = useState(false);

  const applyLanguage = useCallback((value) => {
    const target = value || "es";
    const combo = document.querySelector(".goog-te-combo");

    if (combo) {
      combo.value = target;
      combo.dispatchEvent(new Event("change"));
    } else {
      // Si aún no existe el combo (widget tarda), reintenta unas veces.
      let attempts = 0;
      const interval = setInterval(() => {
        const retryCombo = document.querySelector(".goog-te-combo");
        if (retryCombo) {
          retryCombo.value = target;
          retryCombo.dispatchEvent(new Event("change"));
          clearInterval(interval);
        } else if (attempts > 20) {
          clearInterval(interval);
        }
        attempts += 1;
      }, 300);
    }

    document.documentElement.setAttribute("lang", target);

    try {
      localStorage.setItem("preferredLanguage", target);
    } catch (error) {
      console.warn("No se pudo guardar el idioma preferido:", error);
    }

    setLanguage(target);
  }, []);

  const initializeGoogleTranslate = useCallback(() => {
    if (window.google?.translate && !window._bruckenTranslateElement) {
      window._bruckenTranslateElement = new window.google.translate.TranslateElement(
        {
          pageLanguage: "es",
          includedLanguages: "es,en,de",
          autoDisplay: false,
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        "google_translate_element"
      );
    }

    setIsReady(true);

    // Aplica el idioma almacenado una vez que el widget esté listo
    setTimeout(() => applyLanguage(language), 300);
  }, [applyLanguage, language]);

  useEffect(() => {
    const saved = localStorage.getItem("preferredLanguage");
    if (saved) {
      setLanguage(saved);
      document.documentElement.setAttribute("lang", saved);
    }
  }, []);

  useEffect(() => {
    window.googleTranslateElementInit = initializeGoogleTranslate;

    const existingScript = document.getElementById("google-translate-script");
    if (!existingScript) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    } else if (window.google?.translate) {
      initializeGoogleTranslate();
    } else {
      existingScript.addEventListener("load", initializeGoogleTranslate);
    }

    return () => {
      if (existingScript) {
        existingScript.removeEventListener("load", initializeGoogleTranslate);
      }
    };
  }, [initializeGoogleTranslate]);

  const value = useMemo(
    () => ({
      language,
      isReady,
      changeLanguage: applyLanguage,
    }),
    [applyLanguage, isReady, language]
  );

  return (
    <LanguageContext.Provider value={value}>
      <div id="google_translate_element" className="hidden" aria-hidden="true" />
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
