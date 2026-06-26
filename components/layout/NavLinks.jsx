"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useT } from "@/lib/i18n/LanguageContext"

export function NavLinks({ user }) {
  const pathname = usePathname()
  const t = useT()

  const links = [
    { href: "/",         label: t("navHome") },
    { href: "/learn",    label: t("navTopics") },
    { href: "/schedule", label: t("navSchedule") },
  ]

  if (user && user.role !== "ADMIN") {
    links.push({ href: "/board", label: "My Tickets" })
  }

  return (
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
  )
}
