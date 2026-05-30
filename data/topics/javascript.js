export const javascriptContent = {
  slug: "javascript",
  briefDescription: [
    "JavaScript is a dynamic, interpreted programming language that enables interactive web pages. It runs in the browser as well as on servers (via Node.js) and is the only language natively supported by all browsers.",
    "ES6+ introduced major improvements: arrow functions, destructuring, template literals, async/await, Promises, modules (import/export), and classes — making JS more expressive and maintainable.",
    "JavaScript is single-threaded but asynchronous by nature. The event loop, call stack, microtask queue, and macrotask queue govern how async code executes, which is fundamental to understanding JS performance.",
  ],
  keyConcepts: [
    "var vs let vs const — scoping and hoisting",
    "Closures and lexical scoping",
    "Async/Await and Promises — the async model",
    "Event loop: call stack, microtask queue, macrotask queue",
    "Destructuring, spread/rest operators, optional chaining (?.)",
    "Array methods: map, filter, reduce, find, some, every",
    "Prototype chain and object-oriented patterns",
    "ES Modules: import/export",
  ],
  codeExample: {
    language: "javascript",
    title: "Async/Await, Destructuring & Array Methods",
    code: `// Modern async data fetching
async function fetchUsers(ids) {
  try {
    const results = await Promise.all(
      ids.map(id => fetch(\`/api/users/\${id}\`).then(r => r.json()))
    )
    return results
  } catch (error) {
    console.error('Fetch failed:', error)
    throw error
  }
}

// Destructuring + default values
const { name = 'Anonymous', age = 0, address: { city } = {} } = user

// Array methods pipeline
const topAdults = users
  .filter(u => u.age >= 18)
  .sort((a, b) => b.score - a.score)
  .slice(0, 10)
  .map(({ name, score }) => ({ name, score }))

// Closures
function makeCounter(start = 0) {
  let count = start
  return {
    increment: () => ++count,
    decrement: () => --count,
    value: () => count,
  }
}`,
  },
}
