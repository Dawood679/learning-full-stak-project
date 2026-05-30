import { BookOpenText, FlaskConical, TrendingUp } from "lucide-react"

const features = [
  {
    step: "01",
    icon: BookOpenText,
    title: "Read the Concept",
    description:
      "Every topic has a clear 2–3 paragraph explanation with real-world context, key concepts, and a working code example.",
    accent: "violet",
  },
  {
    step: "02",
    icon: FlaskConical,
    title: "Take the Quiz",
    description:
      "5–8 multiple-choice questions with instant feedback and detailed explanations so you learn from every answer.",
    accent: "indigo",
  },
  {
    step: "03",
    icon: TrendingUp,
    title: "Track Your Score",
    description:
      "Best scores are saved in your browser. See which topics you've mastered and which need more review.",
    accent: "cyan",
  },
]

const accentMap = {
  violet: {
    num:       "text-violet-500 dark:text-violet-400",
    iconBg:    "bg-violet-100 dark:bg-violet-500/15",
    icon:      "text-violet-600 dark:text-violet-400",
    border:    "border-violet-100 dark:border-violet-500/20",
    bar:       "from-violet-400 to-indigo-400",
    glow:      "hover:shadow-violet-100 dark:hover:shadow-violet-500/10",
    dot:       "bg-violet-500",
  },
  indigo: {
    num:       "text-indigo-500 dark:text-indigo-400",
    iconBg:    "bg-indigo-100 dark:bg-indigo-500/15",
    icon:      "text-indigo-600 dark:text-indigo-400",
    border:    "border-indigo-100 dark:border-indigo-500/20",
    bar:       "from-indigo-400 to-purple-400",
    glow:      "hover:shadow-indigo-100 dark:hover:shadow-indigo-500/10",
    dot:       "bg-indigo-500",
  },
  cyan: {
    num:       "text-cyan-500 dark:text-cyan-400",
    iconBg:    "bg-cyan-100 dark:bg-cyan-500/15",
    icon:      "text-cyan-600 dark:text-cyan-400",
    border:    "border-cyan-100 dark:border-cyan-500/20",
    bar:       "from-cyan-400 to-teal-400",
    glow:      "hover:shadow-cyan-100 dark:hover:shadow-cyan-500/10",
    dot:       "bg-cyan-500",
  },
}

export function FeaturesSection() {
  return (
    <section className="py-20 bg-slate-50 dark:bg-[#07070f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-violet-600 dark:text-violet-400 uppercase tracking-widest mb-3">
            How it works
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4">
            Three steps to mastery
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            Pick a topic, read the explanation, then take the quiz. It&apos;s that simple.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f) => {
            const a = accentMap[f.accent]
            const Icon = f.icon
            return (
              <div
                key={f.title}
                className={`group relative p-7 rounded-2xl bg-white dark:bg-slate-900/70 border ${a.border} shadow-sm hover:shadow-lg ${a.glow} transition-all duration-300 hover:-translate-y-1 overflow-hidden`}
              >
                {/* Animated gradient top bar — expands left→right on hover */}
                <div className={`absolute top-0 left-0 h-0.75 w-0 group-hover:w-full transition-all duration-500 ease-out bg-linear-to-r ${a.bar} rounded-b-full`} />

                {/* Subtle glow blob on hover */}
                <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full bg-linear-to-br ${a.bar} opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-500`} />

                {/* Step number */}
                <span className={`text-5xl font-black ${a.num} opacity-20 absolute top-5 right-6 select-none transition-opacity duration-300 group-hover:opacity-40`}>
                  {f.step}
                </span>

                {/* Pulsing dot */}
                <div className="relative w-12 h-12 mb-5 flex items-center justify-center">
                  <div className={`absolute inset-0 rounded-xl ${a.iconBg} ${a.icon} opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300`} />
                  <div className={`w-12 h-12 rounded-xl ${a.iconBg} ${a.icon} flex items-center justify-center`}>
                    <Icon className="w-6 h-6 relative z-10" />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {f.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {f.description}
                </p>
              </div>
            )
          })}
        </div>

        {/* Connector line between cards (desktop) */}
        <div className="hidden md:flex items-center justify-center mt-10 gap-2">
          {["Read", "Quiz", "Score"].map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <div className={`w-2 h-2 rounded-full ${["bg-violet-400","bg-indigo-400","bg-cyan-400"][i]}`} />
                <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">{label}</span>
              </div>
              {i < 2 && <div className="w-16 h-px bg-slate-200 dark:bg-slate-700 mx-1" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
