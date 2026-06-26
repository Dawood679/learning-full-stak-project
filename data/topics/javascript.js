export const javascriptContent = {
  slug: "javascript",
  briefDescription: [
    "JavaScript is the programming language that makes web pages interactive. It runs in browsers and on servers (via Node.js). You link a JS file to HTML using <script src='app.js'> or write JS in the browser console. Core concepts include variables (var, let, const), data types (string, number, boolean, null, undefined, object, array, symbol), operators, conditionals (if/else, switch, ternary), and loops (for, while, do...while, forEach, for...of, for...in).",
    "Functions are the building blocks of JavaScript programs. You can write classic functions, nested functions (scope chain), arrow functions (fat arrow =>), anonymous functions, Higher-Order Functions (functions that take/return functions), and callbacks. Closures let a function remember and access variables from its outer scope even after the outer function has returned. Understanding variable hoisting (var is hoisted, let/const are not) and scoping (global vs function vs block scope) is essential.",
    "JavaScript handles async operations through Promises (pending → resolved/rejected) and async/await syntax which prevents callback hell. The DOM (Document Object Model) API lets you select elements (querySelector, getElementById) and manipulate them (innerHTML, classList, setAttribute). Arrays have powerful built-in methods: push, pop, shift, unshift, map, filter, reduce, sort, splice, slice, spread. Objects support destructuring, freezing, sealing, and the 'this' keyword for accessing own properties.",
  ],
  keyConcepts: [
    "Variables: var (function-scoped, hoisted), let (block-scoped), const (block-scoped, no reassign)",
    "Data types: string, number, boolean, null, undefined, object, array, symbol, BigInt",
    "Operators: arithmetic, assignment, comparison (==, ===), logical (&&, ||), ternary (?:)",
    "Loops: for, while, do...while, forEach, for...in, for...of, break and continue",
    "Functions: classic, nested, arrow, IIFE, higher-order, callback, closures, scope chain",
    "Arrays: push, pop, map, filter, reduce, find, sort, splice, slice, spread operator",
    "Objects: key-value pairs, destructuring, this keyword, Object.freeze/seal, methods",
    "DOM manipulation: querySelector, addEventListener, innerHTML, classList, createElement",
    "Async JS: Promises (pending/resolved/rejected), async/await, try/catch error handling",
    "Browser APIs: localStorage, sessionStorage, setTimeout, setInterval, fetch()",
    "JSON handling: JSON.parse() to convert string→object, JSON.stringify() for object→string",
    "OOP in JS: classes, constructor, prototypes, inheritance, getter/setter",
  ],
  codeExample: {
    language: "javascript",
    title: "Functions, Closures, DOM + Async/Await",
    code: `// Closures — function remembers outer scope
function makeCounter(start = 0) {
  let count = start
  return {
    increment: () => ++count,
    decrement: () => --count,
    value: () => count,
    reset: () => { count = start },
  }
}
const counter = makeCounter(10)
console.log(counter.increment()) // 11
console.log(counter.value())     // 11

// Higher-Order Functions + Array methods
const users = [
  { name: 'Ali', age: 22, active: true },
  { name: 'Sara', age: 17, active: false },
  { name: 'Zaid', age: 25, active: true },
]
const activeAdults = users
  .filter(u => u.active && u.age >= 18)
  .map(u => u.name)
console.log(activeAdults) // ['Ali', 'Zaid']

// Async/Await with error handling
const fetchUser = async (id) => {
  try {
    const res = await fetch(\`/api/users/\${id}\`)
    if (!res.ok) throw new Error(\`HTTP \${res.status}\`)
    return await res.json()
  } catch (err) {
    console.error('Error:', err.message)
    return null
  }
}

// DOM manipulation
const btn = document.querySelector('#btn')
const list = document.querySelector('#list')

btn.addEventListener('click', async () => {
  const user = await fetchUser(1)
  if (user) {
    const li = document.createElement('li')
    li.textContent = user.name
    list.appendChild(li)
  }
})

// localStorage (Browser API)
localStorage.setItem('theme', JSON.stringify({ dark: true }))
const theme = JSON.parse(localStorage.getItem('theme'))

// setTimeout and setInterval
const timerId = setInterval(() => {
  console.log('tick:', counter.increment())
}, 1000)
setTimeout(() => clearInterval(timerId), 5000)`,
  },
}
