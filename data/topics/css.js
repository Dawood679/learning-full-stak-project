export const cssContent = {
  slug: "css",
  briefDescription: [
    "CSS (Cascading Style Sheets) controls the visual appearance of HTML. You can add CSS in three ways: inline (inside the tag), internal (<style> in <head>), or external (a separate .css file linked with <link>). External CSS is the best practice for maintainability.",
    "Every HTML element is a rectangular box. The CSS Box Model defines four layers: content, padding (inside the border), border, and margin (outside the border). Flexbox and CSS Grid are the modern tools for building layouts. Flexbox is great for one-dimensional layouts (rows OR columns), while Grid handles two-dimensional layouts (rows AND columns simultaneously).",
    "Responsive design ensures your site looks great on all devices. Media queries (@media) let you apply different styles at different screen sizes. CSS also provides powerful selectors (class, id, element, pseudo-classes like :hover and :focus) and the cascade determines which style wins when multiple rules conflict, based on specificity.",
  ],
  keyConcepts: [
    "CSS syntax: selector { property: value; } and how to add CSS (inline, internal, external)",
    "Selectors: element, .class, #id — and their specificity order (id > class > element)",
    "Box model: content → padding → border → margin, and box-sizing: border-box",
    "Text styling: font-family, font-size, font-weight, line-height, text-align, letter-spacing",
    "Colors and units: rgb(), hex, %, px, rem, em, vw, vh, min(), max(), clamp()",
    "Flexbox: display:flex, flex-direction, justify-content, align-items, flex-wrap, gap",
    "CSS Grid: display:grid, grid-template-columns, repeat(), auto-fill, minmax()",
    "Position property: static, relative, absolute, fixed, sticky",
    "Pseudo-classes and pseudo-elements: :hover, :focus, :active, ::before, ::after",
    "CSS Animations and Transitions: transition, @keyframes, transform (translate, rotate, scale)",
    "Responsive design: @media queries, mobile-first approach, viewport meta tag",
    "SASS/SCSS: variables ($color), nesting, mixins, and functions for reusable styles",
  ],
  codeExample: {
    language: "css",
    title: "Flexbox Navbar + Responsive Grid + Hover Animation",
    code: `/* CSS Variables */
:root {
  --primary: #6366f1;
  --text: #1e293b;
  --radius: 0.5rem;
}

/* Flexbox Navbar */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: white;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

/* Responsive Card Grid */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  padding: 2rem;
}

/* Card with hover animation */
.card {
  background: white;
  border-radius: var(--radius);
  padding: 1.5rem;
  border: 1px solid #e2e8f0;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(99,102,241,0.15);
}

/* Pseudo-elements */
.card::before {
  content: '';
  display: block;
  height: 4px;
  background: var(--primary);
  border-radius: var(--radius) var(--radius) 0 0;
  margin: -1.5rem -1.5rem 1rem;
}

/* Media Query for Mobile */
@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    gap: 1rem;
  }
}

/* CSS Animation */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}

.card {
  animation: fadeIn 0.3s ease forwards;
}`,
  },
}
