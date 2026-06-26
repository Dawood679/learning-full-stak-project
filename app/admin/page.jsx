import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { Users, BookOpen, CheckCircle, XCircle, TrendingUp, Calendar, Clock, ChevronRight } from "lucide-react"

async function getStats() {
  try {
    const [totalStudents, totalSessions, attendances, quizAttempts] = await Promise.all([
      prisma.user.count({ where: { role: "STUDENT" } }),
      prisma.classSession.count(),
      prisma.attendance.findMany(),
      prisma.quizAttempt.count(),
    ])

    const present = attendances.filter((a) => a.status === "PRESENT").length
    const absent = attendances.filter((a) => a.status === "ABSENT").length
    const avgAttendance = attendances.length > 0
      ? Math.round((present / attendances.length) * 100)
      : 0

    return { totalStudents, totalSessions, present, absent, avgAttendance, quizAttempts }
  } catch {
    return { totalStudents: 0, totalSessions: 0, present: 0, absent: 0, avgAttendance: 0, quizAttempts: 0 }
  }
}

async function getStudents() {
  try {
    const students = await prisma.user.findMany({
      where: { role: "STUDENT" },
      include: {
        attendances: true,
        quizAttempts: { orderBy: { createdAt: "desc" }, take: 1 },
      },
      orderBy: { createdAt: "desc" },
    })

    return students.map((s) => {
      const present = s.attendances.filter((a) => a.status === "PRESENT").length
      const total = s.attendances.length
      const percentage = total > 0 ? Math.round((present / total) * 100) : 0
      return { ...s, present, total, percentage }
    })
  } catch {
    return []
  }
}

async function getRecentSessions() {
  try {
    const now = new Date()
    return await prisma.classSession.findMany({
      where: { scheduledAt: { lt: now } },
      include: {
        topic: { select: { title: true, slug: true } },
        attendances: true,
      },
      orderBy: { scheduledAt: "desc" },
      take: 8,
    })
  } catch {
    return []
  }
}

async function getUpcomingSessions() {
  try {
    const now = new Date()
    return await prisma.classSession.findMany({
      where: { scheduledAt: { gte: now } },
      include: {
        topic: { select: { title: true, slug: true, difficulty: true } },
      },
      orderBy: { scheduledAt: "asc" },
      take: 15,
    })
  } catch {
    return []
  }
}

export default async function AdminPage() {
  const [stats, students, sessions, upcoming] = await Promise.all([
    getStats(),
    getStudents(),
    getRecentSessions(),
    getUpcomingSessions(),
  ])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Dashboard Overview</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
          Job Ready AI Powered Cohort 2.0 — July – September 2026
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <StatCard icon={Users} label="Students" value={stats.totalStudents} color="violet" />
        <StatCard icon={Calendar} label="Classes" value={stats.totalSessions} color="blue" />
        <StatCard icon={CheckCircle} label="Present" value={stats.present} color="green" />
        <StatCard icon={XCircle} label="Absent" value={stats.absent} color="red" />
        <StatCard icon={TrendingUp} label="Avg Attendance" value={`${stats.avgAttendance}%`} color="amber" />
        <StatCard icon={BookOpen} label="Quiz Attempts" value={stats.quizAttempts} color="indigo" />
      </div>

      {/* ── Upcoming Classes ───────────────────────────────────────── */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden mb-6">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-violet-500" />
            <h2 className="font-semibold text-slate-900 dark:text-white">Upcoming Classes</h2>
            <span className="text-xs font-medium text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-900/30 px-2 py-0.5 rounded-full">
              {upcoming.length} baqi
            </span>
          </div>
          <Link href="/schedule" className="text-xs text-violet-600 dark:text-violet-400 hover:underline flex items-center gap-1">
            Full schedule <ChevronRight className="w-3 h-3" />
          </Link>
        </div>

        {upcoming.length === 0 ? (
          <div className="text-center px-6 py-8 text-slate-400 text-sm">
            Koi upcoming class nahi — cohort khatam ho gaya ya schedule seed nahi hua
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs">
                  <th className="text-left px-6 py-2.5 font-medium">Day</th>
                  <th className="text-left px-4 py-2.5 font-medium">Date</th>
                  <th className="text-left px-4 py-2.5 font-medium">Class Title</th>
                  <th className="text-left px-4 py-2.5 font-medium">Topic</th>
                  <th className="text-center px-4 py-2.5 font-medium">Level</th>
                  <th className="text-center px-4 py-2.5 font-medium">Month</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {upcoming.map((s, i) => {
                  const d = new Date(s.scheduledAt)
                  const isNext = i === 0
                  const diffDays = Math.ceil((d - new Date()) / (1000 * 60 * 60 * 24))
                  const diffLabel = diffDays === 0 ? "Aaj" : diffDays === 1 ? "Kal" : `${diffDays} din mein`

                  const DIFF_COLORS = {
                    BEGINNER:     "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
                    INTERMEDIATE: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
                    ADVANCED:     "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
                  }
                  const MONTH_NAMES = { 1: "July", 2: "August", 3: "September" }

                  return (
                    <tr
                      key={s.id}
                      className={`transition-colors cursor-pointer group ${isNext ? "bg-violet-50/60 dark:bg-violet-900/10" : "hover:bg-slate-50 dark:hover:bg-slate-800/30"}`}
                    >
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-2">
                          {isNext && (
                            <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
                          )}
                          <span className="font-mono text-xs font-bold text-slate-500 dark:text-slate-400">
                            #{s.dayNumber}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-medium text-slate-800 dark:text-slate-200 text-xs">
                          {d.toLocaleDateString("en-PK", { weekday: "short", month: "short", day: "numeric" })}
                        </p>
                        <p className="text-xs text-violet-500 dark:text-violet-400 mt-0.5">{diffLabel}</p>
                      </td>
                      <td className="px-4 py-3 max-w-[200px]">
                        <Link
                          href={`/admin/schedule/${s.id}`}
                          className="text-sm font-medium text-slate-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors truncate block"
                        >
                          {s.title}
                        </Link>
                      </td>
                      <td className="px-4 py-3">
                        <Link
                          href={`/learn/${s.topic.slug}`}
                          className="text-xs text-violet-600 dark:text-violet-400 hover:underline"
                        >
                          {s.topic.title}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${DIFF_COLORS[s.topic.difficulty]}`}>
                          {s.topic.difficulty}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Link
                          href={`/admin/schedule/${s.id}`}
                          className="text-xs font-medium text-violet-600 dark:text-violet-400 hover:underline"
                        >
                          Dekho →
                        </Link>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── Bottom grid: Students + Recent ─────────────────────────── */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Students Table */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
            <h2 className="font-semibold text-slate-900 dark:text-white">All Students</h2>
            <Link href="/admin/students" className="text-xs text-violet-600 dark:text-violet-400 hover:underline">
              View all →
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400">
                  <th className="text-left px-6 py-3 font-medium">Student</th>
                  <th className="text-center px-4 py-3 font-medium">Classes</th>
                  <th className="text-center px-4 py-3 font-medium">Attendance</th>
                  <th className="text-center px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {students.slice(0, 10).map((student) => (
                  <tr key={student.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-2">
                        {student.image && (
                          <img src={student.image} alt={student.name} className="w-7 h-7 rounded-full" />
                        )}
                        <div>
                          <p className="font-medium text-slate-900 dark:text-white truncate max-w-[140px]">
                            {student.name ?? "Unknown"}
                          </p>
                          <p className="text-xs text-slate-400 truncate max-w-[140px]">{student.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="text-center px-4 py-3 text-slate-700 dark:text-slate-300">
                      {student.present}/{student.total}
                    </td>
                    <td className="text-center px-4 py-3">
                      <AttendanceBadge percentage={student.percentage} />
                    </td>
                    <td className="text-center px-4 py-3">
                      <Link href={`/admin/students/${student.id}`} className="text-xs text-violet-600 dark:text-violet-400 hover:underline">
                        Details
                      </Link>
                    </td>
                  </tr>
                ))}
                {students.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center px-6 py-8 text-slate-400 text-sm">
                      No students enrolled yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Past Sessions */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800">
            <h2 className="font-semibold text-slate-900 dark:text-white">Recent Past Classes</h2>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {sessions.map((s) => {
              const presentCount = s.attendances.filter((a) => a.status === "PRESENT").length
              const dateStr = new Date(s.scheduledAt).toLocaleDateString("en-PK", {
                month: "short", day: "numeric", weekday: "short",
              })
              return (
                <Link
                  key={s.id}
                  href={`/admin/schedule/${s.id}`}
                  className="px-6 py-3 flex items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"
                >
                  <div className="min-w-0">
                    <p className="font-medium text-slate-900 dark:text-white text-sm truncate group-hover:text-violet-600">
                      {s.title}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">{dateStr} · {s.topic.title}</p>
                  </div>
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-300 shrink-0">
                    {presentCount}/{stats.totalStudents} present
                  </span>
                </Link>
              )
            })}
            {sessions.length === 0 && (
              <div className="text-center px-6 py-8 text-slate-400 text-sm">
                Abhi koi class nahi hui
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({ icon: Icon, label, value, color }) {
  const colors = {
    violet: "bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400",
    blue:   "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
    green:  "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
    red:    "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400",
    amber:  "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400",
    indigo: "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400",
  }
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4">
      <div className={`inline-flex p-2 rounded-lg mb-3 ${colors[color]}`}>
        <Icon className="w-4 h-4" />
      </div>
      <p className="text-2xl font-bold text-slate-900 dark:text-white">{value}</p>
      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{label}</p>
    </div>
  )
}

function AttendanceBadge({ percentage }) {
  if (percentage >= 75) {
    return <span className="text-xs font-medium text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded-full">{percentage}%</span>
  }
  if (percentage >= 50) {
    return <span className="text-xs font-medium text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-2 py-0.5 rounded-full">{percentage}%</span>
  }
  return <span className="text-xs font-medium text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-2 py-0.5 rounded-full">{percentage}%</span>
}
