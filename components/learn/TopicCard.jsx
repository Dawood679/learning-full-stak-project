"use client"

import Link from "next/link"
import { ArrowRight, CheckCircle2, HelpCircle } from "lucide-react"
import {
  Code2, Paintbrush, Braces, Layers, Triangle, Server, Globe,
  Table2, DatabaseZap, Leaf, Database, Wand2, GitBranch,
  Clock, ListTodo, Radio, Wifi, Video, Activity,
  Container, Cloud, GitMerge, Hexagon, Rocket, Monitor,
} from "lucide-react"
import { CATEGORY_COLORS, CATEGORY_LABELS } from "@/lib/constants"
import { DifficultyBadge } from "./DifficultyBadge"
import { useEffect, useState } from "react"
import { getTopicScore } from "@/lib/quiz-storage"

const ICON_MAP = {
  Code2, Paintbrush, Braces, Layers, Triangle, Server, Globe,
  Table2, DatabaseZap, Leaf, Database, Wand2, GitBranch,
  Clock, ListTodo, Radio, Wifi, Video, Activity,
  Container, Cloud, GitMerge, Hexagon, Rocket, Monitor,
}

export function TopicCard({ topic }) {
  const colors = CATEGORY_COLORS[topic.category] || CATEGORY_COLORS.FRONTEND
  const Icon = ICON_MAP[topic.icon] || Code2
  const questionCount = topic._count?.questions ?? 0
  const [score, setScore] = useState(null)

  useEffect(() => {
    const saved = getTopicScore(topic.slug)
    setScore(saved)
  }, [topic.slug])

  return (
    <Link href={`/learn/${topic.slug}`} className="group block">
      <div className={`relative h-full p-5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 overflow-hidden`}>
        {/* Category color accent */}
        <div className={`absolute top-0 left-0 right-0 h-1 ${colors.gradient}`} />

        {/* Completed badge */}
        {score && (
          <div className="absolute top-4 right-4 flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="w-4 h-4" />
            <span className="text-xs font-bold">{score.percentage}%</span>
          </div>
        )}

        {/* Icon */}
        <div className={`w-10 h-10 rounded-xl ${colors.iconBg} ${colors.icon} flex items-center justify-center mb-4`}>
          <Icon className="w-5 h-5" />
        </div>

        {/* Content */}
        <h3 className="font-bold text-slate-900 dark:text-white mb-1.5 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
          {topic.title}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2 mb-4">
          {topic.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <DifficultyBadge difficulty={topic.difficulty} />
            {questionCount > 0 && (
              <span className="flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500">
                <HelpCircle className="w-3 h-3" />
                {questionCount}q
              </span>
            )}
          </div>
          <ArrowRight className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover:text-violet-500 group-hover:translate-x-0.5 transition-all" />
        </div>
      </div>
    </Link>
  )
}
