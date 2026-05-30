"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"

export function CodeExample({ title, language, code }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-950">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-700/60">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/70" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <div className="w-3 h-3 rounded-full bg-green-500/70" />
          </div>
          <span className="text-xs text-slate-400 font-mono">{title}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-500 font-mono uppercase">{language}</span>
          <button
            onClick={handleCopy}
            className="text-slate-500 hover:text-slate-300 transition-colors"
            title="Copy code"
          >
            {copied ? (
              <Check className="w-4 h-4 text-emerald-400" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
      {/* Code */}
      <pre className="p-5 overflow-x-auto text-sm leading-relaxed">
        <code className="text-slate-200 font-mono">{code}</code>
      </pre>
    </div>
  )
}
