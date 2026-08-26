"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { copy, type Lang } from "@/content/copy";

type LangContextType = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (typeof copy)[Lang];
};

const LangContext = createContext<LangContextType | null>(null);

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem("lang");
    if (stored === "es" || stored === "en") {
      setLangState(stored);
    } else if (navigator.language.toLowerCase().startsWith("es")) {
      setLangState("es");
    }
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    window.localStorage.setItem("lang", l);
  };

  return (
    <LangContext.Provider value={{ lang, setLang, t: copy[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
}
