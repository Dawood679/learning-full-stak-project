import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { TOPICS_MAP, TOPIC_STUBS } from "@/data/index"
import { TopicHeader } from "@/components/topic/TopicHeader"
import { ConceptExplanation } from "@/components/topic/ConceptExplanation"
import { KeyConceptsList } from "@/components/topic/KeyConceptsList"
import { CodeExample } from "@/components/topic/CodeExample"
import { StartQuizButton } from "@/components/topic/StartQuizButton"
import { Brain, Database } from "lucide-react"
import Link from "next/link"

export const dynamic = "force-dynamic"

export async function generateMetadata({ params }) {
  const { slug } = await params
  const content = TOPICS_MAP[slug]
  if (!content) return {}
  return {
    title: `${content.briefDescription[0].split("(")[0].trim().split(" ").slice(0, 4).join(" ")} | DevOnix`,
  }
}

async function getTopic(slug) {
  try {
    const topic = await prisma.topic.findUnique({
      where: { slug },
      include: { _count: { select: { questions: true } } },
    })
    return { topic, error: null }
  } catch {
    return { topic: null, error: "db_not_connected" }
  }
}

export default async function TopicDetailPage({ params }) {
  const { slug } = await params
  const content = TOPICS_MAP[slug]

  if (!content) notFound()

  const { topic, error } = await getTopic(slug)

  // DB not connected — still show static content using stub metadata
  const dbDown = !!error
  const questionCount = topic?._count?.questions ?? 0

  // Use real DB topic when available; fall back to static stub so TopicHeader
  // never receives null and never crashes on topic.category / topic.icon etc.
  const displayTopic = topic ?? { ...TOPIC_STUBS[slug], _count: { questions: 0 } }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <TopicHeader topic={displayTopic} questionCount={questionCount} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Explanation */}
            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                Overview
              </h2>
              <ConceptExplanation paragraphs={content.briefDescription} />
            </section>

            {/* Code Example */}
            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                Code Example
              </h2>
              <CodeExample
                title={content.codeExample.title}
                language={content.codeExample.language}
                code={content.codeExample.code}
              />
            </section>

            {/* Quiz CTA */}
            {dbDown ? (
              <section className="rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Database className="w-5 h-5 text-amber-500" />
                  <h2 className="text-base font-bold text-amber-900 dark:text-amber-200">
                    Quiz unavailable — DB not connected
                  </h2>
                </div>
                <p className="text-amber-800 dark:text-amber-300 text-sm leading-relaxed">
                  Connect a Neon database and run{" "}
                  <code className="font-mono bg-amber-100 dark:bg-amber-900/40 px-1.5 py-0.5 rounded text-xs">
                    npm run db:seed
                  </code>{" "}
                  to unlock quizzes.{" "}
                  <Link href="/learn" className="underline hover:text-amber-900 dark:hover:text-amber-100">
                    Setup guide →
                  </Link>
                </p>
              </section>
            ) : questionCount > 0 ? (
              <section className="rounded-2xl bg-linear-to-br from-violet-50 to-indigo-50 dark:from-violet-950/30 dark:to-indigo-950/30 border border-violet-100 dark:border-violet-800/30 p-8">
                <div className="flex items-center gap-3 mb-3">
                  <Brain className="w-6 h-6 text-violet-600 dark:text-violet-400" />
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    Test Your Knowledge
                  </h2>
                </div>
                <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm leading-relaxed">
                  Ready to test what you&apos;ve learned? Take the quiz with {questionCount} questions and see your score.
                </p>
                <StartQuizButton slug={slug} questionCount={questionCount} />
              </section>
            ) : null}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="sticky top-24">
              {/* Key concepts */}
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
                <h3 className="font-bold text-slate-900 dark:text-white mb-4 text-sm uppercase tracking-wider">
                  Key Concepts
                </h3>
                <KeyConceptsList concepts={content.keyConcepts} />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
