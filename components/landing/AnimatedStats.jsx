"use client"

import { useEffect, useRef, useState } from "react"
import { BookOpen, HelpCircle, LayoutGrid, Trophy } from "lucide-react"

const stats = [
  {
    raw: 24,
    display: "24",
    label: "Topics Covered",
    description: "HTML to Kubernetes",
    icon: BookOpen,
    color: "text-violet-600 dark:text-violet-400",
    bg: "bg-violet-100 dark:bg-violet-500/15",
    bar: "from-violet-400 to-violet-600",
  },
  {
    raw: 170,
    display: "170+",
    label: "Quiz Questions",
    description: "Test your knowledge",
    icon: HelpCircle,
    color: "text-indigo-600 dark:text-indigo-400",
    bg: "bg-indigo-100 dark:bg-indigo-500/15",
    bar: "from-indigo-400 to-indigo-600",
  },
  {
    raw: 6,
    display: "6",
    label: "Categories",
    description: "Frontend to DevOps",
    icon: LayoutGrid,
    color: "text-cyan-600 dark:text-cyan-400",
    bg: "bg-cyan-100 dark:bg-cyan-500/15",
    bar: "from-cyan-400 to-cyan-600",
  },
  {
    raw: null,
    display: "Free",
    label: "Always Free",
    description: "No signup required",
    icon: Trophy,
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-100 dark:bg-emerald-500/15",
    bar: "from-emerald-400 to-emerald-600",
  },
]

function Counter({ raw, display, color }) {
  const [value, setValue] = useState(raw === null ? display : "0")
  const [done, setDone]   = useState(false)
  const ref               = useRef(null)
  const ranRef            = useRef(false)

  useEffect(() => {
    if (raw === null) return  // "Free" — no animation

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !ranRef.current) {
          ranRef.current = true
          const DURATION = 1400
          const hasPlus  = display.includes("+")
          const start    = performance.now()

          function tick(now) {
            const t        = Math.min((now - start) / DURATION, 1)
            const eased    = 1 - Math.pow(1 - t, 3)      // ease-out cubic
            const current  = Math.floor(eased * raw)
            setValue(current + (hasPlus && t === 1 ? "+" : ""))
            if (t < 1) {
              requestAnimationFrame(tick)
            } else {
              setValue(display)
              setDone(true)
            }
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.6 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [raw, display])

  return (
    <span ref={ref} className={`text-3xl font-black tabular-nums ${color}`}>
      {value}
    </span>
  )
}

export function AnimatedStats() {
  return (
    <section className="py-14 bg-white dark:bg-slate-950 border-y border-slate-100 dark:border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.label}
                className="group flex flex-col items-center text-center p-6 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden relative"
              >
                {/* Subtle gradient bar at bottom, reveals on hover */}
                <div className={`absolute bottom-0 left-0 right-0 h-0.75 bg-linear-to-r ${stat.bar} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                {/* Icon */}
                <div className={`w-11 h-11 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200`}>
                  <Icon className="w-5 h-5" />
                </div>

                {/* Animated number */}
                <Counter raw={stat.raw} display={stat.display} color={stat.color} />

                <div className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
                  {stat.label}
                </div>
                <div className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                  {stat.description}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
