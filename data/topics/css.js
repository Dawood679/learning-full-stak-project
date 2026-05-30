export const cssContent = {
  slug: "css",
  briefDescription: [
    "CSS (Cascading Style Sheets) is the language used to describe the presentation of HTML documents. It controls layout, colors, typography, animations, and responsive behavior across different screen sizes.",
    "CSS follows a cascade and specificity model, where rules are applied in a deterministic order based on selector specificity, source order, and the !important rule. Understanding this is key to writing maintainable styles.",
    "Modern CSS has evolved dramatically with Flexbox, CSS Grid, custom properties (variables), and container queries — enabling complex layouts without JavaScript.",
  ],
  keyConcepts: [
    "Box model: margin, border, padding, content",
    "Flexbox: flex-direction, justify-content, align-items, flex-wrap",
    "CSS Grid: grid-template-columns, grid-area, auto-fill/auto-fit",
    "CSS Custom Properties (variables): --primary-color, var()",
    "Responsive design: media queries, min-width, max-width",
    "CSS specificity and the cascade",
    "Pseudo-classes (:hover, :focus) and pseudo-elements (::before, ::after)",
    "CSS animations and transitions",
  ],
  codeExample: {
    language: "css",
    title: "Modern CSS Layout with Grid & Flexbox",
    code: `:root {
  --primary: #6366f1;
  --radius: 0.5rem;
}

/* Responsive Card Grid */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  padding: 2rem;
}

.card {
  background: white;
  border-radius: var(--radius);
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(99,102,241,0.15);
}

/* Flexbox Navbar */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
}

@media (max-width: 768px) {
  .navbar { flex-direction: column; gap: 1rem; }
}`,
  },
}
