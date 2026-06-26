export const reactContextContent = {
  slug: "react-context",
  briefDescription: [
    "Advanced hooks let you handle more complex patterns. useReducer is an alternative to useState for complex state logic — it's like a mini Redux inside one component. You define a reducer function that takes (state, action) and returns the new state. Call dispatch({ type: 'INCREMENT' }) to trigger state changes. This is useful when multiple state values update together or the next state depends on the previous state in complex ways. useReducer pairs well with useContext to create a lightweight global state manager without any external library.",
    "Context API solves the prop drilling problem — when you need to pass data through many layers of components that don't need it themselves. Create a context with React.createContext(defaultValue). Wrap your component tree in a Context.Provider with a value prop. Any component inside the provider can access that value with useContext(MyContext) — no matter how deeply nested. Context is ideal for global data: auth user, theme, language, notifications. Avoid putting fast-changing data in context (it re-renders all consumers) — use it for stable, infrequently-updated global state.",
    "The useReducer + useContext pattern creates a scalable global state system. The reducer handles state transitions (like a state machine), Context distributes the state and dispatch to all components, and custom hooks (useMyContext) provide a clean API and prevent context being used outside the provider. This pattern is what libraries like Redux implement under the hood. For very large applications, you might prefer Zustand or Jotai (simpler than Redux) or Redux Toolkit (full-featured, with built-in Immer for immutable updates). But for most apps, useReducer + useContext is sufficient.",
  ],
  keyConcepts: [
    "useReducer(reducer, initialState): returns [state, dispatch] for complex state logic",
    "Reducer function: (state, action) => newState — pure function, no side effects",
    "dispatch({ type: 'ACTION_TYPE', payload: data }): trigger a state transition",
    "React.createContext(defaultValue): creates a Context object",
    "Context.Provider value={data}: provides value to all nested consumers",
    "useContext(MyContext): read the nearest Provider's value from any child component",
    "Prop drilling: passing props through many layers that don't use the data themselves",
    "Context re-renders all consumers when its value changes — keep context values stable",
    "useReducer + useContext: scalable global state without external libraries",
    "Custom context hook: function useMyContext() { const ctx = useContext(Ctx); if(!ctx) throw Error('No provider'); return ctx }",
    "Splitting contexts: separate AuthContext, ThemeContext, CartContext to avoid unnecessary re-renders",
    "Context is NOT a replacement for all state — local component state stays in useState",
  ],
  codeExample: {
    language: "jsx",
    title: "useReducer for Complex State + useContext + Context Provider Pattern",
    code: `import { createContext, useContext, useReducer, useCallback } from 'react'

// ── useReducer: Shopping Cart ──
const initialCartState = { items: [], isOpen: false }

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(i => i.id === action.payload.id)
      if (existing) {
        return {
          ...state,
          items: state.items.map(i =>
            i.id === action.payload.id ? { ...i, qty: i.qty + 1 } : i
          ),
        }
      }
      return { ...state, items: [...state.items, { ...action.payload, qty: 1 }] }
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => i.id !== action.payload) }
    case 'CLEAR_CART':
      return { ...state, items: [] }
    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen }
    default:
      return state
  }
}

// ── Context setup ──
const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, initialCartState)

  const addItem    = useCallback((item) => dispatch({ type: 'ADD_ITEM', payload: item }), [])
  const removeItem = useCallback((id) => dispatch({ type: 'REMOVE_ITEM', payload: id }), [])
  const clearCart  = useCallback(() => dispatch({ type: 'CLEAR_CART' }), [])
  const toggleCart = useCallback(() => dispatch({ type: 'TOGGLE_CART' }), [])

  const total = cart.items.reduce((sum, i) => sum + i.price * i.qty, 0)

  return (
    <CartContext.Provider value={{ cart, total, addItem, removeItem, clearCart, toggleCart }}>
      {children}
    </CartContext.Provider>
  )
}

// ── Custom hook — enforces provider usage ──
export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}

// ── Components that use the context ──
function AddToCartButton({ product }) {
  const { addItem } = useCart()  // no prop drilling!
  return <button onClick={() => addItem(product)}>Add to Cart</button>
}

function CartIcon() {
  const { cart, toggleCart } = useCart()
  return (
    <button onClick={toggleCart}>
      🛒 {cart.items.length} items
    </button>
  )
}

function CartSidebar() {
  const { cart, total, removeItem, clearCart } = useCart()

  if (!cart.isOpen) return null

  return (
    <aside className="cart-sidebar">
      <h2>Your Cart</h2>
      {cart.items.map(item => (
        <div key={item.id}>
          {item.name} × {item.qty} — \${item.price * item.qty}
          <button onClick={() => removeItem(item.id)}>Remove</button>
        </div>
      ))}
      <p><strong>Total: \${total.toFixed(2)}</strong></p>
      <button onClick={clearCart}>Clear Cart</button>
    </aside>
  )
}

// ── App entry: wrap in Provider ──
function App() {
  return (
    <CartProvider>
      <CartIcon />
      <CartSidebar />
      {/* Any component anywhere in the tree can use useCart() */}
    </CartProvider>
  )
}`,
  },
}
