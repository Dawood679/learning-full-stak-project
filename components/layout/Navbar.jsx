import Link from "next/link"
import { Code2 } from "lucide-react"
import { auth } from "@/lib/auth"
import { ThemeToggle } from "./ThemeToggle"
import { NavLinks } from "./NavLinks"
import { LanguageToggle } from "./LanguageToggle"
import { NavUserSection } from "./NavUserSection"

export async function Navbar() {
  const session = await auth()
  const user = session?.user

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

        {/* ── Nav links (client for active state) ── */}
        <NavLinks user={user} />

        {/* ── Right side ── */}
        <div className="flex items-center gap-2">
          <NavUserSection user={user} />
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
