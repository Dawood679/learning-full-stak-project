export const pubsubPatternContent = {
  slug: "pubsub-pattern",
  briefDescription: [
    "The Publish-Subscribe (Pub/Sub) pattern is a messaging paradigm where publishers emit events without knowing who will receive them, and subscribers listen to events without knowing who sent them. This decoupling enables scalable, event-driven architectures.",
    "Pub/Sub is implemented at many levels: in-process (EventEmitter in Node.js), process-to-process (Redis Pub/Sub), and distributed systems (Google Cloud Pub/Sub, AWS SNS/SQS, Apache Kafka, RabbitMQ). Each trade off latency, ordering guarantees, and durability differently.",
    "Unlike message queues (where a message is consumed once), pub/sub delivers each message to all active subscribers. For durable messaging with guaranteed delivery and replay, Kafka topics or cloud message brokers are preferred over Redis Pub/Sub.",
  ],
  keyConcepts: [
    "Publishers, Subscribers, and Topics/Channels",
    "Decoupling: publishers don't know their subscribers",
    "Redis Pub/Sub: PUBLISH, SUBSCRIBE commands",
    "Redis Streams vs Pub/Sub: durability and consumer groups",
    "Event-driven architecture (EDA) patterns",
    "Fan-out: one message delivered to many consumers",
    "Google Cloud Pub/Sub / AWS SNS for cloud-native messaging",
    "Message ordering guarantees and at-least-once delivery",
  ],
  codeExample: {
    language: "javascript",
    title: "Redis Pub/Sub + In-Process EventEmitter",
    code: `const Redis = require('ioredis')

const publisher = new Redis()
const subscriber = new Redis()

// Subscriber: listen to a channel
subscriber.subscribe('notifications', 'orders', (err, count) => {
  console.log(\`Subscribed to \${count} channel(s)\`)
})

subscriber.on('message', (channel, message) => {
  const data = JSON.parse(message)
  console.log(\`[\${channel}]\`, data)
  // Route to handlers
  if (channel === 'orders') handleNewOrder(data)
  if (channel === 'notifications') sendPushNotification(data)
})

// Publisher: broadcast to all subscribers
async function publishOrderCreated(order) {
  await publisher.publish('orders', JSON.stringify({
    event: 'ORDER_CREATED',
    orderId: order.id,
    userId: order.userId,
    timestamp: Date.now()
  }))
}

// Node.js EventEmitter (in-process Pub/Sub)
const { EventEmitter } = require('events')
const bus = new EventEmitter()
bus.setMaxListeners(50)

bus.on('user:registered', async ({ userId }) => {
  await sendWelcomeEmail(userId)
  await createDefaultSettings(userId)
})

// Emit from anywhere
bus.emit('user:registered', { userId: 'u123' })`,
  },
}
