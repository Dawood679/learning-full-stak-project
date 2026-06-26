export const devopsMicroservicesContent = {
  slug: "devops-microservices",
  briefDescription: [
    "Microservices architecture splits a monolithic application into small, independent services that each handle one business capability (e.g., user-service, order-service, payment-service). Each microservice has its own codebase, database, and deployment lifecycle. Services communicate over the network via REST APIs, gRPC, or message queues (like RabbitMQ or Kafka). The benefits are independent scaling (scale just the service that's under load), independent deployment (deploy one service without touching others), and technology freedom (use the best tech for each service). The trade-offs are operational complexity, network latency between services, and distributed system challenges (eventual consistency, partial failures).",
    "API Gateway is a single entry point that sits in front of all microservices. It handles: routing requests to the correct service, authentication (check tokens once at the gateway instead of in every service), rate limiting, request/response transformation, SSL termination, and aggregating multiple service responses. Kong, NGINX, AWS API Gateway, and Traefik are popular choices. Service discovery is how services find each other — in Docker/Kubernetes environments, services register with a service registry (like Consul or etcd) and look up other services by name rather than hardcoded IP addresses.",
    "Key microservices patterns: Circuit Breaker (if service B fails repeatedly, stop calling it and return a fallback immediately — prevents cascading failures), Saga Pattern (coordinate transactions across multiple services without distributed locks — use compensating transactions for rollback), Event Sourcing (store all changes as a log of events rather than current state), CQRS (Command Query Responsibility Segregation — separate read and write models), and Sidecar Pattern (attach a helper container like Envoy proxy to each service pod for logging/tracing/security without modifying the service code).",
  ],
  keyConcepts: [
    "Microservices: each service handles one business capability, has its own DB and deployment",
    "Monolith vs microservices: monolith is simpler to start; microservices scale better long-term",
    "Synchronous communication: REST/gRPC — caller waits for response",
    "Asynchronous communication: message queues (Kafka, RabbitMQ) — fire-and-forget, more resilient",
    "API Gateway: single entry point — routes, authenticates, rate-limits, aggregates responses",
    "Service discovery: services find each other by name, not hardcoded IP (Consul, Kubernetes DNS)",
    "Circuit Breaker: stops calling a failing service; returns fallback to prevent cascading failures",
    "Saga Pattern: coordinate multi-service transactions; use compensating actions for rollback",
    "Container per service: each microservice runs in its own Docker container",
    "Independent databases: each service owns its data — no shared DB between services",
    "Observability: distributed tracing (Jaeger, Zipkin), centralized logging (ELK), metrics (Prometheus)",
    "Sidecar pattern: attach helper container (Envoy, Istio) for cross-cutting concerns",
  ],
  codeExample: {
    language: "javascript",
    title: "Microservices — API Gateway, Service Communication, Circuit Breaker Pattern",
    code: `// ── Service 1: user-service (port 3001) ──
// user-service/index.js
const express = require('express')
const app = express()
app.use(express.json())

app.get('/internal/users/:id', async (req, res) => {
  // This endpoint is for internal service-to-service calls only
  const user = await prisma.user.findUnique({ where: { id: req.params.id } })
  if (!user) return res.status(404).json({ error: 'User not found' })
  res.json(user)
})

app.listen(3001, () => console.log('User Service on :3001'))

// ── Service 2: order-service (port 3002) ──
// order-service/index.js
const express  = require('express')
const axios    = require('axios')

// ── Circuit Breaker implementation ──
class CircuitBreaker {
  constructor(failureThreshold = 5, cooldownMs = 30000) {
    this.state = 'CLOSED'  // CLOSED=normal, OPEN=failing, HALF_OPEN=testing
    this.failures = 0
    this.failureThreshold = failureThreshold
    this.cooldownMs = cooldownMs
  }

  async call(fn) {
    if (this.state === 'OPEN') {
      throw new Error('Circuit breaker is OPEN — service unavailable')
    }
    try {
      const result = await fn()
      this.onSuccess()
      return result
    } catch (err) {
      this.onFailure()
      throw err
    }
  }

  onSuccess() {
    this.failures = 0
    this.state = 'CLOSED'
  }

  onFailure() {
    this.failures++
    if (this.failures >= this.failureThreshold) {
      this.state = 'OPEN'
      console.error('Circuit breaker OPENED — too many failures')
      setTimeout(() => {
        this.state = 'HALF_OPEN'
        console.log('Circuit breaker HALF-OPEN — testing recovery')
      }, this.cooldownMs)
    }
  }
}

const userServiceBreaker = new CircuitBreaker(3, 15000)

async function getUserById(userId) {
  return userServiceBreaker.call(async () => {
    const res = await axios.get(\`http://user-service:3001/internal/users/\${userId}\`, {
      timeout: 2000,  // 2s timeout
    })
    return res.data
  })
}

const app = express()
app.use(express.json())

app.post('/api/orders', async (req, res) => {
  try {
    // Service-to-service call with circuit breaker
    const user = await getUserById(req.body.userId)
    const order = await prisma.order.create({
      data: { userId: user.id, items: req.body.items, total: req.body.total }
    })

    // Async event — notify other services (fire-and-forget)
    await redis.publish('order.created', JSON.stringify({ orderId: order.id, userId: user.id }))

    res.status(201).json(order)
  } catch (err) {
    if (err.message.includes('Circuit breaker')) {
      return res.status(503).json({ error: 'User service unavailable', cached: true })
    }
    res.status(500).json({ error: err.message })
  }
})

// ── API Gateway (Nginx config snippet) ──
// upstream user_service   { server user-service:3001; }
// upstream order_service  { server order-service:3002; }
//
// server {
//   listen 80;
//   location /api/users/  { proxy_pass http://user_service/; }
//   location /api/orders/ { proxy_pass http://order_service/; }
//
//   # Auth check at gateway level
//   location /api/ {
//     auth_request /auth/verify;
//     proxy_pass http://backend_services;
//   }
// }

// ── docker-compose.yml for microservices ──
// services:
//   user-service:
//     build: ./user-service
//     environment:
//       DATABASE_URL: \${USER_DB_URL}  # separate DB per service!
//   order-service:
//     build: ./order-service
//     environment:
//       DATABASE_URL: \${ORDER_DB_URL}
//     depends_on: [user-service, redis]
//   api-gateway:
//     image: nginx:alpine
//     ports: ["80:80"]
//     depends_on: [user-service, order-service]`,
  },
}
