"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Code2, BookOpen } from "lucide-react"
import { ThemeToggle } from "./ThemeToggle"
import { cn } from "@/lib/utils"

export function Navbar() {
  const pathname = usePathname()

  const links = [
    { href: "/",      label: "Home" },
    { href: "/learn", label: "Topics" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/60 dark:border-slate-800/60 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* ── Logo ── */}
        <Link href="/" className="flex items-center gap-2.5 font-black text-lg">
          <div className="w-8 h-8 rounded-xl bg-violet-600 flex items-center justify-center shadow-sm shadow-violet-500/30">
            <Code2 className="w-4 h-4 text-white" />
          </div>
          <span className="gradient-text">DevOnix</span>
        </Link>

        {/* ── Nav links ── */}
        <div className="flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-semibold transition-colors",
                pathname === link.href
                  ? "bg-violet-50 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300"
                  : "text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800/70"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* ── Right ── */}
        <div className="flex items-center gap-2">
          <Link
            href="/learn"
            className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold transition-colors shadow-sm shadow-violet-500/25"
          >
            <BookOpen className="w-3.5 h-3.5" />
            Start Learning
          </Link>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
