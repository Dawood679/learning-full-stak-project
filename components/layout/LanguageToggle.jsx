"use client"

import { useLanguage } from "@/lib/i18n/LanguageContext"

export function LanguageToggle() {
  const { lang, setLang } = useLanguage()

  return (
    <div className="flex items-center gap-0.5 rounded-lg border border-slate-200 dark:border-slate-700 p-0.5 bg-slate-50 dark:bg-slate-800/50">
      <button
        onClick={() => setLang("en")}
        className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors ${
          lang === "en"
            ? "bg-violet-600 text-white shadow-sm"
            : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLang("hi")}
        className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors ${
          lang === "hi"
            ? "bg-violet-600 text-white shadow-sm"
            : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
        }`}
      >
        HI
      </button>
    </div>
  )
}
