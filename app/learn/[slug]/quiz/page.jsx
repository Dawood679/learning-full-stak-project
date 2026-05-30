import { notFound } from "next/navigation"
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { QuizContainer } from "@/components/quiz/QuizContainer"
import { ArrowLeft, Database } from "lucide-react"

async function getTopicWithQuestions(slug) {
  try {
    const topic = await prisma.topic.findUnique({
      where: { slug },
      include: {
        questions: {
          orderBy: { order: "asc" },
        },
      },
    })
    return { topic, error: null }
  } catch {
    return { topic: null, error: "db_not_connected" }
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  return { title: `Quiz — ${slug}` }
}

export default async function QuizPage({ params }) {
  const { slug } = await params
  const { topic, error } = await getTopicWithQuestions(slug)

  // DB is down — show a friendly message
  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-2xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mx-auto mb-5">
            <Database className="w-8 h-8 text-amber-600 dark:text-amber-400" />
          </div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
            Database not connected
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6">
            Quiz questions are stored in the database. Connect a Neon DB and run{" "}
            <code className="font-mono bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-xs">
              npm run db:seed
            </code>{" "}
            to enable quizzes.
          </p>
          <Link
            href={`/learn/${slug}`}
            className="inline-flex items-center gap-2 text-sm text-violet-600 dark:text-violet-400 hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to topic
          </Link>
        </div>
      </div>
    )
  }

  if (!topic) notFound()
  if (topic.questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-500 dark:text-slate-400 text-lg mb-4">
            No questions available for this topic yet.
          </p>
          <Link href={`/learn/${slug}`} className="text-violet-600 dark:text-violet-400 hover:underline">
            ← Back to topic
          </Link>
        </div>
      </div>
    )
  }

  // Serialize for client component
  const questions = JSON.parse(JSON.stringify(topic.questions))

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <div className="bg-white dark:bg-gray-950 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center justify-between">
            <Link
              href={`/learn/${slug}`}
              className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to {topic.title}
            </Link>
            <div className="text-sm text-slate-500 dark:text-slate-400">
              {topic.questions.length} questions
            </div>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mt-3">
            {topic.title} Quiz
          </h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <QuizContainer
          questions={questions}
          slug={slug}
          topicTitle={topic.title}
        />
      </div>
    </div>
  )
}
