export const reactContent = {
  slug: "react",
  briefDescription: [
    "React is a JavaScript library for building user interfaces through a component-based architecture. Components are reusable, self-contained pieces of UI that manage their own state and can be composed to build complex applications.",
    "React's virtual DOM diffing algorithm (reconciliation) efficiently updates the real DOM by computing the minimal set of changes needed, making updates fast even for complex UIs.",
    "React Hooks (useState, useEffect, useContext, useMemo, useCallback, useRef) enable functional components to use state and side effects, replacing class components in modern React development.",
  ],
  keyConcepts: [
    "JSX — JavaScript XML syntax extension",
    "useState and useReducer for state management",
    "useEffect for side effects and lifecycle events",
    "useContext for global state without prop drilling",
    "useMemo and useCallback for performance optimization",
    "Component composition and the children prop",
    "Controlled vs uncontrolled components (forms)",
    "React.memo for preventing unnecessary re-renders",
  ],
  codeExample: {
    language: "jsx",
    title: "Custom Hook + Context Pattern",
    code: `// Custom hook for async data fetching
function useFetch(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const res = await fetch(url)
        const json = await res.json()
        if (!cancelled) setData(json)
      } catch (err) {
        if (!cancelled) setError(err.message)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => { cancelled = true }
  }, [url])

  return { data, loading, error }
}

// Context for theme
const ThemeContext = createContext('light')

function App() {
  const [theme, setTheme] = useState('light')
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Layout />
    </ThemeContext.Provider>
  )
}`,
  },
}
