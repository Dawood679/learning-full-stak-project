export const javascriptLoopsContent = {
  slug: "javascript-loops",
  briefDescription: [
    "Loops let you repeat a block of code multiple times. The for loop is the most common: you initialize a counter, set a condition to keep running, and update the counter each iteration — for (let i = 0; i < 5; i++). The while loop runs as long as a condition is true, useful when you don't know how many iterations you'll need. The do...while loop always runs at least once because it checks the condition after executing the body. Use break to exit a loop early and continue to skip the current iteration.",
    "Conditionals control which code runs based on a condition. if/else checks a boolean condition. The else if chain handles multiple conditions in order — the first true condition wins. The switch statement compares a value against multiple cases and is cleaner than many else if blocks. Each case must end with break or execution falls through to the next case. JavaScript also has the ternary operator (condition ? valueIfTrue : valueIfFalse) for short inline conditionals, and the nullish coalescing operator (??) which returns the right side only if the left is null or undefined.",
    "For iterating over arrays and objects, JavaScript provides specialized loops. for...of iterates over iterable values (arrays, strings, Sets, Maps) — perfect for arrays. for...in iterates over the keys of an object — use it for objects, not arrays. Array methods like forEach, map, filter, and reduce are often more expressive than traditional loops. Infinite loops (while(true)) can crash your program — always make sure a loop has a path to terminate. Use labeled breaks and continues to escape nested loops.",
  ],
  keyConcepts: [
    "for loop: for (let i = 0; i < n; i++) { } — counter-based loop",
    "while loop: while (condition) { } — runs while condition is true",
    "do...while: do { } while (condition) — runs body at least once",
    "break: immediately exits the loop",
    "continue: skips the rest of the current iteration, moves to next",
    "for...of: iterates values of an array/string/Set — for (const item of arr)",
    "for...in: iterates keys of an object — for (const key in obj)",
    "if / else if / else: executes blocks based on boolean conditions",
    "switch(value) { case x: break; default: } — multi-value comparison",
    "Ternary operator: condition ? trueValue : falseValue",
    "Nullish coalescing: a ?? b — returns b only if a is null or undefined",
    "Logical OR: a || b — returns b if a is falsy (0, '', false, null, undefined all trigger it)",
  ],
  codeExample: {
    language: "javascript",
    title: "for, while, do...while, for...of, for...in, if/else, switch, ternary",
    code: `// ── for loop ──
for (let i = 1; i <= 5; i++) {
  if (i === 3) continue  // skip 3
  if (i === 5) break     // stop at 5
  console.log(i)         // prints 1, 2, 4
}

// ── while loop ──
let count = 0
while (count < 3) {
  console.log("count:", count)
  count++
}

// ── do...while (runs at least once) ──
let num = 10
do {
  console.log("do block ran with num =", num)
  num++
} while (num < 3)  // condition false from start, but body runs once

// ── for...of (arrays, strings, Sets) ──
const fruits = ["apple", "banana", "cherry"]
for (const fruit of fruits) {
  console.log(fruit)  // apple, banana, cherry
}

// Destructuring with for...of
const users = [{ name: "Ali", age: 25 }, { name: "Sara", age: 30 }]
for (const { name, age } of users) {
  console.log(\`\${name} is \${age}\`)
}

// ── for...in (object keys) ──
const person = { name: "Ahmed", city: "Karachi", age: 28 }
for (const key in person) {
  console.log(\`\${key}: \${person[key]}\`)
}

// ── if / else if / else ──
const score = 75
if (score >= 90) {
  console.log("A")
} else if (score >= 80) {
  console.log("B")
} else if (score >= 70) {
  console.log("C")
} else {
  console.log("F")
}

// ── switch statement ──
const day = "Monday"
switch (day) {
  case "Saturday":
  case "Sunday":
    console.log("Weekend!")
    break
  case "Monday":
    console.log("Back to work")
    break
  default:
    console.log("Weekday")
}

// ── Ternary operator ──
const age = 20
const status = age >= 18 ? "adult" : "minor"
console.log(status) // "adult"

// ── Nullish coalescing vs OR ──
const username = null
console.log(username ?? "Guest")  // "Guest" (null triggers ??)
console.log(0 ?? "default")       // 0 (0 is NOT null/undefined)
console.log(0 || "default")       // "default" (0 IS falsy, triggers ||)`,
  },
}
