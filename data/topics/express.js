export const expressContent = {
  slug: "express",
  briefDescription: [
    "Express.js is a minimal, unopinionated web framework for Node.js. It provides a thin layer of fundamental web application features — routing, middleware, request/response handling — without obscuring Node.js features.",
    "Middleware is the core concept in Express. Every request goes through a pipeline of middleware functions that can modify req/res, terminate the cycle, or pass control to the next function via next(). This enables logging, auth, validation, error handling, and more.",
    "Express is the backbone of the MEAN/MERN stack and remains one of the most downloaded npm packages. Frameworks like NestJS, Fastify, and Hono are modern alternatives but Express knowledge is foundational.",
  ],
  keyConcepts: [
    "Middleware chain: app.use(), next(), order matters",
    "Router: express.Router() for modular routes",
    "Route parameters: req.params, req.query, req.body",
    "Error handling middleware: (err, req, res, next)",
    "express.json() and express.urlencoded() body parsers",
    "CORS, helmet, rate-limiting middleware",
    "Static files: express.static()",
    "REST conventions: GET/POST/PUT/PATCH/DELETE",
  ],
  codeExample: {
    language: "javascript",
    title: "Express REST API with Middleware & Router",
    code: `const express = require('express')
const app = express()

// Global middleware
app.use(express.json())
app.use((req, res, next) => {
  console.log(\`[\${new Date().toISOString()}] \${req.method} \${req.url}\`)
  next()
})

// Auth middleware
function requireAuth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ error: 'Unauthorized' })
  req.user = verifyToken(token)
  next()
}

// Router
const usersRouter = express.Router()

usersRouter.get('/', async (req, res) => {
  const users = await User.findAll()
  res.json(users)
})

usersRouter.post('/', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    res.status(201).json(user)
  } catch (err) {
    next(err)
  }
})

app.use('/api/users', requireAuth, usersRouter)

// Error handler (must be last)
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message })
})

app.listen(3000)`,
  },
}
