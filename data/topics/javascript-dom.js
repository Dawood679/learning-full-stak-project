export const javascriptDomContent = {
  slug: "javascript-dom",
  briefDescription: [
    "The DOM (Document Object Model) is the browser's JavaScript-accessible representation of the HTML page. It's a tree of nodes: the document is the root, with html, head, and body as its children. JavaScript can select, read, modify, create, and delete any element. The most versatile selection method is document.querySelector('#id') for a single element and document.querySelectorAll('.class') for a NodeList. Older methods include getElementById, getElementsByClassName, and getElementsByTagName. querySelectorAll returns a NodeList — convert it to a real array with Array.from() to use array methods.",
    "Once you have an element reference, you can read and write its content and attributes. The innerHTML property gets/sets the HTML content inside an element (accepts HTML tags). textContent gets/sets plain text only (safer — no XSS risk). innerText is similar to textContent but respects CSS visibility. Use getAttribute('attr') and setAttribute('attr', 'value') to read and modify HTML attributes. The dataset property gives access to data-* attributes. The style property sets inline CSS, but prefer adding/removing CSS classes for most styling tasks.",
    "Traversing the DOM means moving between nodes using parent, child, and sibling relationships. parentElement, children, firstElementChild, lastElementChild, nextElementSibling, previousElementSibling navigate the tree. To create new elements: document.createElement('div') creates the element in memory — you must then append it with appendChild(), append(), prepend(), insertBefore(), or insertAdjacentHTML(). To remove elements use element.remove(). Modifying the DOM triggers reflow and repaint — batching DOM changes with DocumentFragment or innerHTML reduces layout thrashing.",
  ],
  keyConcepts: [
    "document.querySelector(css) — first matching element; null if not found",
    "document.querySelectorAll(css) — NodeList of all matches (use Array.from() for array methods)",
    "document.getElementById('id') — fastest single-element lookup by id",
    "innerHTML: get/set HTML content; textContent: get/set plain text (XSS-safe)",
    "element.setAttribute('attr', 'value') / getAttribute('attr') / removeAttribute('attr')",
    "element.classList.add / remove / toggle / contains — manage CSS classes",
    "element.style.property = 'value' — sets inline CSS (use classList for most styling)",
    "dataset: access data-* attributes — element.dataset.userId reads data-user-id",
    "document.createElement('tag') — creates new element in memory (not in DOM yet)",
    "parent.appendChild(child) / parent.append(...) / element.remove() — add/remove from DOM",
    "insertAdjacentHTML('beforeend', html) — insert HTML at specific position",
    "parentElement, children, firstElementChild, nextElementSibling — DOM traversal",
  ],
  codeExample: {
    language: "javascript",
    title: "DOM Selection, Reading/Writing Content, classList, createElement, traversal",
    code: `// ── Selecting elements ──
const title    = document.querySelector('h1')
const allCards = document.querySelectorAll('.card')          // NodeList
const cardsArr = Array.from(allCards)                       // → real Array
const btn      = document.getElementById('submit-btn')

// ── Reading and writing content ──
console.log(title.textContent)     // plain text
console.log(title.innerHTML)       // HTML string

title.textContent = 'Hello World'  // sets plain text
title.innerHTML   = '<strong>Hello</strong> World'  // sets HTML

// ── Working with attributes ──
const link = document.querySelector('a')
console.log(link.getAttribute('href'))
link.setAttribute('href', 'https://example.com')
link.setAttribute('target', '_blank')
link.removeAttribute('target')

// ── classList ──
const card = document.querySelector('.card')
card.classList.add('active')         // add class
card.classList.remove('hidden')      // remove class
card.classList.toggle('expanded')    // add if absent, remove if present
console.log(card.classList.contains('active')) // true

// ── Inline style (prefer classList for most styling) ──
card.style.backgroundColor = '#6366f1'
card.style.display = 'none'

// ── data-* attributes ──
// HTML: <div data-user-id="42" data-role="admin">
const userDiv = document.querySelector('[data-user-id]')
console.log(userDiv.dataset.userId)  // "42"
console.log(userDiv.dataset.role)    // "admin"

// ── Creating and inserting elements ──
const ul = document.querySelector('#list')

// Method 1: createElement
const li = document.createElement('li')
li.textContent = 'New Item'
li.classList.add('list-item')
ul.appendChild(li)           // add to end
ul.prepend(li)               // add to start
ul.insertBefore(li, ul.firstElementChild) // insert before first child

// Method 2: insertAdjacentHTML (fastest for HTML strings)
ul.insertAdjacentHTML('beforeend', '<li class="list-item">Another Item</li>')

// ── Removing elements ──
const oldItem = document.querySelector('.old')
oldItem?.remove()  // safe remove if exists

// ── DOM traversal ──
const list = document.querySelector('#list')
console.log(list.children)                // HTMLCollection of li elements
console.log(list.firstElementChild)       // first li
console.log(list.lastElementChild)        // last li
const secondItem = list.children[1]
console.log(secondItem.nextElementSibling)     // third li
console.log(secondItem.previousElementSibling) // first li
console.log(secondItem.parentElement)          // #list

// ── Batch DOM updates (better performance) ──
const fragment = document.createDocumentFragment()
const items = ['Apple', 'Banana', 'Cherry']
items.forEach(text => {
  const li = document.createElement('li')
  li.textContent = text
  fragment.appendChild(li)  // no DOM reflow yet
})
ul.appendChild(fragment)  // one reflow total`,
  },
}
