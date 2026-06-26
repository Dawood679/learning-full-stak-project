export const cssResponsiveContent = {
  slug: "css-responsive",
  briefDescription: [
    "Responsive design makes websites look and work well on all screen sizes — from mobile phones to large desktop monitors. The foundation is the viewport meta tag in HTML: <meta name='viewport' content='width=device-width, initial-scale=1.0'>. Without it, mobile browsers render the page at desktop width and then zoom out. CSS media queries then let you apply different styles at different breakpoints using @media (max-width: 768px) { } or @media (min-width: 1024px) { }. The mobile-first approach writes base styles for mobile and adds complexity as screens get larger.",
    "Responsive units are essential: percentages (50%) make elements relative to their parent. The vw (viewport width) and vh (viewport height) units are relative to the browser window — 100vw is always the full window width. The em unit is relative to the parent element's font-size. The rem unit is relative to the root (html) element's font-size — much more predictable. The clamp(min, preferred, max) function creates fluid typography that scales between a minimum and maximum size: clamp(1rem, 2.5vw, 2rem).",
    "SASS (Syntactically Awesome Stylesheets) is a CSS preprocessor that compiles to regular CSS. It adds programming features: variables ($primary-color: #6366f1), nesting (write selectors inside parent selectors), mixins (@mixin flex-center { display: flex; align-items: center; justify-content: center; }), extends (@extend .card), and functions. SASS comes in two syntaxes: SCSS (uses curly braces and semicolons, closer to CSS) and SASS (indentation-based). Most projects use SCSS. You compile it with sass input.scss output.css or via a build tool like Webpack/Vite.",
  ],
  keyConcepts: [
    "Viewport meta tag: <meta name='viewport' content='width=device-width, initial-scale=1.0'>",
    "@media (max-width: 768px) { } — media query for tablet and below",
    "Mobile-first: write base CSS for mobile, use min-width media queries to add larger styles",
    "Common breakpoints: 480px (mobile), 768px (tablet), 1024px (laptop), 1280px (desktop)",
    "Responsive units: % (relative to parent), vw/vh (relative to viewport), em (parent font), rem (root font)",
    "clamp(min, preferred, max): fluid typography — e.g., clamp(1rem, 2.5vw, 2rem)",
    "Fluid images: img { max-width: 100%; height: auto; } — images never overflow container",
    "SASS variables: $primary: #6366f1; — reuse values across the stylesheet",
    "SASS nesting: write .card { &:hover { } } instead of two separate rules",
    "@mixin: reusable CSS blocks — call with @include mixin-name()",
    "SASS @extend: share styles between selectors without duplicating CSS",
    "SASS compiles to plain CSS — browsers cannot read .scss files directly",
  ],
  codeExample: {
    language: "css",
    title: "Responsive Layout with Media Queries + SCSS Variables, Nesting, and Mixins",
    code: `/* ── Plain CSS: Mobile-first responsive layout ── */

/* Base: mobile (single column) */
.container {
  width: 100%;
  padding: 0 1rem;
  margin: 0 auto;
}

.grid {
  display: grid;
  grid-template-columns: 1fr; /* 1 column on mobile */
  gap: 1rem;
}

/* Tablet: 2 columns */
@media (min-width: 768px) {
  .container { max-width: 720px; padding: 0 1.5rem; }
  .grid { grid-template-columns: repeat(2, 1fr); }
  .sidebar { display: block; } /* show sidebar on tablet */
}

/* Desktop: 3 columns */
@media (min-width: 1024px) {
  .container { max-width: 1200px; padding: 0 2rem; }
  .grid { grid-template-columns: repeat(3, 1fr); }
}

/* Fluid typography using clamp */
h1 { font-size: clamp(1.75rem, 5vw, 3.5rem); }
p  { font-size: clamp(0.9rem, 2vw, 1.125rem); }

/* Fluid images */
img { max-width: 100%; height: auto; display: block; }

/* ─────────────────────────────── */
/* ── SCSS equivalent (compiled) ── */

/* SCSS variables */
$primary: #6366f1;
$secondary: #f1f5f9;
$radius: 12px;

/* SCSS mixin */
@mixin flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

@mixin respond-to($breakpoint) {
  @if $breakpoint == tablet  { @media (min-width: 768px)  { @content; } }
  @if $breakpoint == desktop { @media (min-width: 1024px) { @content; } }
}

/* SCSS nesting + mixin usage */
.card {
  background: white;
  border-radius: $radius;
  padding: 1.5rem;

  &:hover { box-shadow: 0 8px 24px rgba(0,0,0,0.1); }

  .card__title {
    color: $primary;
    font-size: 1.25rem;
  }

  @include respond-to(tablet) {
    display: flex;
    gap: 1rem;
  }
}

.hero {
  @include flex-center;
  min-height: 80vh;
  background: $secondary;
}`,
  },
}
