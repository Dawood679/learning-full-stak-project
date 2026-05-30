"use client"

import { useEffect, useState, useRef } from "react"
import { Code2 } from "lucide-react"

export function LoadingScreen() {
  const [count, setCount]       = useState(0)
  const [hidden, setHidden]     = useState(false)
  const [exiting, setExiting]   = useState(false)
  const rafRef                  = useRef(null)
  const startRef                = useRef(null)

  useEffect(() => {
    // Only run on first visit per session
    const seen = sessionStorage.getItem("devonix_loaded")
    if (seen) {
      setHidden(true)
      return
    }

    const DURATION = 2200 // ms — total time to go 0 → 100

    function ease(t) {
      // Fast at start, slows near 100 (like a real loading bar)
      return t < 0.7
        ? t / 0.7 * 0.85          // 0–70% time → reaches 85%
        : 0.85 + ((t - 0.7) / 0.3) * 0.15  // last 30% time → 85–100%
    }

    function tick(ts) {
      if (!startRef.current) startRef.current = ts
      const elapsed = ts - startRef.current
      const progress = Math.min(elapsed / DURATION, 1)
      const value = Math.floor(ease(progress) * 100)
      setCount(value)

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        setCount(100)
        // Pause at 100 for a moment, then scroll the whole screen upward
        setTimeout(() => {
          setExiting(true)
          setTimeout(() => {
            setHidden(true)
            sessionStorage.setItem("devonix_loaded", "1")
          }, 850)
        }, 350)
      }
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  if (hidden) return null

  return (
    <div
      className="fixed inset-0 z-999 flex flex-col items-center justify-center bg-white dark:bg-[#07070f]"
      style={{
        transform: exiting ? "translateY(-100%)" : "translateY(0)",
        transition: exiting
          ? "transform 0.85s cubic-bezier(0.76, 0, 0.24, 1)"
          : "none",
        pointerEvents: exiting ? "none" : "auto",
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 mb-14">
        <div
          className="w-12 h-12 rounded-2xl bg-violet-600 flex items-center justify-center shadow-lg shadow-violet-500/40"
        >
          <Code2 className="w-6 h-6 text-white" />
        </div>
        <span
          className="text-2xl font-black gradient-text"
          style={{ letterSpacing: "-0.02em" }}
        >
          DevOnix
        </span>
      </div>

      {/* Counter */}
      <div className="relative mb-8 select-none">
        <span
          className="text-[6rem] font-black leading-none tabular-nums text-slate-900 dark:text-white"
          style={{ letterSpacing: "-0.04em" }}
        >
          {count}
        </span>
        <span
          className="absolute top-4 -right-8 text-3xl font-black text-violet-500"
        >
          %
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-48 h-[3px] bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{
            width: `${count}%`,
            background: "linear-gradient(to right, #7c3aed, #4f46e5)",
            transition: "width 80ms linear",
          }}
        />
      </div>

      {/* Tagline */}
      <p className="mt-6 text-xs text-slate-400 dark:text-slate-500 tracking-widest uppercase">
        {count < 40 ? "Preparing topics…"
          : count < 75 ? "Loading quizzes…"
          : count < 99 ? "Almost ready…"
          : "Let's go!"}
      </p>
    </div>
  )
}
