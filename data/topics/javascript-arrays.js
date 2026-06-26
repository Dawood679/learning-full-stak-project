export const javascriptArraysContent = {
  slug: "javascript-arrays",
  briefDescription: [
    "Arrays store ordered lists of values. You create them with [] literals or new Array(). Arrays are zero-indexed — the first element is at index [0]. Core mutation methods: push (add to end), pop (remove from end), shift (remove from start), unshift (add to start), splice (insert/remove at any position). The spread operator (...arr) copies arrays. Array destructuring lets you unpack values: const [first, second, ...rest] = arr. Arrays in JavaScript can hold mixed types and they're dynamically sized.",
    "JavaScript arrays have powerful built-in iteration methods. map() transforms each element and returns a new array. filter() returns a new array with only elements that pass a test. reduce() accumulates all elements into a single value (sum, max, grouping, etc.). find() returns the first matching element. findIndex() returns the index of the first match. some() returns true if at least one element passes the test. every() returns true only if all elements pass. includes() checks if a value exists. flat() and flatMap() handle nested arrays. None of these mutation the original array — they return new ones.",
    "Objects in JavaScript are collections of key-value pairs. Create them with {} literals. Access properties with dot notation (obj.name) or bracket notation (obj['name']). Add, update, and delete properties dynamically. Object destructuring extracts values: const { name, age } = person. The spread operator copies objects: const updated = { ...original, newProp: 'value' }. Object.keys() returns an array of keys, Object.values() returns values, Object.entries() returns [key, value] pairs. Object.assign() merges objects. JSON.stringify() and JSON.parse() convert between objects and JSON strings.",
  ],
  keyConcepts: [
    "Array creation: const arr = [1, 2, 3] or new Array(3).fill(0)",
    "Mutation methods: push, pop, shift, unshift, splice(start, deleteCount, ...items)",
    "Non-mutating: slice(start, end) — returns sub-array without changing original",
    "map(fn): transforms each element, returns new array of same length",
    "filter(fn): returns new array of elements where fn returns true",
    "reduce(fn, initial): accumulates array into single value — (acc, curr) => acc + curr",
    "find(fn): first element that passes test; findIndex(fn): its index",
    "some(fn): true if any element passes; every(fn): true if all pass",
    "includes(value): true if value exists in array",
    "sort((a, b) => a - b): sorts numerically; default sort() is alphabetical",
    "Array destructuring: const [a, b, ...rest] = arr",
    "Object destructuring: const { name, age = 0 } = person (with default)",
    "Object.keys/values/entries, JSON.stringify/parse",
  ],
  codeExample: {
    language: "javascript",
    title: "Array Methods (map, filter, reduce, find) + Object Destructuring",
    code: `// ── Array basics ──
const nums = [3, 1, 4, 1, 5, 9, 2, 6]
console.log(nums[0])         // 3 (zero-indexed)
console.log(nums.length)     // 8

// ── Mutation methods ──
nums.push(7)          // [3,1,4,1,5,9,2,6,7]
nums.pop()            // removes 7
nums.unshift(0)       // [0,3,1,4,1,5,9,2,6]
nums.shift()          // removes 0
nums.splice(2, 1, 99) // at index 2, remove 1 item, insert 99

// ── map: transform each element ──
const products = [
  { id: 1, name: "Shirt",  price: 25 },
  { id: 2, name: "Pants",  price: 45 },
  { id: 3, name: "Shoes",  price: 80 },
]
const prices = products.map(p => p.price)     // [25, 45, 80]
const names  = products.map(({ name }) => name) // ["Shirt","Pants","Shoes"]

// ── filter: keep matching elements ──
const expensive = products.filter(p => p.price > 30)  // Pants, Shoes
const cheapItems = products.filter(p => p.price <= 30) // Shirt

// ── reduce: accumulate into one value ──
const total = products.reduce((sum, p) => sum + p.price, 0)  // 150
const maxPrice = products.reduce((max, p) => p.price > max ? p.price : max, 0) // 80

// ── Chaining map + filter + reduce ──
const discountedTotal = products
  .filter(p => p.price > 30)         // keep expensive items
  .map(p => p.price * 0.9)           // apply 10% discount
  .reduce((sum, p) => sum + p, 0)    // sum them up

// ── find, findIndex, some, every, includes ──
const found = products.find(p => p.id === 2)          // { id:2, name:"Pants"... }
const idx   = products.findIndex(p => p.name === "Shoes") // 2
const hasExpensive = products.some(p => p.price > 50)     // true
const allCheap     = products.every(p => p.price < 100)   // true
const hasShirt     = products.map(p=>p.name).includes("Shirt") // true

// ── sort ──
const sorted = [...nums].sort((a, b) => a - b) // ascending numeric
const byPrice = [...products].sort((a, b) => b.price - a.price) // desc

// ── Destructuring ──
const [first, second, ...rest] = [10, 20, 30, 40, 50]
console.log(first, second, rest) // 10, 20, [30,40,50]

const user = { name: "Ali", age: 25, city: "Karachi" }
const { name, city, country = "Pakistan" } = user  // default for missing key
console.log(name, city, country)  // Ali, Karachi, Pakistan

// ── Object methods ──
console.log(Object.keys(user))    // ["name","age","city"]
console.log(Object.values(user))  // ["Ali",25,"Karachi"]
console.log(Object.entries(user)) // [["name","Ali"],["age",25],["city","Karachi"]]

// ── Spread to copy/merge ──
const updated = { ...user, age: 26, email: "ali@example.com" }
console.log(updated) // merges user + overrides age + adds email`,
  },
}
