export const reactStateContent = {
  slug: "react-state",
  briefDescription: [
    "State is data that lives inside a component and can change over time. When state changes, React re-renders the component to reflect the new data in the UI. You manage state with the useState hook: const [value, setValue] = useState(initialValue). The first element is the current state value; the second is the setter function. Call the setter with the new value (or a function that receives the old value and returns the new one). Never mutate state directly — always use the setter. State updates are asynchronous — don't rely on reading state immediately after calling the setter.",
    "Props flow one direction: from parent to child. The parent owns data and passes it down; the child displays it. But children can communicate back up using callback props — the parent passes a function as a prop, and the child calls it when something happens (like a button click). This keeps data management in the parent and avoids complex data sharing. Props can be any JavaScript value: strings, numbers, booleans, arrays, objects, functions, or even JSX. When you omit a prop's value entirely (like <Button disabled />), it defaults to true.",
    "CSS-in-React has several approaches. Inline styles use a JavaScript object with camelCased property names: style={{ backgroundColor: 'blue', fontSize: '16px' }}. CSS Modules (.module.css files) scope styles to the component automatically — you import styles as an object and use styles.className. CSS-in-JS libraries like styled-components let you write actual CSS syntax inside template literals attached to components. Plain global CSS files imported directly still work but class names are global. The most common choice in new projects is CSS Modules or a utility-first framework like Tailwind CSS.",
  ],
  keyConcepts: [
    "useState(initialValue): returns [currentValue, setterFn] — manage component state",
    "Setter function: setValue(newValue) or setValue(prev => prev + 1) for derived updates",
    "State updates are async — don't read state right after setting it",
    "Never mutate state directly: push/splice on arrays or editing object fields won't re-render",
    "For arrays: spread into a new array — setArr([...arr, newItem]) not arr.push(newItem)",
    "For objects: spread to copy — setObj({ ...obj, field: newValue }) not obj.field = newValue",
    "Props: read-only data passed from parent to child",
    "Lifting state up: move shared state to the nearest common ancestor",
    "Callback props: parent passes a function, child calls it to communicate upward",
    "Controlled component: form input value is controlled by React state (value + onChange)",
    "Inline styles: style={{ camelCaseProperty: 'value' }} — double curly braces",
    "CSS Modules: import styles from './Button.module.css' then className={styles.btn}",
  ],
  codeExample: {
    language: "jsx",
    title: "useState, State Updates, Lifting State, Callback Props, Controlled Inputs",
    code: `import { useState } from 'react'

// ── Basic counter with useState ──
function Counter({ initialCount = 0 }) {
  const [count, setCount] = useState(initialCount)

  return (
    <div className="counter">
      <button onClick={() => setCount(prev => prev - 1)}>-</button>
      <span>{count}</span>
      <button onClick={() => setCount(prev => prev + 1)}>+</button>
      <button onClick={() => setCount(initialCount)}>Reset</button>
    </div>
  )
}

// ── Array state — never mutate directly ──
function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', done: true },
    { id: 2, text: 'Build a project', done: false },
  ])
  const [input, setInput] = useState('')

  function addTodo() {
    if (!input.trim()) return
    setTodos([...todos, { id: Date.now(), text: input, done: false }])  // spread copy
    setInput('')
  }

  function toggleTodo(id) {
    setTodos(todos.map(t =>
      t.id === id ? { ...t, done: !t.done } : t  // create new object for changed item
    ))
  }

  function deleteTodo(id) {
    setTodos(todos.filter(t => t.id !== id))  // filter returns new array
  }

  return (
    <div>
      <div className="add-row">
        {/* Controlled input — value comes from state */}
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addTodo()}
          placeholder="Add a todo..."
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul>
        {todos.map(todo => (
          <li key={todo.id} style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>
            <input type="checkbox" checked={todo.done} onChange={() => toggleTodo(todo.id)} />
            {todo.text}
            <button onClick={() => deleteTodo(todo.id)}>✕</button>
          </li>
        ))}
      </ul>
      <p>{todos.filter(t => t.done).length} / {todos.length} completed</p>
    </div>
  )
}

// ── Lifting state up (parent owns shared state) ──
function TemperatureInput({ unit, temp, onTempChange }) {
  return (
    <div>
      <label>Temperature in {unit}:</label>
      <input
        type="number"
        value={temp}
        onChange={e => onTempChange(parseFloat(e.target.value))}
      />
    </div>
  )
}

function TemperatureConverter() {
  const [celsius, setCelsius] = useState(0)  // state lives in parent

  const fahrenheit = celsius * 9/5 + 32

  return (
    <div>
      <TemperatureInput
        unit="Celsius"
        temp={celsius}
        onTempChange={setCelsius}           // callback prop
      />
      <TemperatureInput
        unit="Fahrenheit"
        temp={fahrenheit}
        onTempChange={f => setCelsius((f - 32) * 5/9)}  // convert back
      />
    </div>
  )
}`,
  },
}
