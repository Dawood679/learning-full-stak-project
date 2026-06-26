export const javascriptBrowserContent = {
  slug: "javascript-browser",
  briefDescription: [
    "The browser exposes several built-in APIs beyond the DOM. The Web Storage API provides localStorage and sessionStorage for storing key-value pairs in the browser. localStorage persists forever (until manually cleared); sessionStorage clears when the tab is closed. Both only store strings — use JSON.stringify() before storing objects and JSON.parse() when reading them back. The storage limit is typically 5–10 MB per domain. Use these for user preferences, draft data, tokens, or caching API responses client-side.",
    "Timers let you delay or repeat code execution. setTimeout(fn, ms) runs a function once after a delay in milliseconds. setInterval(fn, ms) runs a function repeatedly at that interval. Both return an ID that you can pass to clearTimeout() or clearInterval() to cancel them. Be careful: if the interval is shorter than the operation takes, calls can stack up. A better pattern for repeated async operations is a recursive setTimeout — schedule the next call only after the current one finishes. The requestAnimationFrame(fn) API is optimized for smooth 60fps animations.",
    "The Fetch API is the modern way to make HTTP requests in the browser. fetch(url) returns a Promise that resolves with a Response object. You must call .json(), .text(), or .blob() on the Response to read the body (these also return Promises). Always handle errors with try/catch around await fetch() because network failures reject the promise. To send data (POST request), pass a second argument with method, headers (Content-Type: application/json), and body (JSON.stringify(data)). The older XMLHttpRequest (XHR) API is rarely written today but you may see it in legacy code.",
  ],
  keyConcepts: [
    "localStorage.setItem(key, value) / getItem(key) / removeItem(key) / clear()",
    "sessionStorage: same API as localStorage but data clears when the tab closes",
    "JSON.stringify(obj) before storing objects; JSON.parse(str) after reading them back",
    "setTimeout(fn, ms): run fn once after ms milliseconds; returns timerId",
    "clearTimeout(id): cancel a pending setTimeout before it fires",
    "setInterval(fn, ms): run fn every ms milliseconds; clearInterval(id) to stop",
    "requestAnimationFrame(fn): call fn before next browser repaint — smooth animations",
    "fetch(url): returns Promise<Response>; must call .json() or .text() to get body",
    "fetch POST: { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }",
    "Response.ok: boolean — true if status 200-299; Response.status: HTTP status code",
    "window.location: current URL info; location.href to redirect; location.reload() to refresh",
    "navigator.geolocation.getCurrentPosition(success, error): get GPS coordinates",
  ],
  codeExample: {
    language: "javascript",
    title: "localStorage, sessionStorage, setTimeout, setInterval, Fetch API",
    code: `// ── localStorage ──
// Store primitive value
localStorage.setItem('theme', 'dark')
console.log(localStorage.getItem('theme'))  // "dark"

// Store an object (must stringify)
const user = { name: 'Ali', role: 'admin' }
localStorage.setItem('user', JSON.stringify(user))

// Read an object back (must parse)
const storedUser = JSON.parse(localStorage.getItem('user'))
console.log(storedUser.name)  // "Ali"

// Remove a key
localStorage.removeItem('theme')

// Check if key exists
const token = localStorage.getItem('authToken')
if (token) {
  // user is logged in
}

// ── sessionStorage (same API, tab-scoped) ──
sessionStorage.setItem('draft', JSON.stringify({ title: 'My Post' }))

// ── setTimeout / clearTimeout ──
const timer = setTimeout(() => {
  console.log("Runs after 2 seconds")
}, 2000)

// Cancel before it fires
clearTimeout(timer)

// ── setInterval ──
let count = 0
const interval = setInterval(() => {
  count++
  console.log('Tick:', count)
  if (count >= 5) clearInterval(interval) // stop after 5 ticks
}, 1000)

// ── Better: recursive setTimeout for async ops ──
async function pollServer() {
  const data = await fetchStatus()  // wait for this to complete
  updateUI(data)
  setTimeout(pollServer, 3000)      // then schedule next poll
}

// ── requestAnimationFrame ──
let x = 0
function animate() {
  x += 2
  element.style.transform = \`translateX(\${x}px)\`
  if (x < 300) requestAnimationFrame(animate)  // smooth 60fps
}
requestAnimationFrame(animate)

// ── Fetch API: GET request ──
async function getUsers() {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/users')
    if (!res.ok) throw new Error(\`HTTP error: \${res.status}\`)
    const users = await res.json()
    console.log(users)
  } catch (err) {
    console.error('Fetch failed:', err.message)
  }
}

// ── Fetch API: POST request ──
async function createPost(postData) {
  try {
    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postData),
    })
    if (!res.ok) throw new Error(\`Server error: \${res.status}\`)
    const created = await res.json()
    return created
  } catch (err) {
    console.error('Failed to create post:', err)
    throw err
  }
}

// ── window.location ──
console.log(window.location.href)      // full URL
console.log(window.location.pathname)  // just /path
window.location.href = '/login'        // redirect
window.location.reload()               // refresh page`,
  },
}
