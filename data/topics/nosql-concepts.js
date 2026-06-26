export const nosqlConceptsContent = {
  slug: "nosql-concepts",
  briefDescription: [
    "NoSQL ('Not only SQL') databases are designed for scenarios where relational databases fall short — huge volumes of data, flexible schemas, horizontal scaling, and specific access patterns. The four main types are: Document stores (MongoDB, CouchDB) — store JSON-like documents; Key-Value stores (Redis, DynamoDB) — store simple key→value pairs with O(1) lookups; Column-family stores (Apache Cassandra, HBase) — organize data in column families for time-series and wide-row data; Graph databases (Neo4j, Amazon Neptune) — store nodes and edges for relationship-heavy data.",
    "The CAP theorem states that a distributed system can only guarantee two of three properties: Consistency (all nodes see the same data at the same time), Availability (every request gets a response), and Partition tolerance (system works despite network failures). MongoDB is typically CP (consistent, partition-tolerant). Redis is CA in single-node mode. Cassandra is AP (available, partition-tolerant). NoSQL databases often use 'eventual consistency' — all replicas will eventually converge to the same value, but may temporarily differ.",
    "When to use NoSQL vs SQL: use MongoDB when your data model is document-like (blog posts, user profiles, product catalogs) and needs flexible schemas; use Redis for caching, sessions, rate limiting, leaderboards, and real-time pub/sub; use Cassandra for time-series data at massive scale; use Neo4j for social graphs, recommendation engines, and fraud detection. Horizontal scaling (sharding) — splitting data across multiple servers based on a shard key — is a key advantage of NoSQL databases. NoSQL databases follow BASE properties (Basically Available, Soft state, Eventual consistency) vs SQL's ACID.",
  ],
  keyConcepts: [
    "Document stores: MongoDB, CouchDB — JSON-like flexible documents, rich queries",
    "Key-Value stores: Redis, DynamoDB — O(1) lookups, TTL expiry, simple data structures",
    "Column-family stores: Cassandra, HBase — wide rows for time-series and analytics",
    "Graph databases: Neo4j — nodes and edges for social networks, fraud detection",
    "CAP theorem: only 2 of 3 (Consistency, Availability, Partition tolerance) guaranteed",
    "Eventual consistency: replicas temporarily differ but eventually converge",
    "Horizontal scaling (sharding): split data across servers by a shard key",
    "BASE vs ACID: NoSQL uses Basically Available, Soft state, Eventual consistency",
    "Schema flexibility: add fields to new documents without migration or ALTER TABLE",
    "When to choose MongoDB: flexible schemas, document-like data, JSON-first APIs",
    "When to choose Redis: caching, sessions, pub/sub, rate limiting, leaderboards",
    "Embedding vs referencing in MongoDB: embed for read performance, reference for flexibility",
  ],
  codeExample: {
    language: "javascript",
    title: "MongoDB (Document) + Redis (Key-Value) — When to Use Each",
    code: `// ── MongoDB: Document Store ──────────────────────
const mongoose = require('mongoose')

// Flexible document — different posts can have different fields
const postSchema = new mongoose.Schema({
  title:    String,
  content:  String,
  author:   { name: String, id: String },   // embedded (denormalized)
  tags:     [String],
  metadata: mongoose.Schema.Types.Mixed,    // any structure
}, { strict: false })  // allow extra fields

// One query gets all data (no JOIN needed)
const post = await Post.findOne({ 'author.id': userId })

// ── Redis: Key-Value Store ────────────────────────
const redis = require('ioredis')
const client = new redis()

// Cache database result with 5-minute TTL
const cacheKey = \`user:\${userId}\`
const cached = await client.get(cacheKey)

if (cached) {
  return JSON.parse(cached)  // return from cache (fast)
}

const user = await prisma.user.findUnique({ where: { id: userId } })
await client.setEx(cacheKey, 300, JSON.stringify(user))  // cache 5 min
return user

// Increment page views (atomic operation)
await client.incr(\`views:post:\${postId}\`)

// Rate limiting: max 100 requests per minute
const key = \`rate:\${userIp}:\${Math.floor(Date.now() / 60000)}\`
const requests = await client.incr(key)
await client.expire(key, 60)
if (requests > 100) throw new Error('Rate limit exceeded')

// Sorted set for leaderboard
await client.zAdd('quiz-scores', [{ score: 85, value: 'ali' }])
const top5 = await client.zRange('leaderboard', 0, 4, { REV: true, WITHSCORES: true })`,
  },
}
