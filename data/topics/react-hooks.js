export const reactHooksContent = {
  slug: "react-hooks",
  briefDescription: [
    "React Hooks are functions that let functional components use state and lifecycle features. The two most fundamental hooks are useState (manage state) and useEffect (handle side effects). A side effect is anything that affects something outside the component: fetching data, setting up subscriptions, changing the document title, or directly manipulating the DOM. useEffect(fn, deps) runs fn after the component renders. The deps array controls when it re-runs: empty [] means run once on mount only; [value] means re-run whenever value changes; no array means re-run after every render.",
    "The cleanup function returned from useEffect runs before the component unmounts and before the effect re-runs. This prevents memory leaks by clearing timers, cancelling subscriptions, and aborting fetch requests. The useRef hook serves two purposes: storing a mutable value that doesn't trigger re-renders (like a timer ID or previous value), and accessing DOM elements directly (const inputRef = useRef(); <input ref={inputRef} /> — then call inputRef.current.focus()). Unlike state, changing ref.current doesn't cause a re-render. useMemo memoizes an expensive computed value; useCallback memoizes a function reference.",
    "Rules of Hooks (enforced by ESLint): 1) Only call hooks at the top level — never inside conditions, loops, or nested functions. 2) Only call hooks from React functional components or custom hooks, not regular JavaScript functions. Custom hooks are functions whose names start with 'use' that call other hooks internally — they let you extract reusable stateful logic (e.g., useFetch, useLocalStorage, useWindowSize). When you write a custom hook, you can share the hook logic across multiple components without changing the component hierarchy. The react-hooks ESLint plugin catches hook rule violations automatically.",
  ],
  keyConcepts: [
    "useEffect(fn, []) — run fn once on mount (like componentDidMount)",
    "useEffect(fn, [dep]) — run fn when dep changes (like componentDidUpdate)",
    "useEffect(fn) — run fn after every render (no dependency array)",
    "Cleanup: return a function from useEffect — runs on unmount and before re-run",
    "Abort controller: cancel fetch requests in useEffect cleanup to prevent memory leaks",
    "useRef(initialValue): .current holds a mutable value without causing re-renders",
    "ref={myRef}: attach to a DOM element — access it via myRef.current",
    "useMemo(fn, deps): memoize expensive computed value, recalculate only when deps change",
    "useCallback(fn, deps): memoize function reference — prevents child re-renders",
    "Rules of Hooks: only call at top level, only call from React functions or custom hooks",
    "Custom hook: function useSomething() { } — name starts with 'use', can call other hooks",
    "Custom hook benefit: share stateful logic across components without changing component tree",
  ],
  codeExample: {
    language: "jsx",
    title: "useEffect Data Fetching, Cleanup, useRef, useMemo, Custom Hook",
    code: `import { useState, useEffect, useRef, useMemo, useCallback } from 'react'

// ── useEffect: fetch data on mount ──
function UserProfile({ userId }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()  // for cleanup

    async function fetchUser() {
      try {
        setLoading(true)
        const res = await fetch(\`/api/users/\${userId}\`, {
          signal: controller.signal,
        })
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        setUser(data)
      } catch (err) {
        if (err.name !== 'AbortError') setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()

    // Cleanup: cancel fetch if userId changes or component unmounts
    return () => controller.abort()
  }, [userId])  // re-run whenever userId changes

  if (loading) return <div>Loading...</div>
  if (error)   return <div>Error: {error}</div>
  if (!user)   return null

  return <div>{user.name}</div>
}

// ── useRef: focus input on mount ──
function SearchBar() {
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()  // focus on mount
  }, [])

  return <input ref={inputRef} placeholder="Search..." />
}

// ── useRef: store mutable value without re-render ──
function Timer() {
  const [seconds, setSeconds] = useState(0)
  const intervalRef = useRef(null)  // holds timer ID without triggering re-renders

  function start() {
    if (intervalRef.current) return  // already running
    intervalRef.current = setInterval(() => setSeconds(s => s + 1), 1000)
  }

  function stop() {
    clearInterval(intervalRef.current)
    intervalRef.current = null
  }

  useEffect(() => () => clearInterval(intervalRef.current), [])  // cleanup on unmount

  return (
    <div>
      <span>{seconds}s</span>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
    </div>
  )
}

// ── useMemo: expensive calculation ──
function ProductList({ products, filterText }) {
  // Only re-filters when products or filterText changes
  const filtered = useMemo(() =>
    products.filter(p =>
      p.name.toLowerCase().includes(filterText.toLowerCase())
    ),
    [products, filterText]
  )

  return <ul>{filtered.map(p => <li key={p.id}>{p.name}</li>)}</ul>
}

// ── Custom hook: useLocalStorage ──
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key)
      return stored ? JSON.parse(stored) : initialValue
    } catch {
      return initialValue
    }
  })

  const set = useCallback((newValue) => {
    setValue(newValue)
    localStorage.setItem(key, JSON.stringify(newValue))
  }, [key])

  return [value, set]
}

// Usage of custom hook
function ThemeToggle() {
  const [theme, setTheme] = useLocalStorage('theme', 'light')
  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Switch to {theme === 'light' ? 'dark' : 'light'} mode
    </button>
  )
}`,
  },
}
