import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { ArrowLeft } from "lucide-react"
import { StudentsTable } from "./StudentsTable"

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
      const avgScore =
        s.quizAttempts.length > 0
          ? Math.round(
              s.quizAttempts.reduce((acc, a) => acc + Math.round((a.score / a.total) * 100), 0) /
                s.quizAttempts.length
            )
          : null
      return {
        ...s,
        present,
        total,
        percentage: total > 0 ? Math.round((present / total) * 100) : 0,
        avgScore,
        // strip non-serializable fields
        attendances: undefined,
      }
    })
  } catch {
    return []
  }
}

export default async function StudentsPage() {
  const [students, session] = await Promise.all([getAllStudents(), auth()])
  const adminUserId = session?.user?.id ?? ""

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

      <StudentsTable students={students} adminUserId={adminUserId} />
    </div>
  )
}
