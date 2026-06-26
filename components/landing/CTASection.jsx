"use client"

import Link from "next/link"
import { ArrowRight, BookOpen } from "lucide-react"
import { useT } from "@/lib/i18n/LanguageContext"

export function CTASection() {
  const t = useT()

  return (
    <section className="py-20 bg-slate-50 dark:bg-[#07070f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden text-center py-16 px-8">
          {/* Background */}
          <div className="absolute inset-0 bg-violet-600" />
          <div className="absolute inset-0 bg-linear-to-br from-violet-600 via-indigo-600 to-purple-700" />

          {/* Decorative blobs */}
          <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-cyan-400/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              {t("ctaTitle")}
            </h2>
            <p className="text-violet-200 text-lg mb-8 max-w-lg mx-auto">
              {t("ctaSub")}
            </p>
            <Link
              href="/learn"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-white text-violet-700 font-bold text-base hover:bg-violet-50 transition-all shadow-xl shadow-black/20 hover:-translate-y-0.5"
            >
              <BookOpen className="w-5 h-5" />
              {t("ctaButton")}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
