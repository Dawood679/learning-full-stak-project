export const reactContent = {
  slug: "react",
  briefDescription: [
    "React is a JavaScript library for building user interfaces using a component-based architecture. You set up React with Node.js installed and create a project using Vite (npm create vite@latest). Components are functions that return JSX (JavaScript XML) — a syntax that looks like HTML inside JavaScript. Key concepts: Components (naming must be PascalCase), Props (data flowing parent→child), State (internal data managed with useState that triggers re-renders), and the Virtual DOM (React's lightweight copy of the real DOM that enables fast, minimal updates).",
    "React Hooks power modern functional components. useState manages component state. useEffect handles side effects like data fetching, subscriptions, and timers — its dependency array controls when it re-runs (empty [] = once on mount). useContext provides global state without prop drilling. useRef accesses DOM elements directly without triggering re-renders. useMemo caches expensive calculations, useCallback caches function references — both prevent unnecessary re-renders in memoized child components (React.memo).",
    "React Router (react-router-dom) handles navigation in Single Page Applications. You define routes, navigate with <Link> or useNavigate(), read URL params with useParams(), and create nested routes for shared layouts. For global state management beyond Context, Redux Toolkit (createSlice, configureStore, useSelector, useDispatch) provides a predictable state container. React apps can be deployed to Vercel or Netlify, or upgraded to Next.js for server-side rendering.",
  ],
  keyConcepts: [
    "What is React: component-based UI, SPA vs MPA, Virtual DOM vs Real DOM reconciliation",
    "Setting up React with Vite, JSX syntax, Fragments, component naming rules",
    "Props: passing data parent→child, destructuring props, default values",
    "State: useState hook — state changes trigger re-renders",
    "useEffect: side effects, dependency array ([], [dep], omitted), cleanup function",
    "useContext + Context API: createContext, Provider, useContext for global state",
    "useRef: reference DOM elements, persist mutable values without re-render",
    "useMemo and useCallback: memoization to avoid unnecessary recalculations",
    "React.memo: skip re-render when props haven't changed (Higher-Order Component)",
    "React Router: BrowserRouter, Route, Link, useNavigate, useParams, nested routes",
    "Redux Toolkit: createSlice, configureStore, useSelector, useDispatch",
    "React forms: controlled inputs, onChange, onSubmit, event.preventDefault()",
  ],
  codeExample: {
    language: "jsx",
    title: "React Hooks: useState, useEffect, useContext, Custom Hook",
    code: `import { useState, useEffect, useContext, createContext, useCallback } from 'react'

// Context for global theme state
const ThemeContext = createContext()

// Custom hook to fetch data
function useFetch(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    fetch(url)
      .then(r => r.json())
      .then(d => { if (!cancelled) { setData(d); setLoading(false) } })
      .catch(e => { if (!cancelled) { setError(e.message); setLoading(false) } })
    return () => { cancelled = true }  // cleanup: avoid stale state
  }, [url])

  return { data, loading, error }
}

// A component that uses Context
function ThemeToggle() {
  const { theme, setTheme } = useContext(ThemeContext)
  return (
    <button onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}>
      Current: {theme}
    </button>
  )
}

// Main App
export default function App() {
  const [theme, setTheme] = useState('light')
  const [query, setQuery] = useState('react')
  const { data: posts, loading } = useFetch(\`/api/posts?q=\${query}\`)

  const handleSearch = useCallback((e) => {
    e.preventDefault()
    setQuery(e.target.search.value)
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={\`app \${theme}\`}>
        <ThemeToggle />
        <form onSubmit={handleSearch}>
          <input name="search" placeholder="Search posts..." />
          <button type="submit">Search</button>
        </form>
        {loading ? <p>Loading...</p> : (
          <ul>
            {posts?.map(post => (
              <li key={post.id}>{post.title}</li>
            ))}
          </ul>
        )}
      </div>
    </ThemeContext.Provider>
  )
}`,
  },
}
