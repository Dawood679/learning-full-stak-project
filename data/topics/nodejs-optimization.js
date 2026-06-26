export const nodejsOptimizationContent = {
  slug: "nodejs-optimization",
  briefDescription: [
    "Database optimization is about making your queries faster and your server use fewer resources. The key techniques: add indexes on columns you filter or sort by (a query on an unindexed column scans every row; an indexed column jumps directly to matches), use SELECT only the columns you need instead of SELECT *, paginate large result sets, avoid N+1 query problems (fetching a list then querying the DB separately for each item — use JOIN or Prisma's include instead), and use database connection pooling so your app reuses connections instead of opening new ones for every request.",
    "Logging in production should be structured (JSON format) so log aggregation tools (Datadog, Loki, CloudWatch) can parse, filter, and search them. Use a logger like winston or pino instead of console.log. Log levels: error (something broke), warn (unexpected but not critical), info (normal operations), debug (detailed for development only). Always include: timestamp, log level, request ID/correlation ID, user ID if available, and the message. Never log sensitive data (passwords, tokens, credit cards). Separate error logs from access logs.",
    "Node.js performance tips: use async/await for all I/O (never block the event loop with synchronous file reads), cache expensive computations with Redis or in-memory Maps, use streaming for large files instead of loading them entirely into memory, set up HTTP response caching with cache-control headers, use compression middleware for text responses, profile slow endpoints with clinic.js or Node.js's built-in --prof flag, and use worker_threads for CPU-intensive tasks (image processing, cryptography) to avoid blocking the event loop.",
  ],
  keyConcepts: [
    "Database indexes: add on WHERE, ORDER BY, JOIN columns — makes lookups O(log n) not O(n)",
    "N+1 query problem: fetching list + N separate queries for related data — use JOIN/include",
    "SELECT only needed columns: avoid SELECT * — reduces data transfer and memory",
    "Pagination: LIMIT + OFFSET (or cursor-based) — never return millions of rows",
    "Connection pooling: reuse DB connections — set pool min/max in Prisma or pg config",
    "EXPLAIN / EXPLAIN ANALYZE: PostgreSQL command to see query execution plan",
    "pino / winston: structured JSON logging — log level, timestamp, correlationId",
    "Log levels: error, warn, info, debug — in production only log info and above",
    "Correlation ID: unique ID per request, included in all logs for traceability",
    "Never log: passwords, tokens, credit card numbers, personal data",
    "Redis caching: cache DB query results for frequently read, rarely changing data",
    "Streaming: use stream piping for large files instead of res.json(largeArray)",
  ],
  codeExample: {
    language: "javascript",
    title: "Database Query Optimization, Structured Logging with Pino, Redis Caching",
    code: `// ── Optimized Prisma queries ──
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient({
  log: ['query', 'warn', 'error'],  // log slow queries
})

// ✗ BAD: N+1 problem — separate query per user
async function getUsersWithPostsBad() {
  const users = await prisma.user.findMany()
  for (const user of users) {
    user.posts = await prisma.post.findMany({ where: { authorId: user.id } })  // N queries!
  }
  return users
}

// ✓ GOOD: single query with include (JOIN)
async function getUsersWithPostsGood({ page = 1, limit = 20, search }) {
  return prisma.user.findMany({
    where: search ? { name: { contains: search, mode: 'insensitive' } } : {},
    select: {            // ✓ only needed columns
      id:    true,
      name:  true,
      email: true,
      posts: {           // ✓ joined in one query
        select: { id: true, title: true, createdAt: true },
        where:  { published: true },
        orderBy: { createdAt: 'desc' },
        take: 5,         // only latest 5 posts
      },
      _count: { select: { posts: true } },
    },
    orderBy: { createdAt: 'desc' },
    skip: (page - 1) * limit,
    take: limit,
  })
}

// ── Structured logging with pino ──
const pino = require('pino')
const logger = pino({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  transport: process.env.NODE_ENV !== 'production'
    ? { target: 'pino-pretty' }  // readable in dev
    : undefined,                  // JSON in prod
})

// Request logger middleware
function requestLogger(req, res, next) {
  const start = Date.now()
  const child = logger.child({ requestId: req.id, userId: req.user?.id })
  req.log = child
  child.info({ method: req.method, url: req.url }, 'Incoming request')

  res.on('finish', () => {
    const ms = Date.now() - start
    child.info({ status: res.statusCode, ms }, 'Request completed')
    if (ms > 1000) child.warn({ ms }, 'Slow request detected')
  })
  next()
}

// Usage in routes
router.get('/users', requireAuth, async (req, res, next) => {
  try {
    req.log.info('Fetching users list')
    const users = await getUsersWithPostsGood(req.query)
    req.log.info({ count: users.length }, 'Users fetched successfully')
    res.json({ data: users })
  } catch (err) {
    req.log.error({ err }, 'Failed to fetch users')
    next(err)
  }
})

// ── Redis caching ──
const Redis = require('ioredis')
const redis = new Redis(process.env.REDIS_URL)

async function getCachedOrFetch(key, ttlSeconds, fetchFn) {
  const cached = await redis.get(key)
  if (cached) {
    req.log?.debug({ key }, 'Cache hit')
    return JSON.parse(cached)
  }
  const data = await fetchFn()
  await redis.setex(key, ttlSeconds, JSON.stringify(data))
  req.log?.debug({ key }, 'Cache miss — stored result')
  return data
}

// Use in a route
router.get('/products', async (req, res) => {
  const products = await getCachedOrFetch(
    'products:all',
    300,  // cache for 5 minutes
    () => prisma.product.findMany({ where: { active: true } })
  )
  res.json({ data: products })
})`,
  },
}
