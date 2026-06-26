"use client"

import Link from "next/link"
import { Settings } from "lucide-react"
import { useT } from "@/lib/i18n/LanguageContext"
import { signOutAction } from "@/app/actions"

export function NavUserSection({ user }) {
  const t = useT()

  if (!user) {
    return (
      <Link
        href="/sign-in"
        className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold transition-colors shadow-sm shadow-violet-500/25"
      >
        {t("navSignIn")}
      </Link>
    )
  }

  return (
    <>
      {user.role === "ADMIN" && (
        <Link
          href="/admin"
          className="hidden sm:block text-xs font-medium px-3 py-1.5 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 hover:bg-violet-200 dark:hover:bg-violet-800/40 transition-colors"
        >
          {t("navAdmin")}
        </Link>
      )}

      <Link
        href="/my-progress"
        className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
      >
        {t("navMyProgress")}
      </Link>

      <Link
        href="/settings"
        className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
      >
        <Settings className="w-4 h-4" />
        Settings
      </Link>

      <form action={signOutAction}>
        <button
          type="submit"
          className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-sm text-slate-600 dark:text-slate-300"
        >
          {user.image ? (
            <img src={user.image} alt={user.name ?? ""} className="w-7 h-7 rounded-full" />
          ) : (
            <div className="w-7 h-7 rounded-full bg-violet-200 dark:bg-violet-800 flex items-center justify-center text-violet-700 dark:text-violet-300 text-xs font-bold">
              {(user.name ?? user.email ?? "?")[0].toUpperCase()}
            </div>
          )}
          <span className="hidden sm:block">{t("navSignOut")}</span>
        </button>
      </form>
    </>
  )
}
