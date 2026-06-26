"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { translations } from "./translations"

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState("en")

  useEffect(() => {
    const saved = localStorage.getItem("devonix-lang")
    if (saved === "en" || saved === "hi") setLangState(saved)
  }, [])

  function setLang(newLang) {
    setLangState(newLang)
    localStorage.setItem("devonix-lang", newLang)
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider")
  return ctx
}

export function useT() {
  const { lang } = useLanguage()
  return (key) => translations[lang]?.[key] ?? translations.en[key] ?? key
}
