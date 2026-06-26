export const expressContent = {
  slug: "express",
  briefDescription: [
    "Express.js is a minimal, unopinionated web framework for Node.js. Install it with 'npm install express'. You create an app with express(), define routes (app.get, app.post, app.put, app.patch, app.delete), and start the server with app.listen(port). You can use query parameters (?name=value, accessed via req.query), URL parameters (/users/:id, accessed via req.params), and request body (POST data, accessed via req.body after adding express.json() middleware).",
    "Middleware is the heart of Express. Every request flows through a pipeline of middleware functions in registration order. Each middleware receives (req, res, next) — it can modify req/res, respond to the request, or call next() to pass to the next middleware. Types of middleware: built-in (express.json(), express.static()), third-party (helmet for security, cors for CORS headers, morgan for logging), and custom. Error-handling middleware has 4 parameters: (err, req, res, next) and must be registered last.",
    "Express Router (express.Router()) lets you organize routes into separate files. You define route groups on a router and mount them on a path with app.use('/api/users', usersRouter). Template engines like EJS let you render HTML with dynamic data using <%=value%> for output, <%code%> for logic, and <%-html%> for unescaped HTML. Serving static files (HTML, CSS, images) uses express.static('public').",
  ],
  keyConcepts: [
    "Express setup: express(), app.get/post/put/patch/delete, app.listen(port)",
    "Route parameters: req.params.id for /users/:id",
    "Query parameters: req.query.page for /users?page=2",
    "Request body: req.body (requires express.json() or express.urlencoded() middleware)",
    "Middleware: (req, res, next) pipeline, registration order matters",
    "Built-in middleware: express.json(), express.urlencoded(), express.static('public')",
    "Third-party middleware: helmet (security), cors, morgan (logging)",
    "Custom middleware: auth checks, request logging, input validation",
    "Router: express.Router() for modular route files, app.use('/path', router)",
    "Error middleware: (err, req, res, next) — must be registered last, called with next(err)",
    "EJS template engine: <%=%> output, <%%> logic, app.set('view engine', 'ejs')",
    "Serving static files: express.static('public') for CSS, JS, images",
  ],
  codeExample: {
    language: "javascript",
    title: "Express REST API with Middleware, Router, and Error Handling",
    code: `const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const morgan = require('morgan')

const app = express()

// ── Global Middleware ─────────────────────────────
app.use(helmet())              // Security headers
app.use(cors())                // Allow cross-origin requests
app.use(morgan('dev'))         // HTTP request logger
app.use(express.json())        // Parse JSON bodies → req.body
app.use(express.static('public'))  // Serve static files

// ── Custom Auth Middleware ────────────────────────
function requireAuth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ error: 'Token required' })
  // verify token...
  req.user = { id: 'u1', role: 'admin' }
  next()
}

// ── Router ────────────────────────────────────────
const usersRouter = express.Router()

// GET /api/users?page=1&limit=10
usersRouter.get('/', async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query
    const users = await User.findAll({ limit, offset: (page - 1) * limit })
    res.json({ data: users, page: Number(page) })
  } catch (err) {
    next(err)  // pass to error handler
  }
})

// GET /api/users/:id
usersRouter.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) return res.status(404).json({ error: 'User not found' })
    res.json({ data: user })
  } catch (err) {
    next(err)
  }
})

// POST /api/users
usersRouter.post('/', async (req, res, next) => {
  try {
    const { name, email, password } = req.body
    if (!name || !email) return res.status(422).json({ error: 'name and email required' })
    const user = await User.create({ name, email, password })
    res.status(201).json({ data: user })
  } catch (err) {
    next(err)
  }
})

app.use('/api/users', requireAuth, usersRouter)

// ── Error Handler (must be last) ──────────────────
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(err.statusCode || 500).json({ error: err.message || 'Internal Server Error' })
})

app.listen(3000, () => console.log('Express server running on port 3000'))`,
  },
}
