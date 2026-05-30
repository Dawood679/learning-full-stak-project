import Link from "next/link"
import { Code2, ExternalLink } from "lucide-react"

const categories = [
  { name: "Frontend",          href: "/learn?category=FRONTEND" },
  { name: "Backend",           href: "/learn?category=BACKEND" },
  { name: "Databases",         href: "/learn?category=DATABASES" },
  { name: "Advanced Backend",  href: "/learn?category=ADVANCED_BACKEND" },
  { name: "Infrastructure",    href: "/learn?category=INFRASTRUCTURE" },
  { name: "Cloud & DevOps",    href: "/learn?category=CLOUD_DEVOPS" },
]

export function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800/60 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5 font-black text-lg mb-3">
              <div className="w-8 h-8 rounded-xl bg-violet-600 flex items-center justify-center">
                <Code2 className="w-4 h-4 text-white" />
              </div>
              <span className="gradient-text">DevOnix</span>
            </Link>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mt-2">
              Learn web development, backend, databases, and DevOps through concise explanations and interactive quizzes.
            </p>
          </div>

          {/* Topics */}
          <div>
            <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-4 text-xs uppercase tracking-widest">
              Topics
            </h3>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat.name}>
                  <Link
                    href={cat.href}
                    className="text-sm text-slate-500 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-4 text-xs uppercase tracking-widest">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-slate-500 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/learn" className="text-sm text-slate-500 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                  All Topics
                </Link>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-10 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400 dark:text-slate-500">
            © 2024 DevOnix. Built for developers, by developers.
          </p>
          <a
            href="https://github.com/Dawood679"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            GitHub
          </a>
        </div>
      </div>
    </footer>
  )
}
