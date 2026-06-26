export const nodejsContent = {
  slug: "nodejs",
  briefDescription: [
    "Node.js is a JavaScript runtime built on Chrome's V8 engine that lets you run JavaScript on the server — outside the browser. Tools you need: Node.js LTS, Postman (for API testing), and VS Code. You start by running 'node app.js' to execute a JavaScript file — your first one prints 'Namaste Duniya'. NPM (Node Package Manager) comes with Node.js and gives access to 1 million+ packages. You manage them via package.json (created with 'npm init'), which lists all dependencies, dev-dependencies, and scripts.",
    "Node.js is event-driven and non-blocking. When it needs to do I/O (read a file, query a database, make an HTTP request), it doesn't wait — it hands off the work to libuv's thread pool and continues executing other code. When the I/O completes, the callback is placed on the event loop and executed. This is why Node.js can handle thousands of concurrent connections with a single thread. Understanding process.nextTick() (runs before next event loop iteration) and setImmediate() (runs in check phase of next iteration) matters for advanced async patterns.",
    "The built-in 'http' module lets you create a web server in pure Node.js. You handle different routes by checking req.url and req.method. HTTP status codes communicate results to clients: 200 (OK), 201 (Created), 400 (Bad Request), 401 (Unauthorized), 403 (Forbidden), 404 (Not Found), 422 (Invalid Input), 500 (Internal Server Error). Install Nodemon for automatic server restart during development. For scaling, Node's cluster module lets you fork one worker process per CPU core.",
  ],
  keyConcepts: [
    "Node.js runtime: V8 engine, runs JS on server, non-blocking I/O via libuv thread pool",
    "NPM: npm init, npm install, package.json, dependencies, devDependencies, scripts",
    "npm scripts: 'npm run dev', 'npm start', 'npm test' — shorthand for shell commands",
    "CommonJS modules: require(), module.exports — vs ES Modules (import/export)",
    "Event loop: handles async by queuing I/O callbacks; never blocks the main thread",
    "process.nextTick() vs setImmediate(): nextTick fires before next iteration, setImmediate after",
    "http module: http.createServer(), req.url, req.method, res.writeHead(), res.end()",
    "HTTP status codes: 200, 201, 400, 401, 403, 404, 422, 500",
    "Nodemon: auto-restart server when files change during development",
    "EventEmitter: emitter.on('event', handler), emitter.emit('event', data)",
    "Using all CPU cores: cluster module or PM2 cluster mode (fork one worker per CPU)",
    "Environment variables: process.env.PORT, .env files with dotenv package",
  ],
  codeExample: {
    language: "javascript",
    title: "Node.js HTTP Server with Routing and Status Codes",
    code: `const http = require('http')

const users = [
  { id: 1, name: 'Ali Khan', email: 'ali@devonix.io' },
  { id: 2, name: 'Sara Ahmed', email: 'sara@devonix.io' },
]

const server = http.createServer((req, res) => {
  const { url, method } = req

  // Set headers for JSON API
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Access-Control-Allow-Origin', '*')

  // GET /
  if (url === '/' && method === 'GET') {
    res.writeHead(200)
    return res.end(JSON.stringify({ message: 'DevOnix API v1', status: 'ok' }))
  }

  // GET /users
  if (url === '/users' && method === 'GET') {
    res.writeHead(200)
    return res.end(JSON.stringify({ data: users }))
  }

  // POST /users — read body from stream
  if (url === '/users' && method === 'POST') {
    let body = ''
    req.on('data', chunk => { body += chunk.toString() })
    req.on('end', () => {
      try {
        const { name, email } = JSON.parse(body)
        if (!name || !email) {
          res.writeHead(422)
          return res.end(JSON.stringify({ error: 'name and email are required' }))
        }
        const newUser = { id: users.length + 1, name, email }
        users.push(newUser)
        res.writeHead(201)
        res.end(JSON.stringify({ data: newUser }))
      } catch {
        res.writeHead(400)
        res.end(JSON.stringify({ error: 'Invalid JSON' }))
      }
    })
    return
  }

  // 404 fallback
  res.writeHead(404)
  res.end(JSON.stringify({ error: 'Route not found' }))
})

const PORT = process.env.PORT || 3000
server.listen(PORT, () => console.log(\`Server on http://localhost:\${PORT}\`))`,
  },
}
