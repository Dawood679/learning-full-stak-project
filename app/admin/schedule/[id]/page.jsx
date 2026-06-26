import { notFound } from "next/navigation"
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { TOPICS_MAP } from "@/data/index"
import { ArrowLeft, Calendar, BookOpen, HelpCircle, Users, CheckCircle, XCircle, Code2 } from "lucide-react"

async function getSession(id) {
  try {
    return await prisma.classSession.findUnique({
      where: { id },
      include: {
        topic: {
          include: {
            questions: { orderBy: { order: "asc" } },
          },
        },
        attendances: {
          include: {
            user: { select: { id: true, name: true, email: true, image: true } },
          },
          orderBy: { status: "asc" },
        },
      },
    })
  } catch {
    return null
  }
}

const MONTH_NAMES = { 1: "July 2026", 2: "August 2026", 3: "September 2026" }
const DIFF_COLORS = {
  BEGINNER:     "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  INTERMEDIATE: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  ADVANCED:     "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
}

export default async function AdminClassDetailPage({ params }) {
  const { id } = await params
  const session = await getSession(id)
  if (!session) notFound()

  const content   = TOPICS_MAP[session.topicSlug]
  const isPast    = new Date(session.scheduledAt) < new Date()
  const isToday   = new Date(session.scheduledAt).toDateString() === new Date().toDateString()
  const questions = session.topic.questions
  const present   = session.attendances.filter((a) => a.status === "PRESENT").length
  const absent    = session.attendances.filter((a) => a.status === "ABSENT").length

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      {/* Back */}
      <Link
        href="/admin"
        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-violet-600 transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Admin Dashboard
      </Link>

      {/* ── Class Header ── */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <span className="font-mono text-xs font-bold text-slate-400">Day #{session.dayNumber}</span>
              <span className="text-xs text-slate-300 dark:text-slate-600">·</span>
              <span className="text-xs font-medium text-slate-500">{MONTH_NAMES[session.month]}</span>
              {isToday && (
                <span className="text-xs font-bold text-violet-600 dark:text-violet-400 bg-violet-100 dark:bg-violet-900/40 px-2 py-0.5 rounded-full">
                  Aaj
                </span>
              )}
              {isPast && !isToday && (
                <span className="text-xs font-medium text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                  Past
                </span>
              )}
              {!isPast && !isToday && (
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-0.5 rounded-full">
                  Upcoming
                </span>
              )}
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{session.title}</h1>
            <div className="flex items-center gap-3 mt-2 flex-wrap">
              <div className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
                <Calendar className="w-4 h-4" />
                {new Date(session.scheduledAt).toLocaleDateString("en-PK", {
                  weekday: "long", year: "numeric", month: "long", day: "numeric",
                })}
              </div>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${DIFF_COLORS[session.topic.difficulty]}`}>
                {session.topic.difficulty}
              </span>
            </div>
          </div>

          {/* Stats (only if past/today) */}
          {(isPast || isToday) && session.attendances.length > 0 && (
            <div className="flex gap-4 shrink-0">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">{present}</p>
                <p className="text-xs text-slate-500">Present</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-red-500 dark:text-red-400">{absent}</p>
                <p className="text-xs text-slate-500">Absent</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">

        {/* ── Topic Notes ── */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-violet-500" />
              <h2 className="font-semibold text-slate-900 dark:text-white">Topic Notes</h2>
            </div>
            <Link
              href={`/learn/${session.topicSlug}`}
              className="text-xs text-violet-600 dark:text-violet-400 hover:underline"
            >
              Full topic →
            </Link>
          </div>

          <div className="p-6 space-y-4">
            {content ? (
              <>
                {/* Brief description */}
                <div className="space-y-2">
                  {content.briefDescription.map((para, i) => (
                    <p key={i} className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {para}
                    </p>
                  ))}
                </div>

                {/* Key concepts */}
                {content.keyConcepts?.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500 mb-2">
                      Key Concepts
                    </p>
                    <ul className="space-y-1.5">
                      {content.keyConcepts.map((concept, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-violet-500 mt-1.5 shrink-0" />
                          {concept}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Code example */}
                {content.codeExample && (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500 mb-2 flex items-center gap-1">
                      <Code2 className="w-3 h-3" /> {content.codeExample.title}
                    </p>
                    <pre className="bg-slate-950 text-slate-200 rounded-xl p-4 text-xs overflow-x-auto leading-relaxed max-h-64 overflow-y-auto">
                      <code>{content.codeExample.code}</code>
                    </pre>
                  </div>
                )}
              </>
            ) : (
              <p className="text-sm text-slate-400 py-4 text-center">
                Is topic ka static content available nahi hai
              </p>
            )}
          </div>
        </div>

        {/* ── Quiz Questions ── */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-violet-500" />
              <h2 className="font-semibold text-slate-900 dark:text-white">Quiz Questions</h2>
              <span className="text-xs text-slate-400">({questions.length} questions)</span>
            </div>
            <Link
              href={`/learn/${session.topicSlug}/quiz`}
              className="text-xs text-violet-600 dark:text-violet-400 hover:underline"
            >
              Preview quiz →
            </Link>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-[480px] overflow-y-auto">
            {questions.map((q, i) => (
              <div key={q.id} className="px-6 py-4">
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200 mb-2">
                  <span className="text-slate-400 font-mono mr-1.5">Q{i + 1}.</span>
                  {q.questionText}
                </p>
                <ul className="space-y-1">
                  {q.options.map((opt, oi) => (
                    <li
                      key={oi}
                      className={`text-xs px-2.5 py-1.5 rounded-lg ${
                        oi === q.correctAnswer
                          ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 font-medium"
                          : "text-slate-500 dark:text-slate-400"
                      }`}
                    >
                      {oi === q.correctAnswer && <span className="mr-1">✓</span>}
                      {opt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            {questions.length === 0 && (
              <div className="text-center py-8 text-slate-400 text-sm">
                Is topic mein quiz questions nahi hain
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Attendance (past/today only) ── */}
      {(isPast || isToday) && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="flex items-center gap-2 px-6 py-4 border-b border-slate-100 dark:border-slate-800">
            <Users className="w-4 h-4 text-violet-500" />
            <h2 className="font-semibold text-slate-900 dark:text-white">Student Attendance</h2>
          </div>

          {session.attendances.length === 0 ? (
            <div className="text-center py-8 text-slate-400 text-sm">
              Kisi student ne abhi tak quiz nahi kiya
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs">
                    <th className="text-left px-6 py-3 font-medium">Student</th>
                    <th className="text-center px-4 py-3 font-medium">Status</th>
                    <th className="text-center px-4 py-3 font-medium">Quiz Score</th>
                    <th className="text-center px-4 py-3 font-medium">Completed At</th>
                    <th className="text-center px-4 py-3 font-medium">Profile</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {session.attendances.map((a) => (
                    <tr key={a.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-2">
                          {a.user.image ? (
                            <img src={a.user.image} alt={a.user.name ?? ""} className="w-7 h-7 rounded-full" />
                          ) : (
                            <div className="w-7 h-7 rounded-full bg-violet-200 dark:bg-violet-800 flex items-center justify-center text-violet-700 dark:text-violet-300 text-xs font-bold">
                              {(a.user.name ?? a.user.email ?? "?")[0].toUpperCase()}
                            </div>
                          )}
                          <div>
                            <p className="font-medium text-slate-900 dark:text-white">{a.user.name ?? "Unknown"}</p>
                            <p className="text-xs text-slate-400">{a.user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="text-center px-4 py-3">
                        {a.status === "PRESENT" ? (
                          <div className="inline-flex items-center gap-1.5 text-green-600 dark:text-green-400">
                            <CheckCircle className="w-4 h-4" />
                            <span className="text-xs font-semibold">Present</span>
                          </div>
                        ) : (
                          <div className="inline-flex items-center gap-1.5 text-red-500 dark:text-red-400">
                            <XCircle className="w-4 h-4" />
                            <span className="text-xs font-semibold">Absent</span>
                          </div>
                        )}
                      </td>
                      <td className="text-center px-4 py-3">
                        {a.quizScore !== null ? (
                          <span className={`text-sm font-bold ${
                            a.quizScore >= 75 ? "text-green-600 dark:text-green-400"
                            : a.quizScore >= 50 ? "text-amber-600 dark:text-amber-400"
                            : "text-red-500 dark:text-red-400"
                          }`}>
                            {a.quizScore}%
                          </span>
                        ) : (
                          <span className="text-slate-400 text-xs">—</span>
                        )}
                      </td>
                      <td className="text-center px-4 py-3 text-xs text-slate-500 dark:text-slate-400">
                        {a.completedAt
                          ? new Date(a.completedAt).toLocaleTimeString("en-PK", { hour: "2-digit", minute: "2-digit" })
                          : "—"}
                      </td>
                      <td className="text-center px-4 py-3">
                        <Link
                          href={`/admin/students/${a.user.id}`}
                          className="text-xs text-violet-600 dark:text-violet-400 hover:underline"
                        >
                          Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
