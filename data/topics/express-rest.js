export const expressRestContent = {
  slug: "express-rest",
  briefDescription: [
    "REST (Representational State Transfer) is an architectural style for designing APIs. RESTful APIs use HTTP methods semantically: GET (read), POST (create), PUT/PATCH (update), DELETE (delete). URLs (called endpoints or resources) represent nouns — /users, /products/:id, /orders/:orderId/items. HTTP status codes communicate results: 200 OK, 201 Created, 204 No Content (delete success), 400 Bad Request (invalid input), 401 Unauthorized (not logged in), 403 Forbidden (logged in but no permission), 404 Not Found, 422 Unprocessable Entity (validation failed), 500 Internal Server Error.",
    "Express Router (express.Router()) creates modular route handlers. You define routes on the router and mount it on the app with app.use('/api/users', usersRouter). This keeps your main server file clean and separates concerns by resource. Route parameters (:id) are accessed via req.params.id. Query strings (?page=2&limit=10) are in req.query. The request body is in req.body (after express.json() middleware). A full RESTful resource has index (GET /), show (GET /:id), create (POST /), update (PUT /:id or PATCH /:id), and destroy (DELETE /:id) handlers.",
    "Input validation is critical for any API. Never trust user input. Use a library like Zod or express-validator to define schemas and validate req.body before processing it. Return 422 with descriptive error messages for validation failures. Pagination is standard for list endpoints: accept page and limit query params, compute offset = (page-1)*limit, use LIMIT and OFFSET in your database query, and return total, page, limit, and totalPages alongside the data array. Always return consistent JSON shapes — a data wrapper with optional meta, links, and errors fields makes your API predictable for clients.",
  ],
  keyConcepts: [
    "REST: GET (read), POST (create), PUT (replace), PATCH (partial update), DELETE (remove)",
    "Resource URLs: /users, /users/:id, /users/:id/posts — plural nouns, hierarchical",
    "Status codes: 200 OK, 201 Created, 204 No Content, 400 Bad Request, 401, 403, 404, 422, 500",
    "express.Router(): creates a modular router; mount with app.use('/prefix', router)",
    "req.params.id: URL parameter — from Route path '/users/:id'",
    "req.query.page: query string parameter — from URL '?page=2&limit=10'",
    "req.body: parsed request body (requires express.json() middleware)",
    "Pagination: page + limit query params → offset = (page-1)*limit",
    "Consistent response shape: { data, meta: { total, page, limit, totalPages } }",
    "Input validation: validate before processing — return 422 with field-level errors",
    "Idempotency: GET, PUT, DELETE are idempotent (same result on repeat calls); POST is not",
    "Versioning: /api/v1/users — prefix routes with version to allow breaking changes",
  ],
  codeExample: {
    language: "javascript",
    title: "RESTful API with Express Router, Pagination, Validation, Consistent Responses",
    code: `// ── routes/users.js ──
const express = require('express')
const router  = express.Router()
const { z }   = require('zod')

// In-memory store (replace with DB in real app)
let users = [
  { id: 1, name: 'Ali Ahmed', email: 'ali@example.com', role: 'admin' },
  { id: 2, name: 'Sara Khan', email: 'sara@example.com', role: 'user' },
]
let nextId = 3

// ── Validation schemas ──
const createUserSchema = z.object({
  name:  z.string().min(2).max(100),
  email: z.string().email(),
  role:  z.enum(['admin', 'user']).optional().default('user'),
})

// ── Helper: consistent response ──
function success(res, data, statusCode = 200, meta = {}) {
  return res.status(statusCode).json({ data, ...meta })
}

function fail(res, message, statusCode = 400, errors = null) {
  return res.status(statusCode).json({ error: message, ...(errors && { errors }) })
}

// ── GET /api/users — list with pagination ──
router.get('/', (req, res) => {
  const page  = Math.max(1, parseInt(req.query.page) || 1)
  const limit = Math.min(50, parseInt(req.query.limit) || 10)
  const search = req.query.search?.toLowerCase()

  let filtered = search
    ? users.filter(u => u.name.toLowerCase().includes(search) || u.email.toLowerCase().includes(search))
    : users

  const total = filtered.length
  const data  = filtered.slice((page - 1) * limit, page * limit)

  success(res, data, 200, {
    meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
  })
})

// ── GET /api/users/:id — single user ──
router.get('/:id', (req, res) => {
  const id   = parseInt(req.params.id)
  const user = users.find(u => u.id === id)
  if (!user) return fail(res, 'User not found', 404)
  success(res, user)
})

// ── POST /api/users — create user ──
router.post('/', (req, res) => {
  const result = createUserSchema.safeParse(req.body)
  if (!result.success) {
    const errors = result.error.flatten().fieldErrors
    return fail(res, 'Validation failed', 422, errors)
  }

  const { name, email, role } = result.data

  // Check for duplicate email
  if (users.some(u => u.email === email)) {
    return fail(res, 'Email already in use', 409)
  }

  const newUser = { id: nextId++, name, email, role }
  users.push(newUser)
  success(res, newUser, 201)
})

// ── PATCH /api/users/:id — partial update ──
router.patch('/:id', (req, res) => {
  const id    = parseInt(req.params.id)
  const index = users.findIndex(u => u.id === id)
  if (index === -1) return fail(res, 'User not found', 404)

  const updateSchema = createUserSchema.partial()  // all fields optional
  const result = updateSchema.safeParse(req.body)
  if (!result.success) return fail(res, 'Validation failed', 422, result.error.flatten().fieldErrors)

  users[index] = { ...users[index], ...result.data }
  success(res, users[index])
})

// ── DELETE /api/users/:id ──
router.delete('/:id', (req, res) => {
  const id    = parseInt(req.params.id)
  const index = users.findIndex(u => u.id === id)
  if (index === -1) return fail(res, 'User not found', 404)
  users.splice(index, 1)
  res.status(204).end()  // 204 No Content — no body
})

module.exports = router

// ── app.js: mount the router ──
// const usersRouter = require('./routes/users')
// app.use('/api/v1/users', usersRouter)`,
  },
}
