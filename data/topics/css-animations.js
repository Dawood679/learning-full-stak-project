export const cssAnimationsContent = {
  slug: "css-animations",
  briefDescription: [
    "CSS pseudo-classes and pseudo-elements let you style elements based on their state or add virtual content without modifying HTML. Pseudo-classes use a single colon: :hover (mouse over), :focus (keyboard/tab focus), :active (being clicked), :visited (visited links), :checked (checked checkboxes/radios), :disabled (disabled inputs), :first-child, :last-child, :nth-child(n). Pseudo-elements use double colons: ::before and ::after inject virtual content into an element, ::placeholder styles input hint text, ::selection styles highlighted text, ::first-line and ::first-letter target specific text parts.",
    "CSS transitions smoothly animate property changes between two states. You define which property to animate (transition-property), how long it takes (transition-duration), the speed curve (transition-timing-function: ease, linear, ease-in, ease-out, ease-in-out, cubic-bezier()), and an optional delay (transition-delay). The shorthand is transition: property duration timing-function delay. Commonly animated properties include opacity, transform, color, background-color, and width. Note: not all CSS properties can be animated (display: none cannot transition, use opacity + visibility instead).",
    "CSS @keyframes animations give you full control over multi-step animations. You define animation steps as percentages (0% to 100%, or using the keywords from and to). Then apply the animation to an element with animation-name, animation-duration, animation-timing-function, animation-delay, animation-iteration-count (or infinite), and animation-direction (normal, reverse, alternate). The shorthand animation property combines all of these. Common use cases: loading spinners (rotate), pulsing effects (scale), entrance animations (translateY + opacity), and skeleton loaders.",
  ],
  keyConcepts: [
    "Pseudo-classes (:hover, :focus, :active, :checked, :disabled, :first-child, :nth-child)",
    "Pseudo-elements (::before, ::after, ::placeholder, ::selection, ::first-line)",
    "::before and ::after: insert virtual content — require content: '' property",
    "transition: property duration timing ease delay — shorthand for smooth state changes",
    "transition-timing-function: ease | linear | ease-in | ease-out | cubic-bezier()",
    "@keyframes name { from { } to { } } — or use 0%, 50%, 100% for multi-step",
    "animation: name duration timing delay iteration direction fill-mode — shorthand",
    "animation-iteration-count: infinite — loops the animation forever",
    "animation-direction: alternate — plays forward then backward",
    "transform: rotate(), scale(), translateX/Y(), skew() — GPU-accelerated properties",
    "opacity: 0 to 1 — animate visibility without removing from layout (unlike display:none)",
    "will-change: transform — hints browser to pre-optimize for animation",
  ],
  codeExample: {
    language: "css",
    title: "Pseudo-classes, Pseudo-elements, Transitions, and @keyframes Animations",
    code: `/* ── Pseudo-classes ── */
a:hover { color: violet; }
input:focus { outline: 2px solid #6366f1; border-color: transparent; }
button:active { transform: scale(0.97); }
input:checked + label { color: green; font-weight: bold; }
li:nth-child(odd) { background: #f8f9fa; }
input:disabled { opacity: 0.5; cursor: not-allowed; }

/* ── Pseudo-elements ── */
/* Add decorative quote mark before blockquote */
blockquote::before {
  content: '"';
  font-size: 4rem;
  color: #6366f1;
  line-height: 0;
  vertical-align: -0.5em;
}

/* Style placeholder text */
input::placeholder { color: #94a3b8; font-style: italic; }

/* Highlight selected text */
::selection { background: #6366f1; color: white; }

/* ── CSS Transitions ── */
.card {
  background: white;
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  /* animate multiple properties */
  transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.2s;
}
.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 32px rgba(0,0,0,0.15);
}

.btn {
  background: #6366f1;
  color: white;
  transition: background 0.2s ease, opacity 0.2s;
}
.btn:hover { background: #4f46e5; }
.btn:active { opacity: 0.85; }

/* ── CSS @keyframes: Spin animation (loading spinner) ── */
@keyframes spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
.spinner {
  width: 40px; height: 40px;
  border: 4px solid #e2e8f0;
  border-top-color: #6366f1;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

/* ── @keyframes: Fade-in slide-up entrance ── */
@keyframes fadeInUp {
  0%   { opacity: 0; transform: translateY(30px); }
  100% { opacity: 1; transform: translateY(0); }
}
.hero-title {
  animation: fadeInUp 0.6s ease-out both;
}
.hero-subtitle {
  animation: fadeInUp 0.6s ease-out 0.2s both; /* 0.2s delay */
}

/* ── @keyframes: Pulse (attention-grabbing) ── */
@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50%       { transform: scale(1.05); }
}
.badge {
  animation: pulse 2s ease-in-out infinite;
}`,
  },
}
