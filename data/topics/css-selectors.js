export const cssSelectorContent = {
  slug: "css-selectors",
  briefDescription: [
    "CSS selectors target which HTML elements get styled. The most basic selectors are the element selector (p), class selector (.classname), and ID selector (#idname). Classes can be reused on multiple elements while IDs must be unique per page. The universal selector (*) targets every element. You can combine selectors — div.card targets a div that has the class 'card', and h1, h2, h3 applies the same styles to all three heading levels at once.",
    "CSS provides powerful relationship selectors for targeting elements based on their position in the HTML tree. The descendant selector (div p) targets all p tags anywhere inside a div. The direct child selector (ul > li) only targets li elements that are immediate children. The adjacent sibling selector (h2 + p) targets a p immediately after an h2. The general sibling selector (h2 ~ p) targets all p elements that share the same parent as an h2 and come after it.",
    "Attribute selectors let you target elements based on their attributes: input[type='email'] targets email inputs, a[href^='https'] matches links starting with https, img[src$='.png'] matches PNG images, and [data-role='admin'] matches any element with that data attribute. Pseudo-classes target elements in a particular state: :hover, :focus, :first-child, :nth-child(2n), :not(.active). The specificity rules determine which rule wins when multiple selectors target the same element: inline styles > IDs > classes > elements.",
  ],
  keyConcepts: [
    "Element selector: p { } — targets all <p> tags",
    "Class selector: .card { } — targets all elements with class='card'",
    "ID selector: #header { } — targets the element with id='header' (unique per page)",
    "Descendant: div p { } — all <p> inside any <div>",
    "Direct child: ul > li { } — only immediate <li> children of <ul>",
    "Adjacent sibling: h2 + p { } — first <p> immediately after an <h2>",
    "General sibling: h2 ~ p { } — all <p> siblings after an <h2>",
    "Attribute selector: input[type='email'], a[href^='https'], img[src$='.png']",
    "Pseudo-classes: :hover, :focus, :active, :first-child, :last-child, :nth-child(n), :not()",
    "Specificity order: inline styles (1000) > ID (100) > class/pseudo (10) > element (1)",
    "Grouping: h1, h2, h3 { } — same styles applied to all three",
    "!important: Overrides all specificity (use sparingly)",
  ],
  codeExample: {
    language: "css",
    title: "CSS Selectors — Element, Class, ID, Combinators, Attributes, Pseudo-classes",
    code: `/* ── Basic selectors ── */
p { color: #333; }           /* element */
.card { border-radius: 8px; } /* class */
#hero { font-size: 2rem; }    /* ID */
* { box-sizing: border-box; } /* universal */

/* ── Grouping ── */
h1, h2, h3 { font-family: 'Georgia', serif; }

/* ── Combinators ── */
nav a { text-decoration: none; }      /* descendant */
ul > li { list-style: disc; }          /* direct child */
h2 + p { margin-top: 0; }             /* adjacent sibling */
.section ~ footer { color: gray; }    /* general sibling */

/* ── Attribute selectors ── */
input[type="email"] { border-color: blue; }
a[href^="https"] { color: green; }    /* starts with */
img[src$=".png"] { border: 1px solid; } /* ends with */
[data-role="admin"] { font-weight: bold; }

/* ── Pseudo-classes ── */
a:hover { text-decoration: underline; }
input:focus { outline: 2px solid violet; }
li:first-child { font-weight: bold; }
li:last-child { color: gray; }
li:nth-child(odd) { background: #f5f5f5; }
button:not(.primary) { background: white; }

/* ── Specificity example ── */
/* ID wins over class: #submit beats .btn */
#submit { background: red; }   /* specificity: 100 */
.btn    { background: blue; }  /* specificity: 10  → red wins */`,
  },
}
