"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"

/**
 * Locomotive Scroll v5 wrapper (built on Lenis).
 * Initialises smooth inertia scrolling on mount and cleans up on unmount.
 * Re-initialises automatically on every route change so each page starts fresh.
 */
export function SmoothScroll({ children }) {
  const pathname   = usePathname()
  const scrollRef  = useRef(null)

  useEffect(() => {
    // Guard: don't run on server
    if (typeof window === "undefined") return

    let instance = null
    let destroyed = false

    async function init() {
      const LocomotiveScroll = (await import("locomotive-scroll")).default
      if (destroyed) return            // component unmounted before import finished

      instance = new LocomotiveScroll({
        lenisOptions: {
          lerp: 0.08,                  // 0 = instant, 1 = never arrives — 0.08 is silky
          smoothWheel: true,
          wheelMultiplier: 0.9,
          touchMultiplier: 1.5,
          infinite: false,
        },
      })
    }

    init()

    return () => {
      destroyed = true
      if (instance) instance.destroy()
    }
  }, [pathname])   // re-run on every route change

  return <>{children}</>
}
