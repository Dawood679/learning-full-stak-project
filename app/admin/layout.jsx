import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import Link from "next/link"

export const metadata = {
  title: "Admin Dashboard — DevOnix",
}

export default async function AdminLayout({ children }) {
  const session = await auth()

  if (!session?.user) redirect("/sign-in")
  if (session.user.role !== "ADMIN") redirect("/learn")

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Admin top banner */}
      <div className="bg-violet-700 text-white px-6 py-2 text-sm text-center font-medium">
        Admin Dashboard — DevOnix Cohort 2.0
      </div>

      {/* Admin sub-navigation */}
      <nav className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-2.5">
        <div className="max-w-7xl mx-auto flex gap-6 text-sm">
          <Link href="/admin" className="text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 font-medium transition-colors">
            Dashboard
          </Link>
          <Link href="/admin/students" className="text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 font-medium transition-colors">
            Students
          </Link>
          <Link href="/admin/tracks" className="text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 font-medium transition-colors">
            Track Management
          </Link>
          <Link href="/admin/board" className="text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 font-medium transition-colors">
            Board
          </Link>
        </div>
      </nav>

      {children}
    </div>
  )
}
