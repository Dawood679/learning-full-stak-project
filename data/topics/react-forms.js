export const reactFormsContent = {
  slug: "react-forms",
  briefDescription: [
    "React forms come in two flavors: controlled and uncontrolled. In controlled forms, the input's value is bound to React state and every keystroke updates state via onChange — React is the single source of truth. In uncontrolled forms, you access the DOM element's value directly using a ref — useful for file inputs or integrating with non-React code. Controlled forms are the standard React pattern. Handle submission with onSubmit on the form element, call e.preventDefault() to stop the browser reload, then read values from state and send them to the API.",
    "React Hook Form is a popular library that minimizes re-renders and simplifies validation. You call useForm() to get a register function (to connect inputs), handleSubmit (to handle submission with validation), formState.errors (validation error messages), and watch (to read current field values reactively). Register an input by spreading register('fieldName', validationRules) onto it. Validation rules include required, minLength, maxLength, pattern (regex), min/max, and a custom validate function. Errors display when the field fails its rule.",
    "Performance optimization in React prevents unnecessary re-renders. React.memo wraps a component and only re-renders it if its props change (shallow comparison). useCallback memoizes a function reference so it doesn't change on every parent render (preventing child re-renders). useMemo memoizes a computed value. The React DevTools Profiler shows which components re-render and how long they take. Code splitting with React.lazy and Suspense loads components on demand — the bundle isn't downloaded until the component is first needed. Virtualization (react-window or @tanstack/react-virtual) renders only visible items in very long lists.",
  ],
  keyConcepts: [
    "Controlled input: value={state} onChange={e => setState(e.target.value)} — React owns the value",
    "e.preventDefault(): stop form from reloading the page on submit",
    "FormData: const data = new FormData(e.target) — alternative for reading all fields at once",
    "React Hook Form: useForm() → { register, handleSubmit, formState: { errors } }",
    "register('field', rules): connect input + set validation — spread onto the input element",
    "handleSubmit(onValid): wraps onSubmit — only calls onValid when all fields pass validation",
    "Validation rules: required, minLength, maxLength, pattern, min, max, validate",
    "errors.fieldName.message: display validation error for a specific field",
    "watch('fieldName'): reactively read current field value",
    "React.memo(Component): skip re-render if props haven't changed",
    "useCallback(fn, deps): stable function reference across renders",
    "React.lazy + Suspense: split code into chunks, load on demand",
  ],
  codeExample: {
    language: "jsx",
    title: "Controlled Form + React Hook Form with Validation + React.memo Performance",
    code: `import { useState } from 'react'
import { useForm } from 'react-hook-form'
import React, { memo, useCallback } from 'react'

// ── Controlled form (vanilla React) ──
function SignUpForm() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  function validate() {
    const errs = {}
    if (!formData.name.trim()) errs.name = 'Name is required'
    if (!formData.email.includes('@')) errs.email = 'Valid email required'
    if (formData.password.length < 8) errs.password = 'Min 8 characters'
    return errs
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }

    await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
    setSubmitted(true)
  }

  if (submitted) return <p>Account created!</p>

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          value={formData.name}
          onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
          placeholder="Full Name"
        />
        {errors.name && <p className="error">{errors.name}</p>}
      </div>
      <div>
        <input
          type="email"
          value={formData.email}
          onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
          placeholder="Email"
        />
        {errors.email && <p className="error">{errors.email}</p>}
      </div>
      <div>
        <input
          type="password"
          value={formData.password}
          onChange={e => setFormData(prev => ({ ...prev, password: e.target.value }))}
          placeholder="Password"
        />
        {errors.password && <p className="error">{errors.password}</p>}
      </div>
      <button type="submit">Create Account</button>
    </form>
  )
}

// ── React Hook Form (less boilerplate) ──
function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm()

  async function onSubmit(data) {
    try {
      await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
    } catch {
      setError('root', { message: 'Login failed. Try again.' })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('email', {
          required: 'Email is required',
          pattern: { value: /\\S+@\\S+/, message: 'Invalid email' }
        })}
        placeholder="Email"
      />
      {errors.email && <p>{errors.email.message}</p>}

      <input
        type="password"
        {...register('password', {
          required: 'Password is required',
          minLength: { value: 8, message: 'Min 8 characters' }
        })}
        placeholder="Password"
      />
      {errors.password && <p>{errors.password.message}</p>}

      {errors.root && <p className="error">{errors.root.message}</p>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Logging in...' : 'Login'}
      </button>
    </form>
  )
}

// ── Performance: React.memo ──
const ExpensiveItem = memo(function ExpensiveItem({ item, onDelete }) {
  console.log('renders:', item.id)  // only logs when item or onDelete changes
  return (
    <li>
      {item.name}
      <button onClick={() => onDelete(item.id)}>Delete</button>
    </li>
  )
})

function ItemList({ items }) {
  const [count, setCount] = useState(0)

  // useCallback prevents onDelete from changing reference on every render
  const handleDelete = useCallback((id) => {
    console.log('deleting:', id)
  }, [])

  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>Increment: {count}</button>
      <ul>
        {items.map(item => (
          <ExpensiveItem key={item.id} item={item} onDelete={handleDelete} />
        ))}
      </ul>
    </div>
  )
}`,
  },
}
