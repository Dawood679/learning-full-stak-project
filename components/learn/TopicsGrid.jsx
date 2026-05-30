"use client"

import { useMemo, useState } from "react"
import { CATEGORIES } from "@/data/categories"
import { CATEGORY_LABELS } from "@/lib/constants"
import { CategoryFilter } from "./CategoryFilter"
import { SearchBar } from "./SearchBar"
import { TopicCard } from "./TopicCard"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

function GridInner({ topics }) {
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get("category") || "ALL"

  const [selectedCategory, setSelectedCategory] = useState(initialCategory)
  const [searchQuery, setSearchQuery] = useState("")

  const filtered = useMemo(() => {
    let result = [...topics]

    if (selectedCategory !== "ALL") {
      result = result.filter((t) => t.category === selectedCategory)
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q)
      )
    }

    return result
  }, [topics, selectedCategory, searchQuery])

  // Group by category
  const grouped = useMemo(() => {
    const groups = {}
    for (const topic of filtered) {
      if (!groups[topic.category]) groups[topic.category] = []
      groups[topic.category].push(topic)
    }
    return groups
  }, [filtered])

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>
        <div className="overflow-x-auto">
          <CategoryFilter selected={selectedCategory} onChange={setSelectedCategory} />
        </div>
      </div>

      {/* Results count */}
      <div className="mb-6 text-sm text-slate-500 dark:text-slate-400">
        Showing <span className="font-semibold text-slate-900 dark:text-slate-100">{filtered.length}</span> topics
        {selectedCategory !== "ALL" && (
          <> in <span className="font-semibold text-slate-900 dark:text-slate-100">{CATEGORY_LABELS[selectedCategory]}</span></>
        )}
        {searchQuery && (
          <> matching &quot;<span className="font-semibold">{searchQuery}</span>&quot;</>
        )}
      </div>

      {/* No results */}
      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-slate-500 dark:text-slate-400 text-lg">No topics found</p>
          <button
            onClick={() => { setSearchQuery(""); setSelectedCategory("ALL") }}
            className="mt-4 text-violet-600 dark:text-violet-400 text-sm hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Grouped grid */}
      {Object.entries(grouped).map(([category, categoryTopics]) => (
        <div key={category} className="mb-12">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-5 flex items-center gap-3">
            <span>{CATEGORY_LABELS[category] || category}</span>
            <span className="flex-1 h-px bg-slate-100 dark:bg-slate-800" />
            <span>{categoryTopics.length} topics</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categoryTopics.map((topic) => (
              <TopicCard key={topic.id} topic={topic} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export function TopicsGrid({ topics }) {
  return (
    <Suspense fallback={<div className="text-center py-12 text-slate-400">Loading topics...</div>}>
      <GridInner topics={topics} />
    </Suspense>
  )
}
