import { auth, signIn } from "@/lib/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Code2, AlertCircle } from "lucide-react"

export const metadata = {
  title: "Sign In — DevOnix",
}

export default async function SignInPage({ searchParams }) {
  const session = await auth()
  if (session) redirect("/learn")

  const { error } = await searchParams
  const errorMsg = error === "CredentialsSignin" ? "Email ya password galat hai." : null

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-violet-600 mb-4">
            <Code2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">DevOnix</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
            Job Ready AI Powered Cohort 2.0
          </p>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 p-8">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">Sign In</h2>

          {errorMsg && (
            <div className="flex items-center gap-2 mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {errorMsg}
            </div>
          )}

          <form
            action={async (formData) => {
              "use server"
              await signIn("credentials", {
                email:       formData.get("email"),
                password:    formData.get("password"),
                redirectTo:  "/learn",
              })
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Email
              </label>
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="aapka@email.com"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Password
              </label>
              <input
                name="password"
                type="password"
                required
                autoComplete="current-password"
                placeholder="••••••••"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold text-sm transition-colors shadow-sm shadow-violet-500/25"
            >
              Sign In
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-5">
            Account nahi hai?{" "}
            <Link href="/register" className="text-violet-600 dark:text-violet-400 font-medium hover:underline">
              Register karo
            </Link>
          </p>

          <p className="text-center text-xs text-slate-400 dark:text-slate-500 mt-4">
            Classes start{" "}
            <span className="font-medium text-violet-600 dark:text-violet-400">July 1, 2026</span>
          </p>
        </div>
      </div>
    </div>
  )
}
