export const websocketsContent = {
  slug: "websockets",
  briefDescription: [
    "WebSockets provide full-duplex (bidirectional), persistent communication between a browser and server over a single TCP connection. Unlike HTTP (which requires a new request for every message), a WebSocket connection stays open — the server can push data to the client any time. A WebSocket connection starts as a regular HTTP request with an 'Upgrade: websocket' header. The server responds with HTTP 101 Switching Protocols, and from that point on, both sides communicate using the WebSocket protocol (ws:// or wss:// for secure).",
    "Socket.IO is the most popular Node.js library for real-time applications. It wraps the WebSocket protocol and adds important features: automatic reconnection, rooms (named groups of sockets), namespaces (separate communication channels), acknowledgements (confirm message received), and fallback to HTTP long-polling when WebSockets are blocked. Server-Sent Events (SSE) is a simpler alternative for one-directional server→client streaming over HTTP — easier to set up but no client→server messaging.",
    "Real-world WebSocket use cases: live chat, real-time notifications, collaborative editing (Google Docs-style), live sports scores, multiplayer games, stock tickers, and live dashboards. For multi-server deployments, you need a Redis adapter so that when a message is broadcast, it reaches clients connected to ALL server instances, not just the one that sent it. Socket.IO's Redis adapter uses Redis Pub/Sub internally to propagate events across instances.",
  ],
  keyConcepts: [
    "HTTP vs WebSocket: HTTP is request/response, WebSocket is persistent bidirectional",
    "WebSocket handshake: HTTP Upgrade request → 101 Switching Protocols response",
    "ws:// (unsecured) vs wss:// (WebSocket over TLS — use wss:// in production)",
    "Socket.IO: rooms, namespaces, automatic reconnection, acknowledgements, fallback",
    "socket.join('room'): add client to a named room",
    "io.to('room').emit('event', data): broadcast to all sockets in a room",
    "socket.emit(): send to one client; io.emit(): broadcast to all connected clients",
    "Socket.IO middleware: authenticate users before allowing connection",
    "Heartbeat/ping-pong: detect dead connections and trigger automatic reconnection",
    "WebSocket vs SSE: WebSocket is bidirectional, SSE is server→client only over HTTP",
    "Redis adapter: sync rooms and broadcasts across multiple Socket.IO server instances",
    "Use cases: live chat, notifications, collaborative tools, games, live dashboards",
  ],
  codeExample: {
    language: "javascript",
    title: "Socket.IO Chat Server with Rooms, Auth Middleware, and Redis Adapter",
    code: `const http = require('http')
const express = require('express')
const { Server } = require('socket.io')
const { createAdapter } = require('@socket.io/redis-adapter')
const Redis = require('ioredis')

const app = express()
const httpServer = http.createServer(app)

const io = new Server(httpServer, {
  cors: { origin: process.env.CLIENT_URL, credentials: true }
})

// Redis adapter: sync events across multiple server instances
const pubClient = new Redis(process.env.REDIS_URL)
const subClient = pubClient.duplicate()
io.adapter(createAdapter(pubClient, subClient))

// Auth middleware: runs before connection is established
io.use((socket, next) => {
  const token = socket.handshake.auth.token
  const user = verifyJWT(token)
  if (!user) return next(new Error('Authentication failed'))
  socket.user = user
  next()
})

// Connection handler
io.on('connection', (socket) => {
  console.log(\`✅ \${socket.user.name} connected [\${socket.id}]\`)

  // Join a room (e.g., a chat room by ID)
  socket.on('join-room', (roomId) => {
    socket.join(roomId)
    // Notify others in room (not the joiner)
    socket.to(roomId).emit('user-joined', {
      name: socket.user.name,
      at: new Date().toISOString()
    })
    console.log(\`\${socket.user.name} joined room: \${roomId}\`)
  })

  // Handle incoming message
  socket.on('send-message', ({ roomId, text }) => {
    const message = {
      id: Date.now(),
      text,
      from: socket.user.name,
      userId: socket.user.id,
      at: new Date().toISOString()
    }
    // Send to ALL sockets in the room (including sender)
    io.to(roomId).emit('new-message', message)
    // Save to DB
    saveMessage(roomId, message)
  })

  // Typing indicator
  socket.on('typing', ({ roomId }) => {
    socket.to(roomId).emit('user-typing', { name: socket.user.name })
  })

  socket.on('disconnect', () => {
    console.log(\`❌ \${socket.user.name} disconnected\`)
  })
})

httpServer.listen(3001, () => console.log('Socket.IO server on port 3001'))`,
  },
}
