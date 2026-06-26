export const nodejsServerContent = {
  slug: "nodejs-server",
  briefDescription: [
    "Node.js's built-in http module lets you create a raw HTTP server without any framework. You call http.createServer((req, res) => { }) and pass a callback that receives the request (req) and response (res) objects. The req object has: req.method (GET, POST, etc.), req.url (the request path), req.headers, and req.on('data') / req.on('end') for reading the request body. The res object has: res.statusCode (set the HTTP status), res.setHeader(name, value), res.writeHead(status, headers), and res.end(body) to send the response and close the connection.",
    "Reading the request body requires manual buffering because the body arrives as a stream of chunks. You listen to the data event to accumulate chunks, then the end event to process the complete body. For JSON APIs, parse the body with JSON.parse(). Always set the Content-Type header on your response so clients know what format the data is in. The url module (or the built-in URL class) parses URL paths and query strings. Manual routing means comparing req.url and req.method to decide which handler to call — frameworks like Express abstract all of this.",
    "Node.js also has a built-in HTTPS module for secure servers, requiring an SSL certificate and private key. The http2 module supports HTTP/2 multiplexing. For static file servers, the fs module reads files from disk and streams them to the client using fs.createReadStream(). The path module handles cross-platform file paths. Node.js servers are event-driven and non-blocking — one thread handles thousands of concurrent connections by putting slow operations (I/O) in the background and processing results when they're ready. This makes Node.js excellent for real-time applications and APIs.",
  ],
  keyConcepts: [
    "http.createServer((req, res) => { }): creates an HTTP server",
    "server.listen(port, host, callback): start listening for connections",
    "req.method: HTTP verb (GET, POST, PUT, DELETE, PATCH)",
    "req.url: request path + query string (e.g. '/users?id=1')",
    "req.headers: object of all request headers",
    "Reading body: req.on('data', chunk => ...) + req.on('end', () => ...)",
    "res.statusCode = 200: set HTTP response status",
    "res.setHeader('Content-Type', 'application/json'): set response header",
    "res.writeHead(status, { headers }): set status + headers in one call",
    "res.end(body): send the response body and close the connection",
    "JSON.parse(body): parse incoming JSON body; JSON.stringify(obj): serialize to JSON",
    "URL class: new URL(req.url, 'http://localhost') — parse path + query params",
  ],
  codeExample: {
    language: "javascript",
    title: "Raw HTTP Server — Routing, JSON API, Body Parsing, Static Files",
    code: `const http = require('http')
const fs   = require('fs')
const path = require('path')

// In-memory data store
const users = [
  { id: 1, name: 'Ali Ahmed',   email: 'ali@example.com' },
  { id: 2, name: 'Sara Khan',   email: 'sara@example.com' },
]

// Helper: send JSON response
function sendJSON(res, statusCode, data) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify(data))
}

// Helper: read request body as text
function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = []
    req.on('data', chunk => chunks.push(chunk))
    req.on('end', () => resolve(Buffer.concat(chunks).toString()))
    req.on('error', reject)
  })
}

const server = http.createServer(async (req, res) => {
  const url    = new URL(req.url, \`http://\${req.headers.host}\`)
  const method = req.method
  const pathname = url.pathname

  console.log(\`\${method} \${pathname}\`)

  // ── CORS headers (allow browser requests) ──
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (method === 'OPTIONS') { res.writeHead(204); res.end(); return }

  // ── Routes ──
  if (pathname === '/' && method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end('<h1>Welcome to My Node.js Server</h1>')

  } else if (pathname === '/api/users' && method === 'GET') {
    sendJSON(res, 200, { users, total: users.length })

  } else if (pathname === '/api/users' && method === 'POST') {
    const body = await readBody(req)
    let newUser
    try {
      newUser = JSON.parse(body)
    } catch {
      return sendJSON(res, 400, { error: 'Invalid JSON body' })
    }

    if (!newUser.name || !newUser.email) {
      return sendJSON(res, 422, { error: 'name and email are required' })
    }

    const created = { id: users.length + 1, ...newUser }
    users.push(created)
    sendJSON(res, 201, created)

  } else if (pathname.startsWith('/api/users/') && method === 'GET') {
    const id = parseInt(pathname.split('/')[3])
    const user = users.find(u => u.id === id)
    user ? sendJSON(res, 200, user) : sendJSON(res, 404, { error: 'User not found' })

  } else if (pathname === '/favicon.ico') {
    res.writeHead(204); res.end()

  } else {
    sendJSON(res, 404, { error: \`Route \${method} \${pathname} not found\` })
  }
})

const PORT = process.env.PORT ?? 3000
server.listen(PORT, () => {
  console.log(\`Server running at http://localhost:\${PORT}\`)
})

// Graceful shutdown
process.on('SIGTERM', () => {
  server.close(() => {
    console.log('Server shut down gracefully')
    process.exit(0)
  })
})`,
  },
}
