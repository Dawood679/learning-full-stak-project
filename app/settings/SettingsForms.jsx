"use client"

import { useActionState, useState } from "react"
import { Loader2, CheckCircle, AlertCircle, Eye, EyeOff } from "lucide-react"
import { updateName, updatePassword } from "./actions"

function PasswordInput({ name, placeholder, required }) {
  const [show, setShow] = useState(false)
  return (
    <div className="relative">
      <input
        name={name}
        type={show ? "text" : "password"}
        required={required}
        placeholder={placeholder}
        className="w-full text-sm px-3 py-2.5 pr-10 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
      />
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        className="absolute inset-y-0 right-0 flex items-center px-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
        aria-label={show ? "Hide password" : "Show password"}
      >
        {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
      </button>
    </div>
  )
}

function Feedback({ state }) {
  if (!state?.success && !state?.error) return null
  return (
    <div className={`flex items-center gap-2 text-sm px-3 py-2 rounded-lg mt-3 ${
      state.success
        ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400"
        : "bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400"
    }`}>
      {state.success
        ? <CheckCircle className="w-4 h-4 shrink-0" />
        : <AlertCircle className="w-4 h-4 shrink-0" />}
      {state.success ?? state.error}
    </div>
  )
}

function SubmitBtn({ pending, label }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
    >
      {pending && <Loader2 className="w-4 h-4 animate-spin" />}
      {pending ? "Saving…" : label}
    </button>
  )
}

export function UpdateNameForm({ currentName }) {
  const [state, action, pending] = useActionState(updateName, null)

  return (
    <form action={action} className="space-y-4">
      <div>
        <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">
          Display Name
        </label>
        <input
          name="name"
          type="text"
          required
          defaultValue={currentName ?? ""}
          placeholder="Your name"
          className="w-full text-sm px-3 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
        />
      </div>
      <SubmitBtn pending={pending} label="Update Name" />
      <Feedback state={state} />
    </form>
  )
}

export function UpdatePasswordForm({ hasPassword }) {
  const [state, action, pending] = useActionState(updatePassword, null)

  if (!hasPassword) {
    return (
      <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/60 px-4 py-3 rounded-xl">
        <AlertCircle className="w-4 h-4 shrink-0 text-amber-500" />
        Your account uses Google sign-in — password cannot be changed here.
      </div>
    )
  }

  return (
    <form action={action} className="space-y-4">
      <div>
        <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">
          Current Password
        </label>
        <PasswordInput name="current" placeholder="••••••••" required />
      </div>
      <div>
        <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">
          New Password
        </label>
        <PasswordInput name="next" placeholder="Min 6 characters" required />
      </div>
      <div>
        <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">
          Confirm New Password
        </label>
        <PasswordInput name="confirm" placeholder="••••••••" required />
      </div>
      <SubmitBtn pending={pending} label="Update Password" />
      <Feedback state={state} />
    </form>
  )
}
