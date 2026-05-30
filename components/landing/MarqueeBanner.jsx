const ROW_ONE = [
  { name: "HTML5",      color: "text-orange-500",  dot: "bg-orange-400" },
  { name: "CSS3",       color: "text-blue-500",    dot: "bg-blue-400" },
  { name: "JavaScript", color: "text-yellow-600",  dot: "bg-yellow-400" },
  { name: "React",      color: "text-cyan-600",    dot: "bg-cyan-400" },
  { name: "Next.js",    color: "text-slate-600",   dot: "bg-slate-400" },
  { name: "Node.js",    color: "text-green-600",   dot: "bg-green-500" },
  { name: "Express",    color: "text-slate-500",   dot: "bg-slate-400" },
  { name: "MongoDB",    color: "text-emerald-600", dot: "bg-emerald-500" },
  { name: "PostgreSQL", color: "text-indigo-600",  dot: "bg-indigo-500" },
  { name: "Prisma",     color: "text-violet-600",  dot: "bg-violet-500" },
  { name: "Mongoose",   color: "text-red-600",     dot: "bg-red-400" },
  { name: "SQL",        color: "text-amber-600",   dot: "bg-amber-500" },
]

const ROW_TWO = [
  { name: "Docker",      color: "text-blue-600",   dot: "bg-blue-500" },
  { name: "Kubernetes",  color: "text-blue-700",   dot: "bg-blue-600" },
  { name: "AWS EC2",     color: "text-orange-600", dot: "bg-orange-500" },
  { name: "Jenkins",     color: "text-red-600",    dot: "bg-red-500" },
  { name: "WebSockets",  color: "text-purple-600", dot: "bg-purple-500" },
  { name: "WebRTC",      color: "text-teal-600",   dot: "bg-teal-500" },
  { name: "BullMQ",      color: "text-rose-600",   dot: "bg-rose-500" },
  { name: "Pub/Sub",     color: "text-pink-600",   dot: "bg-pink-500" },
  { name: "Cron Jobs",   color: "text-lime-700",   dot: "bg-lime-500" },
  { name: "DevOps",      color: "text-violet-700", dot: "bg-violet-600" },
  { name: "Process Mgmt",color: "text-cyan-700",   dot: "bg-cyan-600" },
  { name: "NoSQL",       color: "text-emerald-700",dot: "bg-emerald-600" },
]

function MarqueeRow({ items, reverse = false }) {
  // Duplicate for seamless loop
  const doubled = [...items, ...items]

  return (
    <div className="overflow-hidden">
      <div
        className={`flex gap-3 w-max ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}
      >
        {doubled.map((item, i) => (
          <div
            key={`${item.name}-${i}`}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-slate-200/70 dark:border-slate-700/60 bg-white dark:bg-slate-900/70 shadow-sm shrink-0"
          >
            <span className={`w-2 h-2 rounded-full shrink-0 ${item.dot}`} />
            <span className={`text-sm font-semibold ${item.color} dark:brightness-125`}>
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function MarqueeBanner() {
  return (
    <section className="py-10 bg-slate-50/80 dark:bg-[#07070f] border-y border-slate-100 dark:border-slate-800/60 overflow-hidden">
      {/* Fade masks on left / right */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-linear-to-r from-slate-50 dark:from-[#07070f] to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-linear-to-l from-slate-50 dark:from-[#07070f] to-transparent pointer-events-none" />

        <div className="space-y-3">
          <MarqueeRow items={ROW_ONE} reverse={false} />
          <MarqueeRow items={ROW_TWO} reverse={true} />
        </div>
      </div>
    </section>
  )
}
