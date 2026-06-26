"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"

const TABS = [
  { key: "mern",      label: "MERN Stack",       color: "blue"   },
  { key: "fullstack", label: "Full Stack",        color: "violet" },
  { key: "advanced",  label: "Advanced Backend",  color: "amber"  },
  { key: "internee",  label: "Internee",          color: "orange" },
]

const ACTIVE_COLORS = {
  blue:   "border-blue-500 text-blue-600 dark:text-blue-400",
  violet: "border-violet-500 text-violet-600 dark:text-violet-400",
  amber:  "border-amber-500 text-amber-600 dark:text-amber-400",
  orange: "border-orange-500 text-orange-600 dark:text-orange-400",
}

export default function TrackTabNav() {
  const searchParams = useSearchParams()
  const activeTrack = searchParams.get("track") ?? "mern"

  return (
    <div className="flex gap-1 border-b border-slate-200 dark:border-slate-800 mb-8 overflow-x-auto">
      {TABS.map((tab) => {
        const isActive = activeTrack === tab.key
        return (
          <Link
            key={tab.key}
            href={`/schedule?track=${tab.key}`}
            className={`shrink-0 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              isActive
                ? `${ACTIVE_COLORS[tab.color]} bg-transparent`
                : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
            }`}
          >
            {tab.label}
          </Link>
        )
      })}
    </div>
  )
}
