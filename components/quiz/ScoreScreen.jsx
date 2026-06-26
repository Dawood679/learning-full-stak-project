"use client"

import Link from "next/link"
import { Trophy, RotateCcw, ArrowLeft, CheckCircle2, XCircle } from "lucide-react"
import { useT } from "@/lib/i18n/LanguageContext"

export function ScoreScreen({ score, total, percentage, slug, answers, questions, onRetry }) {
  const t = useT()

  function getScoreMessage(pct) {
    if (pct >= 90) return { title: t("scoreOutstanding"), sub: t("scoreMastered"), color: "text-emerald-600 dark:text-emerald-400" }
    if (pct >= 70) return { title: t("scoreGreat"),       sub: t("scoreSolid"),    color: "text-blue-600 dark:text-blue-400" }
    if (pct >= 50) return { title: t("scoreGood"),        sub: t("scoreReview"),   color: "text-amber-600 dark:text-amber-400" }
    return           { title: t("scoreKeepPracticing"), sub: t("scoreRetry"),    color: "text-rose-600 dark:text-rose-400" }
  }

  const message = getScoreMessage(percentage)

  return (
    <div className="flex flex-col items-center text-center animate-fade-in">
      {/* Trophy */}
      <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 ${percentage >= 70
        ? "bg-emerald-50 dark:bg-emerald-900/30"
        : "bg-amber-50 dark:bg-amber-900/30"
        }`}>
        <Trophy className={`w-10 h-10 ${percentage >= 70 ? "text-emerald-500" : "text-amber-500"}`} />
      </div>

      {/* Score */}
      <div className={`text-6xl font-black mb-1 ${message.color}`}>
        {percentage}%
      </div>
      <div className="text-slate-500 dark:text-slate-400 text-lg mb-2">
        {score} / {total} {t("scoreCorrect")}
      </div>
      <h2 className={`text-2xl font-bold mb-1 ${message.color}`}>{message.title}</h2>
      <p className="text-slate-500 dark:text-slate-400 mb-8">{message.sub}</p>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 mb-10 w-full max-w-sm">
        <button
          onClick={onRetry}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-full border-2 border-violet-200 dark:border-violet-800 text-violet-700 dark:text-violet-300 font-semibold hover:bg-violet-50 dark:hover:bg-violet-900/20 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          {t("quizTryAgain")}
        </button>
        <Link
          href={`/learn/${slug}`}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-linear-to-r from-violet-600 to-indigo-600 text-white font-semibold hover:opacity-90 transition-opacity"
        >
          <ArrowLeft className="w-4 h-4" />
          {t("quizBackToTopic")}
        </Link>
      </div>

      {/* Answer review */}
      <div className="w-full max-w-2xl text-left space-y-3">
        <h3 className="font-bold text-slate-900 dark:text-white text-sm uppercase tracking-wider mb-4">
          {t("quizAnswerReview")}
        </h3>
        {questions.map((q, i) => {
          const isCorrect = answers[i] === q.correctAnswer
          return (
            <div
              key={q.id}
              className={`flex items-start gap-3 p-4 rounded-xl border ${isCorrect
                ? "border-emerald-200 dark:border-emerald-800/40 bg-emerald-50 dark:bg-emerald-900/10"
                : "border-red-200 dark:border-red-800/40 bg-red-50 dark:bg-red-900/10"
                }`}
            >
              {isCorrect ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              )}
              <div>
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200 mb-1">
                  {q.questionText}
                </p>
                {!isCorrect && (
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {t("quizCorrectAnswer")}: <span className="font-semibold text-emerald-600 dark:text-emerald-400">{q.options[q.correctAnswer]}</span>
                  </p>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
