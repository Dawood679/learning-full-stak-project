import { prisma } from "@/lib/prisma"
import { TopicsGrid } from "@/components/learn/TopicsGrid"
import { DBSetupBanner } from "@/components/DBSetupBanner"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "All Topics",
  description: "Browse all 24 web development topics — from HTML to Kubernetes.",
}

async function getTopics() {
  try {
    const topics = await prisma.topic.findMany({
      orderBy: { order: "asc" },
      include: { _count: { select: { questions: true } } },
    })
    return { topics, error: null }
  } catch {
    return { topics: [], error: "db_not_connected" }
  }
}

export default async function LearnPage() {
  const { topics, error } = await getTopics()

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#07070f]">
      {/* Header */}
      <div className="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">
            All Topics
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            {error ? "24 topics across 6 categories" : `${topics.length} topics across 6 categories — pick one and start learning`}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {error ? (
          <DBSetupBanner />
        ) : (
          <TopicsGrid topics={JSON.parse(JSON.stringify(topics))} />
        )}
      </div>
    </div>
  )
}
