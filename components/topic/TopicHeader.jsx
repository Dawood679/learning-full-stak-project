import Link from "next/link"
import { ChevronRight } from "lucide-react"
import {
  Code2, Paintbrush, Braces, Layers, Triangle, Server, Globe,
  Table2, DatabaseZap, Leaf, Database, Wand2, GitBranch,
  Clock, ListTodo, Radio, Wifi, Video, Activity,
  Container, Cloud, GitMerge, Hexagon, Rocket,
} from "lucide-react"
import { CATEGORY_COLORS, CATEGORY_LABELS } from "@/lib/constants"
import { DifficultyBadge } from "@/components/learn/DifficultyBadge"

const ICON_MAP = {
  Code2, Paintbrush, Braces, Layers, Triangle, Server, Globe,
  Table2, DatabaseZap, Leaf, Database, Wand2, GitBranch,
  Clock, ListTodo, Radio, Wifi, Video, Activity,
  Container, Cloud, GitMerge, Hexagon, Rocket,
}

export function TopicHeader({ topic, questionCount }) {
  const colors = CATEGORY_COLORS[topic.category] || CATEGORY_COLORS.FRONTEND
  const Icon = ICON_MAP[topic.icon] || Code2

  return (
    <div className={`${colors.bg} dark:bg-transparent border-b border-slate-200 dark:border-slate-800`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400 mb-6">
          <Link href="/" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/learn" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
            Topics
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-slate-900 dark:text-white font-medium">{topic.title}</span>
        </nav>

        <div className="flex items-start gap-5">
          <div className={`w-14 h-14 rounded-2xl ${colors.iconBg} ${colors.icon} flex items-center justify-center flex-shrink-0`}>
            <Icon className="w-7 h-7" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className={`text-xs font-semibold uppercase tracking-wider ${colors.icon}`}>
                {CATEGORY_LABELS[topic.category]}
              </span>
              <span className="text-slate-300 dark:text-slate-600">·</span>
              <DifficultyBadge difficulty={topic.difficulty} />
              {questionCount > 0 && (
                <>
                  <span className="text-slate-300 dark:text-slate-600">·</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">{questionCount} questions</span>
                </>
              )}
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">
              {topic.title}
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
              {topic.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
