import Link from "next/link"
import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { ArrowLeft, CheckCircle, XCircle } from "lucide-react"

async function getStudent(id) {
  try {
    return await prisma.user.findUnique({
      where: { id },
      include: {
        attendances: {
          include: {
            classSession: {
              include: { topic: { select: { title: true, slug: true } } },
            },
          },
          orderBy: { classSession: { scheduledAt: "asc" } },
        },
        quizAttempts: {
          include: { topic: { select: { title: true } } },
          orderBy: { createdAt: "desc" },
        },
      },
    })
  } catch {
    return null
  }
}

export default async function StudentDetailPage({ params }) {
  const { id } = await params
  const student = await getStudent(id)
  if (!student) notFound()

  const present = student.attendances.filter((a) => a.status === "PRESENT").length
  const total = student.attendances.length
  const percentage = total > 0 ? Math.round((present / total) * 100) : 0

  const avgScore = student.quizAttempts.length > 0
    ? Math.round(student.quizAttempts.reduce((acc, a) => acc + Math.round((a.score / a.total) * 100), 0) / student.quizAttempts.length)
    : null

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back */}
      <Link href="/admin/students" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-violet-600 transition-colors mb-6">
        <ArrowLeft className="w-4 h-4" />
        All Students
      </Link>

      {/* Student header */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        {student.image && (
          <img src={student.image} alt={student.name} className="w-16 h-16 rounded-full" />
        )}
        <div className="flex-1">
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">{student.name ?? "Unknown"}</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">{student.email}</p>
          <p className="text-xs text-slate-400 mt-1">
            Joined {new Date(student.createdAt).toLocaleDateString("en-PK", { month: "long", day: "numeric", year: "numeric" })}
          </p>
        </div>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{present}/{total}</p>
            <p className="text-xs text-slate-500">Classes</p>
          </div>
          <div>
            <p className={`text-2xl font-bold ${percentage >= 75 ? "text-green-600" : percentage >= 50 ? "text-amber-600" : "text-red-600"}`}>
              {percentage}%
            </p>
            <p className="text-xs text-slate-500">Attendance</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{avgScore !== null ? `${avgScore}%` : "—"}</p>
            <p className="text-xs text-slate-500">Avg Quiz</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Attendance Record */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800">
            <h2 className="font-semibold text-slate-900 dark:text-white">Attendance Record</h2>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-96 overflow-y-auto">
            {student.attendances.map((a) => {
              const dateStr = new Date(a.classSession.scheduledAt).toLocaleDateString("en-PK", {
                month: "short", day: "numeric", weekday: "short",
              })
              return (
                <div key={a.id} className="px-6 py-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate max-w-[180px]">
                      {a.classSession.title}
                    </p>
                    <p className="text-xs text-slate-400">{dateStr} · {a.classSession.topic.title}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {a.quizScore !== null && (
                      <span className="text-xs text-slate-500">{a.quizScore}%</span>
                    )}
                    {a.status === "PRESENT" ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-400" />
                    )}
                  </div>
                </div>
              )
            })}
            {student.attendances.length === 0 && (
              <div className="text-center py-8 text-slate-400 text-sm">No attendance recorded yet</div>
            )}
          </div>
        </div>

        {/* Quiz Attempts */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800">
            <h2 className="font-semibold text-slate-900 dark:text-white">Quiz Attempts</h2>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-96 overflow-y-auto">
            {student.quizAttempts.map((a) => {
              const pct = Math.round((a.score / a.total) * 100)
              return (
                <div key={a.id} className="px-6 py-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{a.topic.title}</p>
                    <p className="text-xs text-slate-400">
                      {new Date(a.createdAt).toLocaleDateString("en-PK", { month: "short", day: "numeric" })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-bold ${pct >= 75 ? "text-green-600" : pct >= 50 ? "text-amber-600" : "text-red-500"}`}>
                      {a.score}/{a.total}
                    </p>
                    <p className="text-xs text-slate-400">{pct}%</p>
                  </div>
                </div>
              )
            })}
            {student.quizAttempts.length === 0 && (
              <div className="text-center py-8 text-slate-400 text-sm">No quiz attempts yet</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
