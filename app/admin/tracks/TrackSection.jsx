"use client"

import { useActionState } from "react"
import { addToTrack, removeFromTrack } from "./actions"

const BORDER_COLORS = {
  MERN_STACK: "border-blue-500",
  FULL_STACK:  "border-violet-500",
  ADVANCED:    "border-amber-500",
  INTERNEE:    "border-orange-500",
}

const BADGE_COLORS = {
  MERN_STACK: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  FULL_STACK:  "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
  ADVANCED:    "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  INTERNEE:    "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
}

const BUTTON_COLORS = {
  MERN_STACK: "bg-blue-600 hover:bg-blue-700 text-white",
  FULL_STACK:  "bg-violet-600 hover:bg-violet-700 text-white",
  ADVANCED:    "bg-amber-600 hover:bg-amber-700 text-white",
  INTERNEE:    "bg-orange-600 hover:bg-orange-700 text-white",
}

const AVATAR_COLORS = {
  MERN_STACK: "bg-blue-500",
  FULL_STACK:  "bg-violet-500",
  ADVANCED:    "bg-amber-500",
  INTERNEE:    "bg-orange-500",
}

function RemoveButton({ userId }) {
  const [, formAction, isPending] = useActionState(removeFromTrack, null)
  return (
    <form action={formAction}>
      <input type="hidden" name="userId" value={userId} />
      <button
        type="submit"
        disabled={isPending}
        className="text-xs text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium px-2 py-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors disabled:opacity-50"
      >
        {isPending ? "Removing…" : "Remove"}
      </button>
    </form>
  )
}

export default function TrackSection({ track, label, description, students }) {
  const [state, formAction, isPending] = useActionState(addToTrack, null)

  const borderColor = BORDER_COLORS[track]
  const badgeColor  = BADGE_COLORS[track]
  const btnColor    = BUTTON_COLORS[track]

  return (
    <div className={`bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 border-l-4 ${borderColor} overflow-hidden`}>
      {/* Section header */}
      <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{label}</h2>
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${badgeColor}`}>
              {students.length} {students.length === 1 ? "student" : "students"}
            </span>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{description}</p>
        </div>
      </div>

      {/* Student list */}
      <div className="divide-y divide-slate-100 dark:divide-slate-800">
        {students.length === 0 ? (
          <p className="px-6 py-5 text-sm text-slate-400 dark:text-slate-500 italic">
            No students assigned to this track yet.
          </p>
        ) : (
          students.map((student) => (
            <div key={student.id} className="flex items-center justify-between px-6 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0 ${AVATAR_COLORS[track] ?? "bg-slate-500"}`}>
                  {(student.name ?? student.email)[0].toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">{student.name ?? "Unknown"}</p>
                  <p className="text-xs text-slate-400">{student.email}</p>
                </div>
              </div>
              <RemoveButton userId={student.id} />
            </div>
          ))
        )}
      </div>

      {/* Add by email form */}
      <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/30 border-t border-slate-100 dark:border-slate-800">
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wide">
          Add student by email
        </p>
        <form action={formAction} className="flex gap-2">
          <input type="hidden" name="track" value={track} />
          <input
            type="email"
            name="email"
            required
            placeholder="student@email.com"
            className="flex-1 text-sm px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
          <button
            type="submit"
            disabled={isPending}
            className={`text-sm font-medium px-4 py-2 rounded-lg transition-colors disabled:opacity-50 ${btnColor}`}
          >
            {isPending ? "Adding…" : "Add"}
          </button>
        </form>

        {/* Feedback messages */}
        {state?.error && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-400">{state.error}</p>
        )}
        {state?.success && (
          <p className="mt-2 text-sm text-green-600 dark:text-green-400">
            {state.name} added to {label}.
            <span className="ml-1 text-slate-500 dark:text-slate-400">(Student must re-login to see their new schedule.)</span>
          </p>
        )}
      </div>
    </div>
  )
}
