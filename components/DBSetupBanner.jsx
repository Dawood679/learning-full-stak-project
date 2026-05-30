import Link from "next/link"
import { Database, Terminal, ExternalLink, AlertCircle } from "lucide-react"

export function DBSetupBanner() {
  return (
    <div className="max-w-2xl mx-auto py-10">
      {/* Alert card */}
      <div className="rounded-2xl border border-amber-200 dark:border-amber-800/50 bg-amber-50 dark:bg-amber-950/20 p-6 mb-8">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center shrink-0 mt-0.5">
            <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <h2 className="font-bold text-amber-900 dark:text-amber-200 text-base mb-1">
              Database not connected
            </h2>
            <p className="text-amber-800 dark:text-amber-300 text-sm leading-relaxed">
              The app can&apos;t reach the database. Follow the steps below to connect
              a free Neon PostgreSQL database and seed it with all 24 topics.
            </p>
          </div>
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-5">
        {/* Step 1 */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-7 h-7 rounded-full bg-violet-100 dark:bg-violet-900/40 flex items-center justify-center text-violet-700 dark:text-violet-300 text-xs font-black">
              1
            </span>
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-slate-500" />
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                Create a free Neon database
              </h3>
            </div>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-sm mb-3 leading-relaxed">
            Go to{" "}
            <a
              href="https://neon.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="text-violet-600 dark:text-violet-400 hover:underline inline-flex items-center gap-0.5"
            >
              neon.tech <ExternalLink className="w-3 h-3" />
            </a>
            , sign up for free, create a new project, and copy the
            &ldquo;Connection string&rdquo; from the dashboard.
          </p>
        </div>

        {/* Step 2 */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-7 h-7 rounded-full bg-violet-100 dark:bg-violet-900/40 flex items-center justify-center text-violet-700 dark:text-violet-300 text-xs font-black">
              2
            </span>
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-slate-500" />
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                Update <code className="font-mono bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-xs">.env.local</code>
              </h3>
            </div>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-sm mb-3">
            Open <code className="font-mono bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-xs">.env.local</code> in the project root and replace the placeholder:
          </p>
          <pre className="bg-slate-950 dark:bg-black/60 text-emerald-400 text-xs rounded-xl p-4 overflow-x-auto">
{`DATABASE_URL="postgresql://user:pass@host/db?sslmode=require"`}
          </pre>
        </div>

        {/* Step 3 */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-7 h-7 rounded-full bg-violet-100 dark:bg-violet-900/40 flex items-center justify-center text-violet-700 dark:text-violet-300 text-xs font-black">
              3
            </span>
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-slate-500" />
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                Push schema &amp; seed data
              </h3>
            </div>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-sm mb-3">
            Run these commands in your terminal (restart the dev server after):
          </p>
          <pre className="bg-slate-950 dark:bg-black/60 text-emerald-400 text-xs rounded-xl p-4 overflow-x-auto">
{`npm run db:push   # pushes schema to Neon
npm run db:seed   # seeds 24 topics + ~170 questions`}
          </pre>
        </div>
      </div>

      <p className="text-center text-xs text-slate-400 dark:text-slate-500 mt-6">
        After restarting the dev server the topics will appear here automatically.
      </p>
    </div>
  )
}
