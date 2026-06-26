"use client"

import { useActionState } from "react"
import { registerStudent } from "./actions"
import { UserPlus, CheckCircle, AlertCircle, Mail } from "lucide-react"

const TRACKS = [
  { value: "MERN_STACK", label: "MERN Stack",          color: "border-blue-400   text-blue-700   bg-blue-50   dark:bg-blue-900/20  dark:text-blue-300"   },
  { value: "FULL_STACK",  label: "Full Stack Internee", color: "border-violet-400 text-violet-700 bg-violet-50 dark:bg-violet-900/20 dark:text-violet-300" },
  { value: "ADVANCED",    label: "Advanced Backend",    color: "border-amber-400  text-amber-700  bg-amber-50  dark:bg-amber-900/20  dark:text-amber-300"  },
]

export default function RegisterStudentForm() {
  const [state, formAction, isPending] = useActionState(registerStudent, null)

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
        <div className="w-9 h-9 bg-violet-100 dark:bg-violet-900/40 rounded-xl flex items-center justify-center">
          <UserPlus className="w-5 h-5 text-violet-600 dark:text-violet-400" />
        </div>
        <div>
          <h2 className="text-base font-semibold text-slate-900 dark:text-white">Register New Student</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">Account banao aur welcome email automatically bhej do</p>
        </div>
      </div>

      {/* Form */}
      <form action={formAction} className="px-6 py-5 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Name */}
          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              required
              placeholder="Ali Hassan"
              className="w-full text-sm px-3 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="ali@gmail.com"
              className="w-full text-sm px-3 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">
              Password
            </label>
            <input
              type="text"
              name="password"
              required
              minLength={6}
              placeholder="Min. 6 characters"
              className="w-full text-sm px-3 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 font-mono"
            />
          </div>

          {/* Track */}
          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">
              Learning Track
            </label>
            <select
              name="track"
              required
              defaultValue=""
              className="w-full text-sm px-3 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
            >
              <option value="" disabled>Track select karo…</option>
              {TRACKS.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Email note */}
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 rounded-lg px-3 py-2.5">
          <Mail className="w-3.5 h-3.5 shrink-0 text-violet-500" />
          <span>Student ko automatically welcome email bhej di jaegi jisme login details honge.</span>
        </div>

        {/* Submit */}
        <div className="flex items-center gap-3 pt-1">
          <button
            type="submit"
            disabled={isPending}
            className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
          >
            <UserPlus className="w-4 h-4" />
            {isPending ? "Creating…" : "Register & Send Email"}
          </button>
        </div>

        {/* Feedback */}
        {state?.success && (
          <div className="flex items-start gap-2.5 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg px-4 py-3">
            <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-green-800 dark:text-green-300">
                {state.name} ka account successfully create ho gaya!
              </p>
              {state.emailSent ? (
                <p className="text-green-700 dark:text-green-400 text-xs mt-0.5">
                  Welcome email bhi bhej di gai hai.
                </p>
              ) : (
                <p className="text-amber-700 dark:text-amber-400 text-xs mt-0.5">
                  Account create hua lekin email send nahi hui — check karo GMAIL_USER aur GMAIL_APP_PASSWORD .env mein.
                </p>
              )}
            </div>
          </div>
        )}

        {state?.error && (
          <div className="flex items-center gap-2.5 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg px-4 py-3">
            <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0" />
            <p className="text-sm text-red-700 dark:text-red-400">{state.error}</p>
          </div>
        )}
      </form>
    </div>
  )
}
