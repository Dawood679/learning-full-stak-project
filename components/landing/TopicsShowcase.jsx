import Link from "next/link"
import {
  Code2, Paintbrush, Braces, Layers, Triangle,
  Server, Globe, Table2, DatabaseZap, Leaf, Database,
  Wand2, GitBranch, Clock, ListTodo, Radio, Wifi, Video,
  Activity, Container, Cloud, GitMerge, Hexagon, Rocket, ArrowRight
} from "lucide-react"
import { CATEGORIES } from "@/data/categories"
import { CATEGORY_COLORS } from "@/lib/constants"

const ICON_MAP = {
  Code2, Paintbrush, Braces, Layers, Triangle, Server, Globe,
  Table2, DatabaseZap, Leaf, Database, Wand2, GitBranch,
  Clock, ListTodo, Radio, Wifi, Video, Activity,
  Container, Cloud, GitMerge, Hexagon, Rocket,
}

const CATEGORY_TOPICS = {
  FRONTEND: [
    { slug: "html",       title: "HTML",       icon: "Code2" },
    { slug: "css",        title: "CSS",        icon: "Paintbrush" },
    { slug: "javascript", title: "JavaScript", icon: "Braces" },
    { slug: "react",      title: "React",      icon: "Layers" },
    { slug: "nextjs",     title: "Next.js",    icon: "Triangle" },
  ],
  BACKEND: [
    { slug: "nodejs",   title: "Node.js",    icon: "Server" },
    { slug: "express",  title: "Express.js", icon: "Globe" },
  ],
  DATABASES: [
    { slug: "sql-fundamentals", title: "SQL",         icon: "Table2" },
    { slug: "nosql-concepts",   title: "NoSQL",        icon: "DatabaseZap" },
    { slug: "mongodb",          title: "MongoDB",      icon: "Leaf" },
    { slug: "postgresql",       title: "PostgreSQL",   icon: "Database" },
    { slug: "prisma-orm",       title: "Prisma ORM",   icon: "Wand2" },
    { slug: "mongoose",         title: "Mongoose",     icon: "GitBranch" },
  ],
  ADVANCED_BACKEND: [
    { slug: "cron-jobs",      title: "Cron Jobs",  icon: "Clock" },
    { slug: "bullmq",         title: "BullMQ",     icon: "ListTodo" },
    { slug: "pubsub-pattern", title: "Pub/Sub",    icon: "Radio" },
    { slug: "websockets",     title: "WebSockets", icon: "Wifi" },
    { slug: "webrtc",         title: "WebRTC",     icon: "Video" },
  ],
  INFRASTRUCTURE: [
    { slug: "process-management", title: "Process Mgmt", icon: "Activity" },
    { slug: "docker",             title: "Docker",        icon: "Container" },
    { slug: "aws-ec2",            title: "AWS EC2",       icon: "Cloud" },
    { slug: "jenkins",            title: "Jenkins",       icon: "GitMerge" },
  ],
  CLOUD_DEVOPS: [
    { slug: "kubernetes", title: "Kubernetes", icon: "Hexagon" },
    { slug: "devops",     title: "DevOps",     icon: "Rocket" },
  ],
}

export function TopicsShowcase() {
  return (
    <section id="topics" className="py-20 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-violet-600 dark:text-violet-400 uppercase tracking-widest mb-3">
            24 topics
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4">
            Everything You Need to Learn
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            Covering the complete modern web development stack — from basics to production DevOps.
          </p>
        </div>

        <div className="space-y-10">
          {CATEGORIES.map((category) => {
            const colors = CATEGORY_COLORS[category.id]
            const topics = CATEGORY_TOPICS[category.id] || []

            return (
              <div key={category.id}>
                {/* Category header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide ${colors.badge}`}>
                      {category.label}
                    </div>
                    <span className="text-xs text-slate-400 dark:text-slate-500">
                      {topics.length} topics
                    </span>
                  </div>
                  <Link
                    href={`/learn?category=${category.id}`}
                    className={`hidden sm:flex items-center gap-1 text-xs font-semibold ${colors.icon} hover:underline`}
                  >
                    View all
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>

                {/* Topic pills */}
                <div className="flex flex-wrap gap-2.5">
                  {topics.map((topic) => {
                    const Icon = ICON_MAP[topic.icon] || Code2
                    return (
                      <Link
                        key={topic.slug}
                        href={`/learn/${topic.slug}`}
                        className={`group flex items-center gap-2 px-4 py-2 rounded-xl border ${colors.border} ${colors.bg} dark:border-slate-700/60 dark:bg-slate-800/60 hover:shadow-md hover:-translate-y-0.5 transition-all duration-150`}
                      >
                        <Icon className={`w-4 h-4 ${colors.icon}`} />
                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-white">
                          {topic.title}
                        </span>
                      </Link>
                    )
                  })}
                </div>

                {/* Divider */}
                <div className="mt-10 h-px bg-slate-100 dark:bg-slate-800/60" />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
