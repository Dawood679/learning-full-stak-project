import { BookOpen, HelpCircle, LayoutGrid, Trophy } from "lucide-react"

const stats = [
  {
    value: "24",
    label: "Topics Covered",
    description: "HTML to Kubernetes",
    icon: BookOpen,
    color: "text-violet-600 dark:text-violet-400",
    bg: "bg-violet-100 dark:bg-violet-500/15",
    glow: "shadow-violet-100 dark:shadow-violet-500/10",
  },
  {
    value: "170+",
    label: "Quiz Questions",
    description: "Test your knowledge",
    icon: HelpCircle,
    color: "text-indigo-600 dark:text-indigo-400",
    bg: "bg-indigo-100 dark:bg-indigo-500/15",
    glow: "shadow-indigo-100 dark:shadow-indigo-500/10",
  },
  {
    value: "6",
    label: "Categories",
    description: "Frontend to DevOps",
    icon: LayoutGrid,
    color: "text-cyan-600 dark:text-cyan-400",
    bg: "bg-cyan-100 dark:bg-cyan-500/15",
    glow: "shadow-cyan-100 dark:shadow-cyan-500/10",
  },
  {
    value: "Free",
    label: "Always Free",
    description: "No signup required",
    icon: Trophy,
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-100 dark:bg-emerald-500/15",
    glow: "shadow-emerald-100 dark:shadow-emerald-500/10",
  },
]

export function StatsSection() {
  return (
    <section className="py-14 bg-white dark:bg-slate-950 border-y border-slate-100 dark:border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.label}
                className={`flex flex-col items-center text-center p-6 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm hover:shadow-md transition-shadow`}
              >
                <div className={`w-11 h-11 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center mb-3`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className={`text-3xl font-black ${stat.color} mb-0.5`}>
                  {stat.value}
                </div>
                <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">
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
