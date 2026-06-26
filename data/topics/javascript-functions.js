export const javascriptFunctionsContent = {
  slug: "javascript-functions",
  briefDescription: [
    "Functions are reusable blocks of code. A classic function declaration (function name() {}) is hoisted — you can call it before it's defined. A function expression (const fn = function() {}) and arrow function (const fn = () => {}) are NOT hoisted. Arrow functions also don't have their own this — they inherit this from the surrounding scope. Functions can have default parameters (function greet(name = 'World')), rest parameters (function sum(...nums)) to collect all extra arguments into an array, and use the spread operator (...arr) to expand arrays into individual arguments.",
    "A closure is when a function retains access to variables from its outer (enclosing) scope even after the outer function has finished executing. This is one of the most powerful features of JavaScript — it enables data privacy, factory functions, and the module pattern. Every function in JavaScript creates a new scope. Variable hoisting means var declarations are moved to the top of their function scope, but their assignment stays in place. let and const are block-scoped and not hoisted — accessing them before declaration throws a ReferenceError (the Temporal Dead Zone).",
    "Higher-order functions (HOFs) are functions that take other functions as arguments or return functions. This is the basis of callbacks. Built-in HOFs include array methods like map, filter, reduce, sort, and find. An Immediately Invoked Function Expression (IIFE) runs immediately after it's defined — useful for creating private scopes. The arguments object (available in classic functions but not arrow functions) is an array-like object of all passed arguments. Pure functions always return the same output for the same input and have no side effects — they're the foundation of functional programming.",
  ],
  keyConcepts: [
    "Function declaration: function name(params) { } — hoisted, callable before definition",
    "Function expression: const fn = function() { } — NOT hoisted",
    "Arrow function: const fn = (params) => expression — shorter syntax, no own 'this'",
    "Default parameters: function greet(name = 'World') { } — used when arg is undefined",
    "Rest parameters: function sum(...nums) { } — collects extra args into an array",
    "Spread operator: Math.max(...arr) — expands array into individual arguments",
    "Closures: inner function retains access to outer function's variables after outer returns",
    "Scope chain: JS looks up variables from current scope to outer scopes to global",
    "var: function-scoped, hoisted (initialized as undefined); let/const: block-scoped, not hoisted (TDZ)",
    "Higher-order function (HOF): takes a function as argument or returns a function",
    "IIFE: (function() { })() — immediately invoked, creates private scope",
    "Pure function: same input → same output, no side effects",
  ],
  codeExample: {
    language: "javascript",
    title: "Function Types, Closures, HOFs, Default Params, Rest/Spread",
    code: `// ── Function declaration (hoisted) ──
console.log(add(2, 3))  // works before definition — hoisted
function add(a, b) { return a + b }

// ── Function expression (NOT hoisted) ──
const multiply = function(a, b) { return a * b }

// ── Arrow functions ──
const square = x => x * x             // one param, implicit return
const greet = (name) => \`Hello, \${name}!\`
const add3 = (a, b, c) => {
  const sum = a + b + c
  return sum
}

// ── Default parameters ──
function createUser(name, role = "viewer", active = true) {
  return { name, role, active }
}
createUser("Ali")             // { name:"Ali", role:"viewer", active:true }
createUser("Sara", "admin")   // { name:"Sara", role:"admin", active:true }

// ── Rest parameters ──
function sum(...numbers) {
  return numbers.reduce((total, n) => total + n, 0)
}
console.log(sum(1, 2, 3, 4, 5)) // 15

// ── Spread operator ──
const nums = [3, 1, 4, 1, 5]
console.log(Math.max(...nums)) // 5

// ── Closures ──
function makeCounter(start = 0) {
  let count = start                    // private variable
  return {
    increment: () => ++count,
    decrement: () => --count,
    value: () => count,
  }
}
const counter = makeCounter(10)
counter.increment()  // 11
counter.increment()  // 12
counter.decrement()  // 11
console.log(counter.value()) // 11
// count is not directly accessible from outside!

// ── Factory function using closure ──
function createMultiplier(factor) {
  return (num) => num * factor  // remembers factor via closure
}
const double = createMultiplier(2)
const triple = createMultiplier(3)
console.log(double(5))  // 10
console.log(triple(5))  // 15

// ── Higher-order functions ──
function applyTwice(fn, value) {
  return fn(fn(value))
}
console.log(applyTwice(x => x + 3, 10))  // 16

// ── IIFE (Immediately Invoked Function Expression) ──
const result = (() => {
  const private = "can't touch this"
  return { public: "accessible" }
})()
console.log(result.public)    // "accessible"
// console.log(private)       // ReferenceError`,
  },
}
