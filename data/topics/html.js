export const htmlContent = {
  slug: "html",
  briefDescription: [
    "HTML (HyperText Markup Language) is the backbone of every web page. It defines the structure and meaning of content using tags like <h1> for headings, <p> for paragraphs, <a> for links, and <img> for images. Without HTML, browsers would have no idea how to display any content on the screen.",
    "HTML5 introduced semantic elements — tags like <header>, <main>, <article>, <section>, <footer>, and <aside> — that describe the purpose of content, not just its appearance. This helps search engines understand your page, improves accessibility for screen readers, and makes your code easier to maintain.",
    "Forms are one of the most powerful features of HTML. Using <form>, <input>, <textarea>, <select>, and <button> tags with various input types (text, email, password, checkbox, radio, date, file), you can collect user data and send it to a server. Proper form design is essential for every web application.",
  ],
  keyConcepts: [
    "HTML document structure: DOCTYPE, <html>, <head>, <title>, <body>",
    "Text elements: h1-h6 tags, <p>, <span>, <code>, <pre>, <br>, <a>",
    "Working with lists: <ol> (ordered), <ul> (unordered), <li> (list item)",
    "Semantic HTML5: <header>, <nav>, <main>, <section>, <article>, <aside>, <footer>",
    "Block vs inline elements: <div> is block, <span> is inline",
    "HTML attributes: href, target, src, alt, width, height, id, class",
    "Forms and inputs: <form>, <input>, <textarea>, <select>, <button>, <label>",
    "Input types: text, email, password, checkbox, radio, date, number, file, range",
    "Form attributes: method (GET/POST), action, required, placeholder, name, enctype",
    "Media tags: <img>, <video>, <audio>, <source> with controls, autoplay, loop, muted",
  ],
  codeExample: {
    language: "html",
    title: "Complete HTML5 Page with Semantic Structure and Form",
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="A well-structured HTML5 page" />
  <title>My Web Page</title>
</head>
<body>

  <header>
    <nav>
      <a href="/">Home</a>
      <a href="/about">About</a>
      <a href="/contact">Contact</a>
    </nav>
  </header>

  <main>
    <article>
      <h1>Welcome to HTML</h1>
      <p>HTML structures <strong>every</strong> web page.</p>
      <ul>
        <li>Easy to learn</li>
        <li>Works in all browsers</li>
        <li>Foundation of the web</li>
      </ul>
    </article>

    <section>
      <h2>Contact Us</h2>
      <form action="/submit" method="POST">
        <label for="name">Your Name:</label>
        <input type="text" id="name" name="name" required placeholder="Ali Khan" />

        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required />

        <label for="message">Message:</label>
        <textarea name="message" id="message" rows="4"></textarea>

        <button type="submit">Send</button>
      </form>
    </section>
  </main>

  <footer>
    <p>&copy; 2026 DevOnix Cohort 2.0</p>
  </footer>

</body>
</html>`,
  },
}
