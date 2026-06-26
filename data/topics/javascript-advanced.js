export const javascriptAdvancedContent = {
  slug: "javascript-advanced",
  briefDescription: [
    "Error handling in JavaScript uses try/catch/finally. Code in the try block runs normally; if any line throws an error, execution jumps to the catch block (and the rest of try is skipped). The finally block always runs regardless of success or failure — use it for cleanup. You can throw your own errors with throw new Error('message') or create custom error classes by extending the built-in Error class. The error object has .message (the error text), .name (error type like 'TypeError'), and .stack (full call stack trace for debugging).",
    "Advanced JavaScript patterns include: the Module pattern (IIFE-based private state), the Observer/EventEmitter pattern (subscribe/publish), memoization (caching function results by input), debouncing (delay execution until activity stops — perfect for search inputs), and throttling (limit how often a function runs — perfect for scroll/resize events). WeakMap and WeakSet store objects without preventing garbage collection. Map stores key-value pairs where keys can be any type. Set stores unique values and is much faster than array for existence checks.",
    "ES6+ features that appear constantly in modern code: template literals (backtick strings with ${} interpolation), destructuring (arrays and objects), rest/spread operators, optional chaining (obj?.prop — returns undefined instead of throwing if obj is null), nullish coalescing (?? — falls back only on null/undefined, not on 0 or empty string), logical assignment operators (??=, &&=, ||=), and tagged template literals for custom string processing. Generators (function*) produce values lazily with yield. Symbol creates unique property keys that don't conflict with string keys. Proxy and Reflect let you intercept and customize object operations.",
  ],
  keyConcepts: [
    "try { } catch(err) { } finally { } — error handling; finally always runs",
    "throw new Error('msg') — manually throw an error; throw any value (but Error is best)",
    "Custom error: class ValidationError extends Error { constructor(msg) { super(msg); this.name='ValidationError' } }",
    "err.message / err.name / err.stack — properties on caught error objects",
    "Debounce: delay execution until X ms after last call — for search inputs, resize, etc.",
    "Throttle: execute at most once per X ms — for scroll, mousemove, button spam",
    "Memoization: cache function results by input to avoid re-computing",
    "Optional chaining: user?.address?.city — safely access nested properties",
    "Nullish coalescing: a ?? b — b only when a is null/undefined (not falsy)",
    "Map: like object but keys can be any type; preserves insertion order",
    "Set: collection of unique values; fast .has() checks",
    "Optional chaining with method calls: arr?.find(x => x.id === id)",
  ],
  codeExample: {
    language: "javascript",
    title: "Error Handling, Custom Errors, Debounce, Optional Chaining, Map, Set",
    code: `// ── try/catch/finally ──
async function loadData(url) {
  try {
    const res = await fetch(url)
    if (!res.ok) throw new Error(\`HTTP \${res.status}: \${res.statusText}\`)
    return await res.json()
  } catch (err) {
    if (err instanceof TypeError) {
      console.error('Network error — are you offline?')
    } else {
      console.error('Failed:', err.message)
    }
    return null
  } finally {
    hideLoadingSpinner()  // always hides spinner, success or failure
  }
}

// ── Custom error classes ──
class ValidationError extends Error {
  constructor(field, message) {
    super(message)
    this.name = 'ValidationError'
    this.field = field
  }
}

class NotFoundError extends Error {
  constructor(resource) {
    super(\`\${resource} not found\`)
    this.name = 'NotFoundError'
    this.statusCode = 404
  }
}

function validateEmail(email) {
  if (!email) throw new ValidationError('email', 'Email is required')
  if (!email.includes('@')) throw new ValidationError('email', 'Invalid email format')
  return true
}

try {
  validateEmail('notanemail')
} catch (err) {
  if (err instanceof ValidationError) {
    console.error(\`Field '\${err.field}': \${err.message}\`)
  }
}

// ── Debounce — run only after user stops typing ──
function debounce(fn, delay) {
  let timer
  return function(...args) {
    clearTimeout(timer)
    timer = setTimeout(() => fn.apply(this, args), delay)
  }
}

const search = debounce((query) => {
  console.log('Searching for:', query)
  // API call here
}, 300)  // only runs 300ms after user stops typing

document.querySelector('#search')?.addEventListener('input', (e) => {
  search(e.target.value)
})

// ── Throttle — run at most once per interval ──
function throttle(fn, interval) {
  let lastCall = 0
  return function(...args) {
    const now = Date.now()
    if (now - lastCall >= interval) {
      lastCall = now
      return fn.apply(this, args)
    }
  }
}

const handleScroll = throttle(() => {
  console.log('Scroll position:', window.scrollY)
}, 200)  // runs at most 5 times per second

// ── Memoization ──
function memoize(fn) {
  const cache = new Map()
  return function(...args) {
    const key = JSON.stringify(args)
    if (cache.has(key)) return cache.get(key)
    const result = fn.apply(this, args)
    cache.set(key, result)
    return result
  }
}

const expensiveCalc = memoize((n) => {
  console.log('Computing...')  // only runs once per unique n
  return n * n
})
expensiveCalc(5)  // Computing... → 25
expensiveCalc(5)  // cache hit → 25 (no log)

// ── Optional chaining ──
const user = { profile: { address: { city: 'Karachi' } } }
console.log(user?.profile?.address?.city)   // "Karachi"
console.log(user?.profile?.phone?.number)   // undefined (no error)
const firstOrder = user?.orders?.find(o => o.status === 'pending')  // safe

// ── Map and Set ──
const map = new Map()
map.set('key', 'value')
map.set(42, 'number key')
map.set({}, 'object key')  // objects can be keys in Map
console.log(map.get('key'))  // "value"
console.log(map.size)        // 3

const set = new Set([1, 2, 2, 3, 3, 3])
console.log([...set])    // [1, 2, 3] — duplicates removed
set.add(4)
console.log(set.has(3))  // true

// Remove duplicates from array using Set
const dupes = [1, 2, 2, 3, 4, 4, 5]
const unique = [...new Set(dupes)]  // [1,2,3,4,5]`,
  },
}
