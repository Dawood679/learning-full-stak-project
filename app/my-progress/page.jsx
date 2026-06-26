import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { CheckCircle, XCircle, BookOpen, TrendingUp } from "lucide-react"

export const metadata = { title: "My Progress — DevOnix" }

async function getMyData(userId) {
  try {
    const [attendances, quizAttempts, totalSessions] = await Promise.all([
      prisma.attendance.findMany({
        where: { userId },
        include: {
          classSession: {
            include: { topic: { select: { title: true, slug: true } } },
          },
        },
        orderBy: { classSession: { scheduledAt: "asc" } },
      }),
      prisma.quizAttempt.findMany({
        where: { userId },
        include: { topic: { select: { title: true, slug: true } } },
        orderBy: { createdAt: "desc" },
      }),
      prisma.classSession.count(),
    ])
    return { attendances, quizAttempts, totalSessions }
  } catch {
    return { attendances: [], quizAttempts: [], totalSessions: 0 }
  }
}

export default async function MyProgressPage() {
  const session = await auth()
  if (!session?.user) redirect("/sign-in")

  const { attendances, quizAttempts, totalSessions } = await getMyData(session.user.id)

  const present = attendances.filter((a) => a.status === "PRESENT").length
  const total = attendances.length
  const attendancePct = total > 0 ? Math.round((present / total) * 100) : 0
  const avgScore = quizAttempts.length > 0
    ? Math.round(quizAttempts.reduce((acc, a) => acc + Math.round((a.score / a.total) * 100), 0) / quizAttempts.length)
    : null

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            {session.user.image && (
              <img src={session.user.image} alt={session.user.name ?? ""} className="w-12 h-12 rounded-full" />
            )}
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                {session.user.name ?? "My Progress"}
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-sm">DevOnix Cohort 2.0</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Classes Attended", value: `${present}/${total}`, icon: BookOpen, color: "violet" },
            { label: "Attendance", value: `${attendancePct}%`, icon: TrendingUp, color: attendancePct >= 75 ? "green" : attendancePct >= 50 ? "amber" : "red" },
            { label: "Quizzes Done", value: quizAttempts.length, icon: CheckCircle, color: "blue" },
            { label: "Avg Score", value: avgScore !== null ? `${avgScore}%` : "—", icon: TrendingUp, color: "indigo" },
          ].map((s) => {
            const colorMap = {
              violet: "bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400",
              green:  "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
              amber:  "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400",
              red:    "bg-red-100 dark:bg-red-900/30 text-red-500 dark:text-red-400",
              blue:   "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
              indigo: "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400",
            }
            return (
              <div key={s.label} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4">
                <div className={`inline-flex p-2 rounded-lg mb-2 ${colorMap[s.color]}`}>
                  <s.icon className="w-4 h-4" />
                </div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{s.value}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{s.label}</p>
              </div>
            )
          })}
        </div>

        {/* Attendance table */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden mb-6">
          <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <h2 className="font-semibold text-slate-900 dark:text-white">Class Attendance</h2>
            <Link href="/schedule" className="text-xs text-violet-600 dark:text-violet-400 hover:underline">
              View schedule →
            </Link>
          </div>

          {attendances.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <p className="text-sm mb-2">No classes attended yet</p>
              <p className="text-xs">Classes start July 1, 2026. Complete a quiz to mark attendance!</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {attendances.map((a) => (
                <div key={a.id} className="px-6 py-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                      {a.classSession.title}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-slate-400">
                        {new Date(a.classSession.scheduledAt).toLocaleDateString("en-PK", {
                          weekday: "short", month: "short", day: "numeric",
                        })}
                      </span>
                      <span className="text-xs text-slate-300 dark:text-slate-600">·</span>
                      <Link
                        href={`/learn/${a.classSession.topic.slug}`}
                        className="text-xs text-violet-600 dark:text-violet-400 hover:underline"
                      >
                        {a.classSession.topic.title}
                      </Link>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {a.quizScore !== null && (
                      <span className="text-xs text-slate-500 dark:text-slate-400">{a.quizScore}% quiz</span>
                    )}
                    {a.status === "PRESENT" ? (
                      <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-xs font-medium">Present</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-red-500 dark:text-red-400">
                        <XCircle className="w-4 h-4" />
                        <span className="text-xs font-medium">Absent</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
