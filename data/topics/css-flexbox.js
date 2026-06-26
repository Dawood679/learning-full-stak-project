export const cssFlexboxContent = {
  slug: "css-flexbox",
  briefDescription: [
    "CSS Flexbox (Flexible Box Layout) is a one-dimensional layout system for arranging items in a row or column. You activate it by setting display: flex on a container element. The container controls the layout; the direct children become flex items. The main axis runs in the direction set by flex-direction (row by default, meaning left-to-right). The cross axis is perpendicular to it. Flexbox makes it trivial to center content, distribute space evenly, and build responsive navigation bars.",
    "The most-used flex container properties are: justify-content (aligns items along the main axis — flex-start, flex-end, center, space-between, space-around, space-evenly), align-items (aligns items on the cross axis — stretch, flex-start, flex-end, center, baseline), and flex-wrap (whether items wrap to the next line when they run out of space — nowrap, wrap, wrap-reverse). Combining justify-content: center and align-items: center on a container is the fastest way to perfectly center anything.",
    "CSS Grid is the two-dimensional layout system — you define both rows AND columns at once. Activate it with display: grid, then define your tracks using grid-template-columns and grid-template-rows (e.g., repeat(3, 1fr) creates three equal columns). The fr unit represents a fraction of available space. Items can span multiple cells using grid-column: 1 / 3 and grid-row: 1 / 3. Use gap (or column-gap / row-gap) to add spacing between grid cells. Grid is best for overall page layout; Flexbox is best for component-level layouts.",
  ],
  keyConcepts: [
    "display: flex — activates Flexbox on a container; children become flex items",
    "flex-direction: row | column | row-reverse | column-reverse — main axis direction",
    "justify-content: flex-start | center | flex-end | space-between | space-around | space-evenly",
    "align-items: stretch | flex-start | center | flex-end | baseline",
    "flex-wrap: nowrap | wrap | wrap-reverse — allow items to wrap to new lines",
    "gap (or row-gap / column-gap) — spacing between flex/grid items",
    "flex: 1 on a child — shorthand for flex-grow:1, flex-shrink:1, flex-basis:0 (fills available space)",
    "align-self: on individual flex items to override align-items for just that item",
    "display: grid — activates Grid; grid-template-columns / grid-template-rows define tracks",
    "repeat(3, 1fr) — creates 3 equal-width columns using fractional units",
    "grid-column: 1 / 3 — item spans from column line 1 to 3 (spans 2 columns)",
    "place-items: center — shorthand for align-items + justify-items (centers grid items both ways)",
  ],
  codeExample: {
    language: "css",
    title: "Flexbox Navigation + Card Row + CSS Grid Page Layout",
    code: `/* ── Flexbox: Navbar ── */
.navbar {
  display: flex;
  justify-content: space-between; /* logo left, links right */
  align-items: center;
  padding: 1rem 2rem;
  background: #1e293b;
}
.navbar a { color: white; text-decoration: none; margin-left: 1.5rem; }

/* ── Flexbox: Center anything perfectly ── */
.hero {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

/* ── Flexbox: Card row that wraps ── */
.card-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}
.card {
  flex: 1 1 280px; /* grow, shrink, minimum width 280px */
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.5rem;
}

/* ── CSS Grid: 3-column page layout ── */
.page {
  display: grid;
  grid-template-columns: 240px 1fr 300px; /* sidebar | main | aside */
  grid-template-rows: auto 1fr auto;       /* header | content | footer */
  gap: 1rem;
  min-height: 100vh;
}

/* Header spans all 3 columns */
.header { grid-column: 1 / 4; }
.footer { grid-column: 1 / 4; }

/* ── CSS Grid: Equal columns with fr ── */
.grid-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 equal columns */
  gap: 1.5rem;
}

/* ── CSS Grid: Feature card that spans 2 cols ── */
.featured {
  grid-column: 1 / 3; /* spans first two columns */
}

/* ── CSS Grid: Center all items ── */
.center-grid {
  display: grid;
  place-items: center; /* shorthand for align-items + justify-items */
}`,
  },
}
