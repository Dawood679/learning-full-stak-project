export const javascriptEventsContent = {
  slug: "javascript-events",
  briefDescription: [
    "JavaScript events are actions that happen in the browser — a user clicking a button, typing in a field, resizing the window, or a page finishing loading. You listen for events using addEventListener(eventType, handler). The handler receives an event object (often named e or event) with details about what happened. You can add multiple listeners to the same element for the same event. To remove a listener, use removeEventListener with the exact same function reference. The once option makes a listener fire only one time: element.addEventListener('click', fn, { once: true }).",
    "Event propagation describes how events travel through the DOM. When an element is clicked, the event first travels down from the document root to the target (capture phase), then bubbles back up (bubble phase). Most event listeners run in the bubble phase by default. Call e.stopPropagation() to prevent the event from continuing up the DOM tree. Call e.preventDefault() to stop the browser's default action — like preventing a form from submitting or a link from navigating. e.target is the element that was actually clicked; e.currentTarget is the element the listener is attached to.",
    "Event delegation is a powerful pattern where you attach one listener to a parent element instead of individual listeners on each child. Because events bubble up, you can check e.target inside the parent's handler to see which child was clicked. This is more memory-efficient and handles dynamically added elements automatically — new children don't need their own listeners. Common events to know: click, dblclick, mouseenter, mouseleave, keydown, keyup, keypress, input, change, submit, focus, blur, scroll, resize, load, DOMContentLoaded.",
  ],
  keyConcepts: [
    "addEventListener(type, handler, options): attaches an event listener",
    "removeEventListener(type, handler): removes — must pass the same function reference",
    "Event object (e): e.target (clicked element), e.currentTarget (listener element), e.type",
    "e.preventDefault(): stops browser default (form submit, link navigation, etc.)",
    "e.stopPropagation(): stops event from bubbling up to parent elements",
    "Event bubbling: events travel from target → up to document root (default behavior)",
    "Event capturing: events travel from document root → down to target (3rd arg = true)",
    "Event delegation: attach one listener to parent, check e.target to identify child",
    "{ once: true } option: listener fires only one time then auto-removes itself",
    "Keyboard events: e.key (the key name), e.code (physical key), e.shiftKey, e.ctrlKey",
    "Mouse events: e.clientX/clientY (viewport coords), e.pageX/pageY (document coords)",
    "DOMContentLoaded: fires when HTML is parsed; load: fires when all resources (images) load",
  ],
  codeExample: {
    language: "javascript",
    title: "addEventListener, Event Object, Delegation, Keyboard, Form Events",
    code: `// ── Basic click listener ──
const btn = document.querySelector('#submit-btn')
btn.addEventListener('click', (e) => {
  console.log('Clicked!', e.target)
})

// ── Keyboard events ──
document.addEventListener('keydown', (e) => {
  console.log('Key:', e.key, 'Code:', e.code)
  if (e.key === 'Escape') closeModal()
  if (e.ctrlKey && e.key === 's') {
    e.preventDefault()  // prevent browser's save dialog
    saveDocument()
  }
})

// ── Input event (fires on every keystroke) ──
const input = document.querySelector('#search')
input.addEventListener('input', (e) => {
  console.log('Current value:', e.target.value)
  filterResults(e.target.value)
})

// ── Change event (fires on blur after value changes) ──
const select = document.querySelector('select')
select.addEventListener('change', (e) => {
  console.log('Selected:', e.target.value)
})

// ── Form submit — prevent default reload ──
const form = document.querySelector('form')
form.addEventListener('submit', (e) => {
  e.preventDefault()  // stop page from reloading
  const data = new FormData(form)
  const name = data.get('name')
  const email = data.get('email')
  console.log({ name, email })
  // now send to server with fetch()
})

// ── Stopping propagation ──
const modal = document.querySelector('.modal')
const modalContent = document.querySelector('.modal__content')
modal.addEventListener('click', () => modal.close())         // click backdrop → close
modalContent.addEventListener('click', (e) => {
  e.stopPropagation()  // click inside modal → don't close
})

// ── Event delegation (one listener for many children) ──
const list = document.querySelector('#item-list')
list.addEventListener('click', (e) => {
  const item = e.target.closest('li')  // find the <li> (even if span inside was clicked)
  if (!item) return
  if (e.target.matches('.delete-btn')) {
    item.remove()
  } else if (e.target.matches('.edit-btn')) {
    item.contentEditable = 'true'
    item.focus()
  } else {
    item.classList.toggle('selected')
  }
})

// ── Once option ──
btn.addEventListener('click', () => {
  console.log("This runs only once")
}, { once: true })

// ── Mouse position ──
document.addEventListener('mousemove', (e) => {
  console.log(\`Viewport: \${e.clientX}, \${e.clientY}\`)
})

// ── Window events ──
window.addEventListener('resize', () => {
  console.log('Window size:', window.innerWidth, window.innerHeight)
})
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) showScrollToTop()
})
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM ready — HTML parsed, images not yet loaded')
})
window.addEventListener('load', () => {
  console.log('Page fully loaded including all images and assets')
})`,
  },
}
