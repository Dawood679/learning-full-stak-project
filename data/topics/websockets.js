export const websocketsContent = {
  slug: "websockets",
  briefDescription: [
    "WebSockets provide full-duplex, persistent communication channels over a single TCP connection. Unlike HTTP's request-response cycle, WebSocket connections stay open — the server can push data to clients at any time without polling.",
    "The WebSocket protocol starts with an HTTP handshake (Upgrade request), then switches to the ws:// or wss:// protocol. Once connected, frames can flow bidirectionally. Socket.IO is a popular library that adds rooms, namespaces, reconnection, and fallback to HTTP long-polling.",
    "WebSockets are ideal for real-time features: live chat, collaborative editing, stock tickers, live notifications, multiplayer games, and dashboards. For horizontal scaling, you need a shared state layer (Redis adapter with Socket.IO) so messages reach clients on other server instances.",
  ],
  keyConcepts: [
    "WebSocket handshake: HTTP Upgrade → ws:// protocol",
    "ws library: the raw WebSocket server for Node.js",
    "Socket.IO: rooms, namespaces, acknowledgements, reconnection",
    "Heartbeat / ping-pong to detect dead connections",
    "Broadcasting: send to one, all, or specific rooms",
    "Redis adapter for Socket.IO horizontal scaling",
    "WebSocket vs Server-Sent Events (SSE) trade-offs",
    "Security: wss://, origin validation, authentication",
  ],
  codeExample: {
    language: "javascript",
    title: "Socket.IO Chat with Rooms & Redis Adapter",
    code: `const { Server } = require('socket.io')
const { createAdapter } = require('@socket.io/redis-adapter')
const Redis = require('ioredis')

const io = new Server(httpServer, {
  cors: { origin: process.env.CLIENT_URL }
})

// Redis adapter for multi-instance scaling
const pubClient = new Redis()
const subClient = pubClient.duplicate()
io.adapter(createAdapter(pubClient, subClient))

io.use((socket, next) => {
  // Auth middleware
  const token = socket.handshake.auth.token
  const user = verifyToken(token)
  if (!user) return next(new Error('Unauthorized'))
  socket.user = user
  next()
})

io.on('connection', (socket) => {
  console.log(\`\${socket.user.name} connected\`)

  socket.on('join-room', (roomId) => {
    socket.join(roomId)
    socket.to(roomId).emit('user-joined', { name: socket.user.name })
  })

  socket.on('message', ({ roomId, text }) => {
    const msg = { text, from: socket.user.name, at: Date.now() }
    io.to(roomId).emit('message', msg)         // send to all in room
    saveMessage(roomId, msg)                    // persist
  })

  socket.on('disconnect', () => {
    console.log(\`\${socket.user.name} disconnected\`)
  })
})`,
  },
}
