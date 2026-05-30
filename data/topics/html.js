export const htmlContent = {
  slug: "html",
  briefDescription: [
    "HTML (HyperText Markup Language) is the standard markup language for creating web pages. It describes the structure of a web page semantically and originally included cues for the appearance of the document.",
    "HTML elements are represented by tags, written using angle brackets. Tags like <p>, <h1>, and <div> define how content is structured. Browsers read HTML documents and render them into visible or audible web pages.",
    "Modern HTML5 introduced semantic elements like <header>, <main>, <article>, and <section> that improve accessibility, SEO, and code readability by giving meaningful names to document regions.",
  ],
  keyConcepts: [
    "DOCTYPE declaration and proper document structure",
    "Semantic elements: <header>, <main>, <article>, <section>, <footer>, <nav>",
    "Forms, inputs, labels and accessibility attributes (aria-*)",
    "Meta tags for SEO: description, og:tags, viewport",
    "Block vs inline vs inline-block elements",
    "HTML5 APIs: Canvas, Local Storage, Geolocation",
    "Accessibility: alt text, ARIA roles, tab order",
  ],
  codeExample: {
    language: "html",
    title: "Semantic HTML5 Page Structure",
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="A well-structured HTML5 page" />
  <title>My Page</title>
</head>
<body>
  <header>
    <nav aria-label="Main navigation">
      <a href="/">Home</a>
      <a href="/about">About</a>
    </nav>
  </header>
  <main>
    <article>
      <h1>Article Title</h1>
      <p>Content goes here...</p>
    </article>
    <aside>Related links</aside>
  </main>
  <footer>
    <p>&copy; 2024 My Site</p>
  </footer>
</body>
</html>`,
  },
}
