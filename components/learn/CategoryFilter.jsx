"use client"

import { CATEGORIES } from "@/data/categories"
import { CATEGORY_COLORS } from "@/lib/constants"
import { cn } from "@/lib/utils"

export function CategoryFilter({ selected, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onChange("ALL")}
        className={cn(
          "px-4 py-1.5 rounded-full text-sm font-medium transition-all",
          selected === "ALL"
            ? "bg-violet-600 text-white shadow-sm"
            : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:border-violet-300 dark:hover:border-violet-700"
        )}
      >
        All Topics
      </button>
      {CATEGORIES.map((cat) => {
        const colors = CATEGORY_COLORS[cat.id]
        const isActive = selected === cat.id
        return (
          <button
            key={cat.id}
            onClick={() => onChange(cat.id)}
            className={cn(
              "px-4 py-1.5 rounded-full text-sm font-medium transition-all border",
              isActive
                ? `${colors.badge} border-transparent shadow-sm`
                : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
            )}
          >
            {cat.label}
          </button>
        )
      })}
    </div>
  )
}
