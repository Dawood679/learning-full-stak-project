import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { ArrowLeft } from "lucide-react"

async function getAllStudents() {
  try {
    const students = await prisma.user.findMany({
      where: { role: "STUDENT" },
      include: {
        attendances: {
          include: { classSession: { include: { topic: { select: { title: true } } } } },
        },
        quizAttempts: { orderBy: { createdAt: "desc" } },
      },
      orderBy: { createdAt: "desc" },
    })
    return students.map((s) => {
      const present = s.attendances.filter((a) => a.status === "PRESENT").length
      const total = s.attendances.length
      const avgScore = s.quizAttempts.length > 0
        ? Math.round(s.quizAttempts.reduce((acc, a) => acc + Math.round((a.score / a.total) * 100), 0) / s.quizAttempts.length)
        : null
      return { ...s, present, total, percentage: total > 0 ? Math.round((present / total) * 100) : 0, avgScore }
    })
  } catch {
    return []
  }
}

export default async function StudentsPage() {
  const students = await getAllStudents()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin" className="text-slate-500 hover:text-violet-600 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">All Students</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">{students.length} enrolled</p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400">
              <th className="text-left px-6 py-3 font-medium">Student</th>
              <th className="text-center px-4 py-3 font-medium">Classes Attended</th>
              <th className="text-center px-4 py-3 font-medium">Attendance %</th>
              <th className="text-center px-4 py-3 font-medium">Quiz Attempts</th>
              <th className="text-center px-4 py-3 font-medium">Avg Score</th>
              <th className="text-center px-4 py-3 font-medium">Joined</th>
              <th className="text-center px-4 py-3 font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {student.image && (
                      <img src={student.image} alt={student.name} className="w-8 h-8 rounded-full" />
                    )}
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">{student.name ?? "Unknown"}</p>
                      <p className="text-xs text-slate-400">{student.email}</p>
                    </div>
                  </div>
                </td>
                <td className="text-center px-4 py-4 text-slate-700 dark:text-slate-300 font-medium">
                  {student.present}/{student.total}
                </td>
                <td className="text-center px-4 py-4">
                  <AttendanceBadge percentage={student.percentage} />
                </td>
                <td className="text-center px-4 py-4 text-slate-700 dark:text-slate-300">
                  {student.quizAttempts.length}
                </td>
                <td className="text-center px-4 py-4 text-slate-700 dark:text-slate-300">
                  {student.avgScore !== null ? `${student.avgScore}%` : "—"}
                </td>
                <td className="text-center px-4 py-4 text-slate-500 dark:text-slate-400 text-xs">
                  {new Date(student.createdAt).toLocaleDateString("en-PK", { month: "short", day: "numeric", year: "numeric" })}
                </td>
                <td className="text-center px-4 py-4">
                  <Link
                    href={`/admin/students/${student.id}`}
                    className="text-xs text-violet-600 dark:text-violet-400 hover:underline font-medium"
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
            {students.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center px-6 py-12 text-slate-400">
                  No students have signed in yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function AttendanceBadge({ percentage }) {
  if (percentage >= 75) {
    return <span className="text-xs font-semibold text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2.5 py-1 rounded-full">{percentage}%</span>
  }
  if (percentage >= 50) {
    return <span className="text-xs font-semibold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-2.5 py-1 rounded-full">{percentage}%</span>
  }
  return <span className="text-xs font-semibold text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-2.5 py-1 rounded-full">{percentage !== undefined ? `${percentage}%` : "0%"}</span>
}
