export const reactJsxContent = {
  slug: "react-jsx",
  briefDescription: [
    "JSX (JavaScript XML) is a syntax extension that lets you write HTML-like code inside JavaScript. It's not real HTML — Babel compiles JSX down to React.createElement() calls. Rules: every JSX element must be closed (self-closing tags like <img /> or wrapping tags), you can only return ONE root element per component (use a <div>, or an empty fragment <> </> to avoid adding extra DOM nodes), JavaScript expressions go inside curly braces {}, and you use className instead of class and htmlFor instead of for because class and for are reserved JavaScript keywords.",
    "Components are the building blocks of React. A functional component is a JavaScript function that accepts a props object and returns JSX. By convention, component names start with a capital letter (PascalCase) — React uses this to distinguish components from HTML elements (lowercase = HTML element, PascalCase = component). Props (short for properties) let you pass data into a component from outside. Inside the component, you access them via the props parameter or by destructuring directly: ({ name, age }) => { }. Props are read-only — a component should never modify its own props.",
    "Rendering lists in JSX uses the JavaScript array .map() method. Each item in the rendered list MUST have a unique key prop — React uses this internally to efficiently track which items changed, were added, or removed. The key should be a stable, unique identifier (like a database ID), not the array index (unless the list never reorders). Conditional rendering uses JavaScript expressions: the ternary operator (condition ? <A /> : <B />), short-circuit evaluation (condition && <Component />), or an early return from the component function. You can also switch between components using variables.",
  ],
  keyConcepts: [
    "JSX compiles to React.createElement() — Babel transforms it before it runs",
    "Self-closing tags: <img />, <input />, <br /> — all JSX tags must close",
    "Single root element per return — use <> </> (Fragment) to avoid extra DOM nodes",
    "className instead of class; htmlFor instead of for (JS reserved words)",
    "{expression} — curly braces for any JS expression in JSX",
    "Functional component: const MyComp = (props) => <div>{props.title}</div>",
    "Props: data passed into components from parent; accessed via props.name or destructuring",
    "Props are read-only — never mutate props inside a component",
    "list.map(item => <li key={item.id}>{item.name}</li>) — render a list",
    "key prop: unique, stable ID per list item — NOT array index if list can reorder",
    "Ternary: {isLoggedIn ? <Dashboard /> : <Login />} — conditional rendering",
    "Short-circuit: {isAdmin && <AdminPanel />} — render only when condition is truthy",
  ],
  codeExample: {
    language: "jsx",
    title: "JSX Rules, Components, Props, List Rendering, Conditional Rendering",
    code: `// ── Functional component with props ──
function UserCard({ name, role, avatar, isOnline = false }) {
  return (
    <div className="user-card">
      <img src={avatar} alt={name} className="avatar" />
      <div className="user-info">
        <h3>{name}</h3>
        <span className={\`badge \${role === 'admin' ? 'badge--admin' : 'badge--user'}\`}>
          {role}
        </span>
        {/* Conditional rendering with && */}
        {isOnline && <span className="online-dot" />}
      </div>
    </div>
  )
}

// ── List rendering ──
function UserList({ users }) {
  if (users.length === 0) {
    return <p>No users found.</p>  // early return for empty state
  }

  return (
    <ul className="user-list">
      {users.map((user) => (
        <li key={user.id}>   {/* key must be on the outermost element */}
          <UserCard
            name={user.name}
            role={user.role}
            avatar={user.avatar}
            isOnline={user.isOnline}
          />
        </li>
      ))}
    </ul>
  )
}

// ── Conditional rendering with ternary ──
function AuthButton({ isLoggedIn, onLogin, onLogout }) {
  return (
    <div>
      {isLoggedIn ? (
        <button onClick={onLogout} className="btn btn--danger">
          Log Out
        </button>
      ) : (
        <button onClick={onLogin} className="btn btn--primary">
          Log In
        </button>
      )}
    </div>
  )
}

// ── Fragment to avoid extra div ──
function MetaTags({ title, description }) {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
    </>
  )
}

// ── Using the components ──
const users = [
  { id: 1, name: 'Ali Ahmed', role: 'admin', avatar: '/ali.jpg', isOnline: true },
  { id: 2, name: 'Sara Khan', role: 'user',  avatar: '/sara.jpg', isOnline: false },
  { id: 3, name: 'Omar Malik', role: 'user', avatar: '/omar.jpg', isOnline: true },
]

function App() {
  return (
    <main className="app">
      <h1>Team Members</h1>
      <UserList users={users} />
      <AuthButton
        isLoggedIn={true}
        onLogin={() => console.log('logging in')}
        onLogout={() => console.log('logging out')}
      />
    </main>
  )
}`,
  },
}
