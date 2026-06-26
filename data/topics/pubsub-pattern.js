export const pubsubPatternContent = {
  slug: "pubsub-pattern",
  briefDescription: [
    "The Publish-Subscribe (Pub/Sub) pattern is a messaging model where publishers send messages to named channels (topics) without knowing who will receive them, and subscribers listen to channels without knowing who sent the messages. This decoupling makes architectures more flexible and scalable. In Node.js, the EventEmitter class provides in-process Pub/Sub — great for decoupling code within the same process. Redis provides network-level Pub/Sub across multiple processes and servers.",
    "Redis is commonly used for caching and Pub/Sub messaging. For caching: store frequently accessed data in Redis with a TTL (Time to Live) — on each request, check Redis first (cache hit = fast), and only query the database on a cache miss. Redis data structures include: strings (key/value), hashes (objects), lists (queues), sets (unique values), sorted sets (leaderboards with scores), and streams (event logs). The TTL feature auto-expires cached data to prevent stale values.",
    "Redis Pub/Sub: PUBLISH sends a message to a channel, SUBSCRIBE listens to a channel. Unlike message queues (BullMQ), Pub/Sub in Redis is fire-and-forget — messages are NOT persisted. If a subscriber is offline when a message is published, it misses it forever. For durable, persistent messaging with replay capabilities, use Redis Streams instead. In microservices, Pub/Sub enables Event-Driven Architecture (EDA) — services communicate through events without direct dependencies, enabling fan-out (one event → multiple services notified simultaneously).",
  ],
  keyConcepts: [
    "Pub/Sub: publishers send to channels, subscribers listen — decoupled communication",
    "Node.js EventEmitter: in-process Pub/Sub — bus.on('event', handler), bus.emit('event', data)",
    "Redis caching: store DB results with TTL, serve fast from memory on repeat requests",
    "Redis data structures: strings, hashes, lists, sets, sorted sets, streams",
    "Redis TTL (Time to Live): auto-expire cached keys to prevent stale data",
    "Redis Pub/Sub: PUBLISH channel message, SUBSCRIBE channel — fire-and-forget",
    "Pub/Sub limitation: messages NOT persisted — offline subscribers miss them",
    "Redis Streams vs Pub/Sub: Streams persist messages, support replay, consumer groups",
    "Fan-out: one published event delivered to ALL active subscribers simultaneously",
    "Event-Driven Architecture (EDA): services communicate through events, not direct calls",
    "Message queue vs Pub/Sub: queue = one consumer per message; Pub/Sub = all consumers get it",
    "Advanced Redis: TTL, complex data structures, Pub/Sub for real-time messaging",
  ],
  codeExample: {
    language: "javascript",
    title: "Redis Caching + Pub/Sub + Node.js EventEmitter",
    code: `const Redis = require('ioredis')
const { EventEmitter } = require('events')

// ── Redis Caching ─────────────────────────────────
const redis = new Redis(process.env.REDIS_URL)

async function getCachedUser(userId) {
  const cacheKey = \`user:\${userId}\`

  // 1. Check cache first
  const cached = await redis.get(cacheKey)
  if (cached) {
    console.log('Cache HIT:', userId)
    return JSON.parse(cached)
  }

  // 2. Cache miss — query database
  console.log('Cache MISS:', userId)
  const user = await prisma.user.findUnique({ where: { id: userId } })
  if (!user) return null

  // 3. Store in cache with 5-minute TTL
  await redis.setEx(cacheKey, 300, JSON.stringify(user))
  return user
}

// Invalidate cache when user is updated
async function updateUser(userId, data) {
  await prisma.user.update({ where: { id: userId }, data })
  await redis.del(\`user:\${userId}\`)  // clear stale cache
}

// ── Redis Pub/Sub ─────────────────────────────────
const publisher  = new Redis(process.env.REDIS_URL)
const subscriber = new Redis(process.env.REDIS_URL)

// Subscribe to channels
await subscriber.subscribe('order:created', 'user:registered')

subscriber.on('message', (channel, message) => {
  const data = JSON.parse(message)
  console.log(\`[\${channel}]\`, data)

  if (channel === 'order:created') {
    sendOrderConfirmation(data.email, data.orderId)
    updateInventory(data.items)
  }
  if (channel === 'user:registered') {
    sendWelcomeEmail(data.email)
  }
})

// Publish when an order is placed
async function createOrder(orderData) {
  const order = await prisma.order.create({ data: orderData })

  // Publish to all subscribers (fan-out)
  await publisher.publish('order:created', JSON.stringify({
    orderId: order.id,
    email: orderData.email,
    items: orderData.items,
    timestamp: Date.now()
  }))

  return order
}

// ── In-process EventEmitter (Pub/Sub within one Node.js process) ──
const appBus = new EventEmitter()
appBus.setMaxListeners(50)

// Multiple handlers for one event (fan-out in-process)
appBus.on('user:registered', ({ userId }) => sendWelcomeEmail(userId))
appBus.on('user:registered', ({ userId }) => createDefaultProfile(userId))
appBus.on('user:registered', ({ userId }) => trackAnalytics(userId))

// Emit from anywhere
appBus.emit('user:registered', { userId: 'u123', email: 'ali@devonix.io' })`,
  },
}
