"use client"

import { Lightbulb } from "lucide-react"
import { useT } from "@/lib/i18n/LanguageContext"

export function ExplanationPanel({ explanation, isCorrect }) {
  const t = useT()
  return (
    <div className={`rounded-xl p-5 border ${isCorrect
      ? "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800/40"
      : "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800/40"
      }`}>
      <div className="flex items-start gap-3">
        <Lightbulb className={`w-5 h-5 flex-shrink-0 mt-0.5 ${isCorrect ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400"}`} />
        <div>
          <p className={`text-sm font-semibold mb-1 ${isCorrect ? "text-emerald-800 dark:text-emerald-200" : "text-amber-800 dark:text-amber-200"}`}>
            {isCorrect ? t("quizCorrect") : t("quizWrong")}
          </p>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {explanation}
          </p>
        </div>
      </div>
    </div>
  )
}
