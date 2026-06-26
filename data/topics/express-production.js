export const expressProductionContent = {
  slug: "express-production",
  briefDescription: [
    "A production-ready Express project separates concerns into a clear folder structure: routes/ (URL handlers), controllers/ (business logic called by routes), services/ (data access and third-party integrations), models/ (database schema/ORM models), middleware/ (auth, validation, error handling), config/ (environment config), and utils/ (helper functions). The controller calls the service; the service calls the model/DB. This separation makes code testable (you can unit-test services without HTTP), maintainable, and scalable as the project grows.",
    "Environment configuration should never be hardcoded. Use dotenv (require('dotenv').config()) to load .env files. Validate all required environment variables on startup — if DATABASE_URL is missing, fail fast with a clear error rather than a cryptic runtime crash later. Use different .env files for different environments (.env.development, .env.production, .env.test). The config/ folder typically exports a single config object built from process.env. In production, set NODE_ENV=production — Express automatically disables certain dev features and enables caching.",
    "Database optimization and logging are essential for production APIs. Add indexes on columns you query frequently (WHERE clauses, ORDER BY, JOIN keys). Use connection pooling so you're not creating/destroying DB connections for every request. Log requests with morgan, log errors with a structured logger like winston or pino (they output JSON, making logs searchable in Datadog/CloudWatch/Loki). Use correlation IDs (add a unique ID to each request and include it in all log lines) so you can trace a request through your entire system. Monitor response times, error rates, and slow queries.",
  ],
  keyConcepts: [
    "MVC structure: routes → controllers → services → models (each layer has one responsibility)",
    "routes/: define HTTP endpoints and call controllers; no business logic here",
    "controllers/: extract request data, call services, send response",
    "services/: business logic and data access — reusable, testable without HTTP",
    "dotenv: load .env file into process.env; never commit .env to git",
    "Validate env vars on startup — fail fast if required variables are missing",
    "NODE_ENV=production: disables stack traces in error responses, enables caching",
    "Database indexes: add on columns used in WHERE, ORDER BY, JOIN to speed up queries",
    "Connection pooling: reuse DB connections instead of creating new ones per request",
    "winston / pino: structured JSON logging — include timestamp, level, correlationId",
    "Morgan: HTTP request logging — method, URL, status, response time",
    "Correlation IDs: unique ID per request, logged on every line for traceability",
  ],
  codeExample: {
    language: "javascript",
    title: "Production Project Structure — Config, MVC, Logging, Error Handling",
    code: `// ── config/index.js ──
require('dotenv').config()

function requireEnv(name) {
  if (!process.env[name]) throw new Error(\`Missing required env var: \${name}\`)
  return process.env[name]
}

module.exports = {
  port:        process.env.PORT ?? 3000,
  nodeEnv:     process.env.NODE_ENV ?? 'development',
  databaseUrl: requireEnv('DATABASE_URL'),
  jwtSecret:   requireEnv('JWT_SECRET'),
  isDev:       process.env.NODE_ENV !== 'production',
}

// ── services/userService.js ──
const prisma = require('../lib/prisma')
const bcrypt  = require('bcrypt')

async function getAllUsers({ page = 1, limit = 10, search }) {
  const where = search
    ? { OR: [{ name: { contains: search } }, { email: { contains: search } }] }
    : {}
  const [users, total] = await Promise.all([
    prisma.user.findMany({ where, skip: (page - 1) * limit, take: limit }),
    prisma.user.count({ where }),
  ])
  return { users, total }
}

async function createUser({ name, email, password, role = 'USER' }) {
  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    const err = new Error('Email already in use')
    err.statusCode = 409
    throw err
  }
  const hashedPassword = await bcrypt.hash(password, 12)
  return prisma.user.create({ data: { name, email, password: hashedPassword, role } })
}

module.exports = { getAllUsers, createUser }

// ── controllers/userController.js ──
const userService = require('../services/userService')

async function index(req, res, next) {
  try {
    const { page, limit, search } = req.query
    const { users, total } = await userService.getAllUsers({ page: +page, limit: +limit, search })
    res.json({ data: users, meta: { total } })
  } catch (err) { next(err) }  // pass to error middleware
}

async function create(req, res, next) {
  try {
    const user = await userService.createUser(req.body)
    const { password: _, ...safeUser } = user  // never send password
    res.status(201).json({ data: safeUser })
  } catch (err) { next(err) }
}

module.exports = { index, create }

// ── routes/users.js ──
const { Router } = require('express')
const ctrl = require('../controllers/userController')
const { validate } = require('../middleware/validate')
const { createUserSchema } = require('../schemas/userSchema')
const { requireAuth } = require('../middleware/auth')

const router = Router()
router.get('/',    requireAuth, ctrl.index)
router.post('/',   validate(createUserSchema), ctrl.create)
module.exports = router

// ── middleware/errorHandler.js ──
const config = require('../config')

module.exports = function errorHandler(err, req, res, next) {
  const status = err.statusCode ?? 500
  const message = err.message ?? 'Internal Server Error'
  const body = { error: message, requestId: req.id }
  if (config.isDev) body.stack = err.stack  // only in dev
  res.status(status).json(body)
}

// ── app.js ──
const express       = require('express')
const morgan        = require('morgan')
const { v4: uuid }  = require('uuid')
const usersRouter   = require('./routes/users')
const errorHandler  = require('./middleware/errorHandler')

const app = express()
app.use((req, res, next) => { req.id = uuid(); next() })  // correlation ID
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(express.json())
app.use('/api/v1/users', usersRouter)
app.use(errorHandler)  // must be last

module.exports = app`,
  },
}
