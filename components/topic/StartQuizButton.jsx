"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Brain, ArrowRight, Loader2 } from "lucide-react"
import { getTopicScore } from "@/lib/quiz-storage"

export function StartQuizButton({ slug, questionCount }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const score = typeof window !== "undefined" ? getTopicScore(slug) : null

  function handleStart() {
    setLoading(true)
    router.push(`/learn/${slug}/quiz`)
  }

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
      <button
        onClick={handleStart}
        disabled={loading}
        className="flex items-center gap-2 px-8 py-4 rounded-full bg-linear-to-r from-violet-600 to-indigo-600 text-white font-semibold text-base hover:opacity-90 disabled:opacity-60 transition-all shadow-lg shadow-violet-500/20 hover:shadow-violet-500/30 hover:-translate-y-0.5 disabled:translate-y-0"
      >
        {loading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <Brain className="w-5 h-5" />
        )}
        {loading ? "Loading quiz..." : `Start Quiz (${questionCount} questions)`}
        {!loading && <ArrowRight className="w-4 h-4" />}
      </button>
      {score && (
        <span className="text-sm text-slate-500 dark:text-slate-400">
          Best score: <span className="font-bold text-emerald-600 dark:text-emerald-400">{score.percentage}%</span>
          {" "}({score.score}/{score.total})
        </span>
      )}
    </div>
  )
}
