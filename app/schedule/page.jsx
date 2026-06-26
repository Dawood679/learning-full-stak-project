import { Suspense } from "react"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { MONTH_LABELS } from "@/data/schedule"
import { MERN_COHORT_SCHEDULE, MERN_MONTH_LABELS } from "@/data/mern-schedule"
import { ADVANCED_COHORT_SCHEDULE, ADVANCED_MONTH_LABELS } from "@/data/advanced-schedule"
import { INTERNEE_COHORT_SCHEDULE, INTERNEE_MONTH_LABELS } from "@/data/internee-schedule"
import { Calendar, CheckCircle, Lock } from "lucide-react"
import TrackTabNav from "./TrackTabNav"

export const metadata = { title: "Class Schedule — DevOnix" }

async function getSchedule(userId) {
  try {
    const sessions = await prisma.classSession.findMany({
      include: {
        topic: { select: { title: true, slug: true, difficulty: true } },
        attendances: userId ? { where: { userId } } : false,
      },
      orderBy: { scheduledAt: "asc" },
    })
    return sessions
  } catch {
    return []
  }
}

const stripPrefix = (t) => t.replace(/^(?:Episode \d+ — |MERN — |Advanced — |Internee — )/, "")

const DIFFICULTY_COLORS = {
  BEGINNER:     "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  INTERMEDIATE: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  ADVANCED:     "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
}

const TRACK_LABELS = {
  MERN_STACK: "MERN Stack",
  FULL_STACK:  "Full Stack",
  ADVANCED:    "Advanced Backend",
  INTERNEE:    "Internee",
}

// Renders a read-only schedule from static data (no DB, no attendance tracking)
function StaticSchedulePage({ entries, monthLabels, trackLabel }) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const byMonth = { 1: [], 2: [], 3: [] }
  for (const s of entries) {
    byMonth[s.month].push(s)
  }

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Calendar className="w-6 h-6 text-violet-600" />
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Class Schedule</h1>
        </div>
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          {trackLabel} Track — 3-Month Program (July – September 2026)
        </p>
      </div>

      {[1, 2, 3].map((month) => {
        const monthSessions = byMonth[month]
        if (monthSessions.length === 0) return null

        return (
          <div key={month} className="mb-10">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-violet-100 dark:bg-violet-900/40 text-violet-600 dark:text-violet-400 text-xs font-bold flex items-center justify-center">
                {month}
              </span>
              {monthLabels[month]}
            </h2>

            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {monthSessions.map((s) => {
                  const sessionDate = new Date(s.scheduledAt)
                  sessionDate.setHours(0, 0, 0, 0)
                  const isPast  = sessionDate < today
                  const isToday = sessionDate.getTime() === today.getTime()

                  return (
                    <div
                      key={s.day}
                      className={`px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-3 ${isToday ? "bg-violet-50 dark:bg-violet-900/10" : ""}`}
                    >
                      <div className="shrink-0 w-14 text-center">
                        <p className="text-xs text-slate-400 font-medium">Class</p>
                        <p className="text-2xl font-bold text-violet-600 dark:text-violet-400 leading-none">
                          {s.dayNumber}
                        </p>
                      </div>

                      <div className="hidden sm:block w-px h-12 bg-slate-200 dark:bg-slate-700 shrink-0" />

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          {isToday && (
                            <span className="text-xs font-bold text-violet-600 dark:text-violet-400 bg-violet-100 dark:bg-violet-900/40 px-2 py-0.5 rounded-full">
                              Aaj
                            </span>
                          )}
                          <p className="font-semibold text-slate-900 dark:text-white text-sm">{stripPrefix(s.title)}</p>
                        </div>
                      </div>

                      <div className="shrink-0 flex items-center gap-2">
                        <Link
                          href={`/learn/${s.topicSlug}`}
                          className="text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 px-3 py-1.5 rounded-full transition-colors"
                        >
                          Notes →
                        </Link>
                        {isPast || isToday ? (
                          <span className="text-xs font-medium text-slate-400 dark:text-slate-500 px-1">
                            Quiz coming soon
                          </span>
                        ) : (
                          <span className="text-xs text-slate-400 dark:text-slate-500 px-1">Upcoming</span>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

// Admin view — full schedule for all 4 tracks with tab navigation
async function AdminScheduleView({ activeTrack, userId }) {
  let content

  if (activeTrack === "fullstack") {
    const sessions = await getSchedule(userId)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const byMonth = { 1: [], 2: [], 3: [] }
    for (const s of sessions) byMonth[s.month].push(s)

    content = (
      <div>
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-6 h-6 text-violet-600" />
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Class Schedule</h1>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Full Stack Track — 3-Month Program (July – September 2026)
          </p>
        </div>

        {[1, 2, 3].map((month) => {
          const monthSessions = byMonth[month]
          if (monthSessions.length === 0) return null
          return (
            <div key={month} className="mb-10">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-violet-100 dark:bg-violet-900/40 text-violet-600 dark:text-violet-400 text-xs font-bold flex items-center justify-center">
                  {month}
                </span>
                {MONTH_LABELS[month]}
              </h2>
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                  {monthSessions.map((s) => {
                    const sessionDate = new Date(s.scheduledAt)
                    sessionDate.setHours(0, 0, 0, 0)
                    const isPast  = sessionDate < today
                    const isToday = sessionDate.getTime() === today.getTime()
                    return (
                      <div
                        key={s.id}
                        className={`px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-3 ${isToday ? "bg-violet-50 dark:bg-violet-900/10" : ""}`}
                      >
                        <div className="shrink-0 w-14 text-center">
                          <p className="text-xs text-slate-400 font-medium">Class</p>
                          <p className="text-2xl font-bold text-violet-600 dark:text-violet-400 leading-none">
                            {s.dayNumber}
                          </p>
                        </div>
                        <div className="hidden sm:block w-px h-12 bg-slate-200 dark:bg-slate-700 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            {isToday && (
                              <span className="text-xs font-bold text-violet-600 dark:text-violet-400 bg-violet-100 dark:bg-violet-900/40 px-2 py-0.5 rounded-full">
                                Aaj
                              </span>
                            )}
                            <p className="font-semibold text-slate-900 dark:text-white text-sm">{stripPrefix(s.title)}</p>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${DIFFICULTY_COLORS[s.topic.difficulty]}`}>
                              {s.topic.difficulty}
                            </span>
                          </div>
                        </div>
                        <div className="shrink-0 flex items-center gap-2">
                          <Link
                            href={`/learn/${s.topic.slug}`}
                            className="text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 px-3 py-1.5 rounded-full transition-colors"
                          >
                            Notes →
                          </Link>
                          {isPast || isToday ? (
                            <span className="text-xs font-medium text-slate-400 dark:text-slate-500 px-1">
                              Quiz coming soon
                            </span>
                          ) : (
                            <span className="text-xs text-slate-400 dark:text-slate-500 px-1">Upcoming</span>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )
        })}

        {sessions.length === 0 && (
          <div className="text-center py-16 text-slate-400">
            <p>Schedule not seeded yet. Run <code className="font-mono bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-xs">npm run db:seed-schedule</code></p>
          </div>
        )}
      </div>
    )
  } else if (activeTrack === "advanced") {
    content = <StaticSchedulePage entries={ADVANCED_COHORT_SCHEDULE} monthLabels={ADVANCED_MONTH_LABELS} trackLabel={TRACK_LABELS.ADVANCED} />
  } else if (activeTrack === "internee") {
    content = <StaticSchedulePage entries={INTERNEE_COHORT_SCHEDULE} monthLabels={INTERNEE_MONTH_LABELS} trackLabel={TRACK_LABELS.INTERNEE} />
  } else {
    // default: mern
    content = <StaticSchedulePage entries={MERN_COHORT_SCHEDULE} monthLabels={MERN_MONTH_LABELS} trackLabel={TRACK_LABELS.MERN_STACK} />
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Suspense fallback={<div className="h-12 mb-8 animate-pulse bg-slate-200 dark:bg-slate-800 rounded-lg" />}>
          <TrackTabNav />
        </Suspense>
        {content}
      </div>
    </div>
  )
}

export default async function SchedulePage({ searchParams }) {
  const session = await auth()
  const userId  = session?.user?.id ?? null
  const track   = session?.user?.track ?? "FULL_STACK"
  const role    = session?.user?.role ?? "STUDENT"

  // Admin: show all-track tab view
  if (role === "ADMIN") {
    const { track: trackParam } = await searchParams
    const activeTrack = trackParam ?? "mern"
    return <AdminScheduleView activeTrack={activeTrack} userId={userId} />
  }

  // MERN Stack track: show static MERN curriculum
  if (track === "MERN_STACK") {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <StaticSchedulePage entries={MERN_COHORT_SCHEDULE} monthLabels={MERN_MONTH_LABELS} trackLabel={TRACK_LABELS.MERN_STACK} />
        </div>
      </div>
    )
  }

  // Advanced track: show static Advanced curriculum
  if (track === "ADVANCED") {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <StaticSchedulePage entries={ADVANCED_COHORT_SCHEDULE} monthLabels={ADVANCED_MONTH_LABELS} trackLabel={TRACK_LABELS.ADVANCED} />
        </div>
      </div>
    )
  }

  // Internee track: show static Internee curriculum
  if (track === "INTERNEE") {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <StaticSchedulePage entries={INTERNEE_COHORT_SCHEDULE} monthLabels={INTERNEE_MONTH_LABELS} trackLabel={TRACK_LABELS.INTERNEE} />
        </div>
      </div>
    )
  }

  // Full Stack (default): existing DB-backed schedule with attendance tracking
  const sessions = await getSchedule(userId)

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const byMonth = { 1: [], 2: [], 3: [] }
  for (const s of sessions) {
    byMonth[s.month].push(s)
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-6 h-6 text-violet-600" />
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Class Schedule</h1>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Job Ready AI Powered Cohort 2.0 — 3-Month Program (July – September 2026)
          </p>
          {!userId && (
            <div className="mt-4 inline-flex items-center gap-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-400 rounded-xl px-4 py-2.5 text-sm">
              <Lock className="w-4 h-4 shrink-0" />
              <span>
                <Link href="/sign-in" className="font-semibold underline">Sign in</Link> to track your attendance
              </span>
            </div>
          )}
        </div>

        {/* Month sections */}
        {[1, 2, 3].map((month) => {
          const monthSessions = byMonth[month]
          if (monthSessions.length === 0) return null

          return (
            <div key={month} className="mb-10">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-violet-100 dark:bg-violet-900/40 text-violet-600 dark:text-violet-400 text-xs font-bold flex items-center justify-center">
                  {month}
                </span>
                {MONTH_LABELS[month]}
              </h2>

              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                  {monthSessions.map((s) => {
                    const sessionDate = new Date(s.scheduledAt)
                    sessionDate.setHours(0, 0, 0, 0)
                    const isPast   = sessionDate < today
                    const isToday  = sessionDate.getTime() === today.getTime()
                    const myAttendance = s.attendances?.[0]

                    return (
                      <div
                        key={s.id}
                        className={`px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-3 ${isToday ? "bg-violet-50 dark:bg-violet-900/10" : ""}`}
                      >
                        <div className="shrink-0 w-14 text-center">
                          <p className="text-xs text-slate-400 font-medium">Class</p>
                          <p className="text-2xl font-bold text-violet-600 dark:text-violet-400 leading-none">
                            {s.dayNumber}
                          </p>
                        </div>

                        {/* Divider */}
                        <div className="hidden sm:block w-px h-12 bg-slate-200 dark:bg-slate-700 shrink-0" />

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            {isToday && (
                              <span className="text-xs font-bold text-violet-600 dark:text-violet-400 bg-violet-100 dark:bg-violet-900/40 px-2 py-0.5 rounded-full">
                                Aaj
                              </span>
                            )}
                            <p className="font-semibold text-slate-900 dark:text-white text-sm">{stripPrefix(s.title)}</p>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${DIFFICULTY_COLORS[s.topic.difficulty]}`}>
                              {s.topic.difficulty}
                            </span>
                          </div>
                        </div>

                        {/* Action buttons */}
                        <div className="shrink-0 flex items-center gap-2">
                          <Link
                            href={`/learn/${s.topic.slug}`}
                            className="text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 px-3 py-1.5 rounded-full transition-colors"
                          >
                            Notes →
                          </Link>

                          {userId && isPast && myAttendance ? (
                            myAttendance.status === "PRESENT" ? (
                              <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                                <CheckCircle className="w-4 h-4" />
                                <span className="text-xs font-medium">
                                  Present {myAttendance.quizScore !== null && `(${myAttendance.quizScore}%)`}
                                </span>
                              </div>
                            ) : (
                              <span className="text-xs font-medium text-red-500 dark:text-red-400">Absent</span>
                            )
                          ) : userId && (isPast || isToday) ? (
                            <Link
                              href={`/learn/${s.topic.slug}/quiz`}
                              className="text-xs font-medium text-white bg-violet-600 hover:bg-violet-700 px-3 py-1.5 rounded-full transition-colors"
                            >
                              Quiz →
                            </Link>
                          ) : (
                            <span className="text-xs text-slate-400 dark:text-slate-500 px-1">Upcoming</span>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )
        })}

        {sessions.length === 0 && (
          <div className="text-center py-16 text-slate-400">
            <p>Schedule not seeded yet. Run <code className="font-mono bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-xs">npm run db:seed-schedule</code></p>
          </div>
        )}
      </div>
    </div>
  )
}
