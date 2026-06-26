export const reactRouterContent = {
  slug: "react-router",
  briefDescription: [
    "React Router is the standard routing library for React single-page applications. It keeps the URL in sync with the UI without full page reloads. Install with npm install react-router-dom. Wrap your app in BrowserRouter (or RouterProvider for the newer Data API). Define routes with Route components — each Route has a path and element. The Routes component holds your Route definitions and renders the first match. Nested routes let you build layout-based routing: a parent route renders a shell (like a navbar + sidebar) and child routes render into its Outlet component.",
    "Navigation is handled with the Link and NavLink components instead of <a> tags — they prevent full page reloads and update the URL using the History API. NavLink is like Link but automatically adds an active class when its path matches the current URL. The useNavigate hook gives you a navigate function for programmatic navigation: navigate('/dashboard') after form submission, or navigate(-1) to go back. The useParams hook extracts URL parameters from dynamic routes (like /users/:id → useParams().id). The useSearchParams hook reads and writes query string parameters (?tab=settings).",
    "Protected routes guard pages that require authentication. The pattern is simple: create a wrapper component (PrivateRoute) that checks if the user is logged in — if yes, render the child (<Outlet />); if no, redirect to /login using <Navigate to='/login' replace />. The replace option prevents the user from navigating back to the protected route after login. Error boundaries and 404 handling use a catch-all path='*' route. React Router v6 also introduced data loading (loader functions) and form mutations (action functions) as part of the Remix-inspired Data API for full-stack-style routing.",
  ],
  keyConcepts: [
    "BrowserRouter: wraps the app; uses the HTML5 History API for clean URLs",
    "<Routes> + <Route path='/' element={<Home />} >: define URL → component mapping",
    "Nested routes: parent renders <Outlet />, child routes render inside it",
    "<Link to='/path'>: navigate without page reload (replaces <a href>)",
    "<NavLink to='/path'>: like Link but adds active class when path matches",
    "useNavigate(): programmatic navigation — navigate('/path') or navigate(-1) for back",
    "useParams(): access URL params — Route path='/users/:id' → useParams().id",
    "useSearchParams(): read/write query strings — ?tab=profile → searchParams.get('tab')",
    "useLocation(): current location object — pathname, search, state",
    "Protected route: check auth, render <Outlet /> or <Navigate to='/login' replace />",
    "<Navigate to='/path' replace />: redirect without adding to history",
    "path='*' catch-all route: renders for any unmatched URL (404 page)",
  ],
  codeExample: {
    language: "jsx",
    title: "React Router v6 — Routes, Nested Routes, useParams, useNavigate, Protected Routes",
    code: `import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  NavLink,
  Outlet,
  Navigate,
  useParams,
  useNavigate,
  useSearchParams,
} from 'react-router-dom'

// ── Layout with persistent Navbar ──
function AppLayout() {
  return (
    <div>
      <nav>
        <NavLink to="/"        className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
        <NavLink to="/blog"    className={({ isActive }) => isActive ? 'active' : ''}>Blog</NavLink>
        <NavLink to="/profile" className={({ isActive }) => isActive ? 'active' : ''}>Profile</NavLink>
      </nav>
      <main>
        <Outlet />  {/* child routes render here */}
      </main>
    </div>
  )
}

// ── Dynamic route with useParams ──
function BlogPost() {
  const { id } = useParams()  // /blog/:id → id = "42"
  const [post, setPost] = useState(null)

  useEffect(() => {
    fetch(\`/api/posts/\${id}\`).then(r => r.json()).then(setPost)
  }, [id])

  return post ? <article><h1>{post.title}</h1><p>{post.body}</p></article> : <p>Loading...</p>
}

// ── Search params ──
function BlogList() {
  const [searchParams, setSearchParams] = useSearchParams()
  const category = searchParams.get('category') ?? 'all'

  return (
    <div>
      <div>
        {['all', 'tech', 'design'].map(cat => (
          <button key={cat} onClick={() => setSearchParams({ category: cat })}>
            {cat}
          </button>
        ))}
      </div>
      <p>Showing: {category}</p>
    </div>
  )
}

// ── Programmatic navigation ──
function LoginForm() {
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    await loginUser(/* form data */)
    navigate('/dashboard', { replace: true })  // replace so back button skips login
  }

  return <form onSubmit={handleSubmit}>/* ... */</form>
}

// ── Protected Route ──
function RequireAuth({ children }) {
  const { user } = useAuth()
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }
  return children  // or <Outlet /> if using nested routes
}

// ── App routes ──
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="blog" element={<BlogList />} />
          <Route path="blog/:id" element={<BlogPost />} />
          <Route path="login" element={<LoginForm />} />

          {/* Protected routes */}
          <Route element={<RequireAuth><Outlet /></RequireAuth>}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="profile"   element={<Profile />} />
            <Route path="settings"  element={<Settings />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}`,
  },
}
