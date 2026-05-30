export const nosqlConceptsContent = {
  slug: "nosql-concepts",
  briefDescription: [
    "NoSQL databases are non-relational databases designed for specific data models. They provide flexible schemas, horizontal scalability, and are optimized for specific access patterns that relational databases handle poorly at scale.",
    "NoSQL breaks into four main types: Document stores (MongoDB, CouchDB), Key-Value stores (Redis, DynamoDB), Column-family stores (Cassandra, HBase), and Graph databases (Neo4j). Each excels at different problems.",
    "The CAP theorem states that distributed systems can only guarantee two of: Consistency, Availability, and Partition tolerance. NoSQL databases make different trade-offs: MongoDB prioritizes CP, Cassandra AP, and Redis CA in single-node mode.",
  ],
  keyConcepts: [
    "Document stores: JSON-like documents, nested structures",
    "Key-Value stores: fast O(1) reads/writes, TTL expiry",
    "Column-family stores: wide rows, time-series data",
    "Graph databases: nodes, edges, traversal queries",
    "CAP theorem: Consistency, Availability, Partition tolerance",
    "Eventual consistency vs strong consistency",
    "Sharding: horizontal partitioning across nodes",
    "BASE vs ACID: Basically Available, Soft state, Eventually consistent",
  ],
  codeExample: {
    language: "javascript",
    title: "Redis Key-Value & TTL vs MongoDB Document",
    code: `// Redis - Key-Value with TTL
const redis = require('redis')
const client = redis.createClient()

// Cache user session with 24-hour expiry
await client.setEx('session:abc123', 86400, JSON.stringify({
  userId: 'u1', role: 'admin', loginAt: Date.now()
}))

// Increment counter atomically
await client.incr('page:home:views')

// Sorted set for leaderboard
await client.zAdd('leaderboard', [
  { score: 1200, value: 'alice' },
  { score: 980, value: 'bob' }
])
const top5 = await client.zRange('leaderboard', 0, 4, { REV: true })

// MongoDB - Flexible document model
const { MongoClient } = require('mongodb')
const db = client.db('myapp')

// Embed related data (denormalization)
await db.collection('posts').insertOne({
  title: 'NoSQL Explained',
  author: { name: 'Alice', id: 'u1' }, // embedded
  tags: ['nosql', 'databases'],
  createdAt: new Date()
})`,
  },
}
