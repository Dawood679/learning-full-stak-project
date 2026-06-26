export const reactReduxContent = {
  slug: "react-redux",
  briefDescription: [
    "Redux is a predictable state container for JavaScript apps. The core concept: there is ONE single store that holds all application state. State can only change by dispatching actions — plain objects with a type field. Reducers are pure functions that take (currentState, action) and return the next state. This unidirectional data flow makes state changes traceable and debugging easy. Redux DevTools browser extension lets you see every action dispatched and time-travel to any previous state. Redux Toolkit (RTK) is the modern, official way to use Redux — it reduces boilerplate dramatically.",
    "Redux Toolkit's createSlice function generates the reducer and action creators automatically. A slice defines a portion of the Redux store for one feature (e.g., cart, auth, products). The slice has a name (used as action type prefix), initialState, and reducers (functions that handle state changes). RTK uses Immer under the hood, which means you can write 'mutating' code like state.count++ inside reducers — Immer converts it to immutable updates automatically. Use configureStore to combine slices into the root store. Wrap your app in Provider from react-redux and pass the store.",
    "In components, use useSelector to read state from the store and useDispatch to get the dispatch function. useSelector accepts a selector function that picks the part of state you need — it only re-renders the component when that specific slice of state changes. To handle async operations (API calls) in Redux, use RTK's createAsyncThunk which creates pending/fulfilled/rejected action types automatically and handles the async flow. The extraReducers field in createSlice handles these async action results. RTK Query is an even more powerful data fetching solution built into Redux Toolkit.",
  ],
  keyConcepts: [
    "Redux principles: single store, read-only state, pure reducer functions",
    "Action: { type: 'cart/addItem', payload: product } — plain object describing what happened",
    "Reducer: (state, action) => newState — pure function, no side effects",
    "createSlice({ name, initialState, reducers }): generates reducer + action creators",
    "configureStore({ reducer: { cart: cartReducer } }): creates the Redux store",
    "<Provider store={store}>: makes store available to all components",
    "useSelector(state => state.cart.items): reads state from store (re-renders on change)",
    "useDispatch(): returns dispatch function — call dispatch(addItem(product))",
    "RTK uses Immer: write state.count++ inside reducers (looks mutable, is immutable)",
    "createAsyncThunk(name, asyncFn): handles async operations with pending/fulfilled/rejected",
    "extraReducers with builder.addCase: handle async thunk results in a slice",
    "Redux DevTools: time-travel debugging — see every dispatched action",
  ],
  codeExample: {
    language: "jsx",
    title: "Redux Toolkit — createSlice, configureStore, useSelector, useDispatch, Async Thunk",
    code: `// ── store/cartSlice.js ──
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Async thunk — for API calls
export const fetchProducts = createAsyncThunk(
  'products/fetchAll',
  async () => {
    const res = await fetch('/api/products')
    return res.json()
  }
)

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [], isOpen: false },
  reducers: {
    addItem(state, action) {
      const existing = state.items.find(i => i.id === action.payload.id)
      if (existing) {
        existing.qty += 1          // Immer makes this safe!
      } else {
        state.items.push({ ...action.payload, qty: 1 })
      }
    },
    removeItem(state, action) {
      state.items = state.items.filter(i => i.id !== action.payload)
    },
    clearCart(state) {
      state.items = []
    },
    toggleCart(state) {
      state.isOpen = !state.isOpen
    },
  },
})

export const { addItem, removeItem, clearCart, toggleCart } = cartSlice.actions
export default cartSlice.reducer

// ── store/productsSlice.js ──
const productsSlice = createSlice({
  name: 'products',
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})
export default productsSlice.reducer

// ── store/index.js ──
import { configureStore } from '@reduxjs/toolkit'
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
  },
})

// ── main.jsx — wrap app in Provider ──
import { Provider } from 'react-redux'
import { store } from './store'
ReactDOM.render(<Provider store={store}><App /></Provider>, root)

// ── ProductCard component ──
import { useDispatch, useSelector } from 'react-redux'
import { addItem } from './store/cartSlice'

function ProductCard({ product }) {
  const dispatch = useDispatch()
  const cartItems = useSelector(state => state.cart.items)
  const inCart = cartItems.some(i => i.id === product.id)

  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>\${product.price}</p>
      <button
        onClick={() => dispatch(addItem(product))}
        disabled={inCart}
      >
        {inCart ? 'In Cart' : 'Add to Cart'}
      </button>
    </div>
  )
}

// ── Cart counter (reads from store) ──
function CartIcon() {
  const itemCount = useSelector(state =>
    state.cart.items.reduce((sum, i) => sum + i.qty, 0)
  )
  const dispatch = useDispatch()
  return (
    <button onClick={() => dispatch(toggleCart())}>
      🛒 {itemCount}
    </button>
  )
}`,
  },
}
