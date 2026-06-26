"use client"

import Link from "next/link"
import { ArrowRight, BookOpen, Sparkles, CheckCircle2, Flame, Star } from "lucide-react"
import { useT } from "@/lib/i18n/LanguageContext"

export function HeroSection() {
  const t = useT()
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden">

      {/* ── Backgrounds ── */}
      <div className="absolute inset-0 bg-slate-50 dark:bg-[#07070f]" />
      {/* Dot grid */}
      <div className="absolute inset-0 dot-pattern opacity-70 dark:opacity-30" />
      {/* Animated blobs */}
      <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-violet-400/25 dark:bg-violet-600/15 blur-[100px] animate-blob" />
      <div className="absolute top-[20%] right-[-5%] w-[450px] h-[450px] rounded-full bg-indigo-400/20 dark:bg-indigo-600/15 blur-[100px] animate-blob animation-delay-2000" />
      <div className="absolute bottom-[-10%] left-[30%] w-[400px] h-[400px] rounded-full bg-cyan-400/20 dark:bg-cyan-600/10 blur-[100px] animate-blob animation-delay-4000" />

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-28">
        <div className="flex flex-col items-center text-center">

          {/* ── Badge ── */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-100 dark:bg-violet-500/15 text-violet-700 dark:text-violet-300 text-sm font-semibold mb-8 border border-violet-200 dark:border-violet-500/30 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            {t("heroBadge")}
          </div>

          {/* ── Headline ── */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight text-slate-900 dark:text-white mb-6 leading-[1.08] max-w-4xl">
            {t("heroHeadlinePre")}{" "}
            <span className="gradient-text">{t("heroHeadlineHighlight")}</span>
            {" "}{t("heroHeadlinePost")}
          </h1>

          {/* ── Subheadline ── */}
          <p className="text-lg sm:text-xl text-slate-500 dark:text-slate-400 mb-10 leading-relaxed max-w-2xl">
            {t("heroSub")}
          </p>

          {/* ── CTA Buttons ── */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-16">
            <Link
              href="/learn"
              className="group flex items-center gap-2.5 px-8 py-4 rounded-full bg-violet-600 hover:bg-violet-700 text-white font-semibold text-base transition-all shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 hover:-translate-y-0.5"
            >
              <BookOpen className="w-5 h-5" />
              {t("heroStart")}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <a
              href="#topics"
              className="flex items-center gap-2 px-8 py-4 rounded-full bg-white dark:bg-white/5 text-slate-700 dark:text-slate-200 font-semibold text-base border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/10 transition-all"
            >
              {t("heroBrowse")}
            </a>
          </div>

          {/* ── Glass showcase card with floating badges ── */}
          <div className="w-full max-w-3xl mx-auto relative">

            {/* Floating badge — top left */}
            <div className="absolute -top-5 -left-4 z-10 hidden md:block animate-float">
              <div className="glass rounded-2xl px-4 py-3 shadow-xl shadow-violet-100/50 dark:shadow-violet-900/20">
                <div className="flex items-center gap-2.5">
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-white dark:border-slate-900" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-bold text-slate-900 dark:text-white leading-tight">{t("heroCardQuizDone")}</div>
                    <div className="text-[11px] text-slate-400 dark:text-slate-500">7 / 8 correct · 87%</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating badge — top right */}
            <div className="absolute -top-3 -right-4 z-10 hidden md:block animate-float-alt">
              <div className="glass rounded-2xl px-4 py-3 shadow-xl shadow-amber-100/50 dark:shadow-amber-900/20">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center">
                    <Flame className="w-4 h-4 text-amber-500" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-bold text-slate-900 dark:text-white leading-tight">{t("heroCardTopics")}</div>
                    <div className="text-[11px] text-slate-400 dark:text-slate-500">HTML → Kubernetes</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating badge — bottom right */}
            <div className="absolute -bottom-5 -right-4 z-10 hidden md:block animate-float">
              <div className="glass rounded-2xl px-4 py-3 shadow-xl shadow-indigo-100/50 dark:shadow-indigo-900/20">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-violet-100 dark:bg-violet-900/40 flex items-center justify-center">
                    <Star className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-bold text-slate-900 dark:text-white leading-tight">{t("heroCardFree")}</div>
                    <div className="text-[11px] text-slate-400 dark:text-slate-500">{t("heroCardNoSignup")}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main glass card */}
            <div className="glass rounded-2xl shadow-2xl shadow-violet-500/10 dark:shadow-violet-500/5 overflow-hidden">
              {/* Title bar */}
              <div className="flex items-center gap-2 px-5 py-3.5 bg-white/80 dark:bg-slate-900/80 border-b border-slate-200/60 dark:border-white/[0.06]">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="px-4 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs text-slate-500 dark:text-slate-400 font-mono">
                    devonix.app/learn
                  </div>
                </div>
              </div>
              {/* Topic pills */}
              <div className="p-6 bg-white/50 dark:bg-slate-900/50">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    { name: "HTML",       emoji: "🌐", color: "bg-orange-50 dark:bg-orange-500/10 border-orange-200 dark:border-orange-500/20 text-orange-700 dark:text-orange-300" },
                    { name: "React",      emoji: "⚛️", color: "bg-cyan-50 dark:bg-cyan-500/10 border-cyan-200 dark:border-cyan-500/20 text-cyan-700 dark:text-cyan-300" },
                    { name: "Node.js",    emoji: "🟢", color: "bg-green-50 dark:bg-green-500/10 border-green-200 dark:border-green-500/20 text-green-700 dark:text-green-300" },
                    { name: "MongoDB",    emoji: "🍃", color: "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-300" },
                    { name: "Docker",     emoji: "🐳", color: "bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/20 text-blue-700 dark:text-blue-300" },
                    { name: "Kubernetes", emoji: "☸️", color: "bg-indigo-50 dark:bg-indigo-500/10 border-indigo-200 dark:border-indigo-500/20 text-indigo-700 dark:text-indigo-300" },
                  ].map((item) => (
                    <div
                      key={item.name}
                      className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border text-sm font-semibold ${item.color}`}
                    >
                      <span className="text-base">{item.emoji}</span>
                      {item.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
