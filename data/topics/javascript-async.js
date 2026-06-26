export const javascriptAsyncContent = {
  slug: "javascript-async",
  briefDescription: [
    "JavaScript is single-threaded but handles asynchronous operations through its event loop. When you call fetch(), setTimeout(), or a file read, the browser/Node handles it in the background and puts the callback in the task queue once done. The event loop continuously checks: if the call stack is empty, pick the next item from the queue and run it. Promises represent the eventual result of an async operation — they're in one of three states: pending (in progress), fulfilled (success), or rejected (error). Create a Promise with new Promise((resolve, reject) => { }).",
    "Async/await is syntactic sugar over Promises that makes async code look like synchronous code. Mark a function with async and use await inside it to pause execution until a Promise resolves. An async function always returns a Promise. Use try/catch around await calls to handle errors — a rejected Promise becomes a thrown error that catch intercepts. You can await multiple independent Promises in parallel with Promise.all([p1, p2, p3]) — it resolves when all resolve, or rejects as soon as any one rejects. Promise.allSettled() waits for all regardless of success/failure.",
    "The Promise API has several useful static methods. Promise.race([p1, p2]) resolves/rejects with whichever Promise settles first. Promise.any([p1, p2]) resolves with the first fulfilled Promise (ignores rejections unless all reject). Chaining .then().catch().finally() is the older style but still common. Each .then() receives the resolved value and returns a new Promise, enabling method chaining. Error handling best practices: always handle rejections, don't mix async/await and .then() in the same function, and use finally() for cleanup (closing DB connections, hiding loading spinners) that should run regardless of success or failure.",
  ],
  keyConcepts: [
    "Event loop: JavaScript is single-threaded; async ops go to task queue when done",
    "Promise states: pending → fulfilled (resolve) | rejected (reject)",
    "new Promise((resolve, reject) => { }) — create a Promise manually",
    "async function: always returns a Promise implicitly",
    "await expr: pauses the async function until expr's Promise resolves",
    "try { await } catch(err) { } — handles rejected Promises in async/await",
    "Promise.all([p1, p2]): resolves when ALL resolve; rejects if ANY rejects",
    "Promise.allSettled([p1, p2]): resolves with array of {status, value/reason} for all",
    "Promise.race([p1, p2]): resolves/rejects with the FIRST to settle",
    "Promise.any([p1, p2]): resolves with FIRST fulfilled; rejects only if ALL reject",
    ".then(onFulfilled).catch(onRejected).finally(cleanup) — Promise chain syntax",
    "async/await doesn't block the main thread — only the async function itself pauses",
  ],
  codeExample: {
    language: "javascript",
    title: "Promises, async/await, try/catch, Promise.all, Promise.allSettled",
    code: `// ── Creating a Promise manually ──
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function fetchUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id > 0) {
        resolve({ id, name: 'Ali', email: 'ali@example.com' })
      } else {
        reject(new Error('Invalid user ID'))
      }
    }, 500)
  })
}

// ── .then() / .catch() chain ──
fetchUser(1)
  .then(user => {
    console.log('User:', user)
    return fetchUser(2)  // return another promise
  })
  .then(user2 => console.log('User 2:', user2))
  .catch(err => console.error('Error:', err.message))
  .finally(() => console.log('Request done'))

// ── async/await (cleaner) ──
async function loadUserProfile(userId) {
  try {
    await delay(200)                          // pause 200ms
    const user = await fetchUser(userId)      // wait for user
    console.log('Loaded:', user.name)
    return user
  } catch (err) {
    console.error('Failed to load user:', err.message)
    throw err  // re-throw so caller can handle it
  } finally {
    console.log('Loading complete')           // always runs
  }
}

// ── Call async function ──
loadUserProfile(1).then(user => {
  console.log('Got user:', user)
})

// ── Promise.all — run in PARALLEL ──
async function loadDashboard() {
  try {
    // Start all three at the same time — much faster than sequential awaits
    const [users, products, orders] = await Promise.all([
      fetch('/api/users').then(r => r.json()),
      fetch('/api/products').then(r => r.json()),
      fetch('/api/orders').then(r => r.json()),
    ])
    console.log({ users, products, orders })
  } catch (err) {
    // If ANY request fails, we land here
    console.error('Dashboard load failed:', err)
  }
}

// ── Promise.allSettled — don't fail if one rejects ──
async function loadOptionalData() {
  const results = await Promise.allSettled([
    fetch('/api/required').then(r => r.json()),
    fetch('/api/optional').then(r => r.json()),  // might fail
  ])

  results.forEach((result, i) => {
    if (result.status === 'fulfilled') {
      console.log(\`Request \${i} succeeded:\`, result.value)
    } else {
      console.warn(\`Request \${i} failed:\`, result.reason)
    }
  })
}

// ── Promise.race — timeout pattern ──
function withTimeout(promise, ms) {
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Timeout!')), ms)
  )
  return Promise.race([promise, timeout])
}

async function main() {
  try {
    const data = await withTimeout(fetch('/api/slow'), 3000)
    console.log('Got data in time')
  } catch (err) {
    console.error(err.message)  // "Timeout!" if > 3s
  }
}`,
  },
}
