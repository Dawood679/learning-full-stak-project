export const nodejsContent = {
  slug: "nodejs",
  briefDescription: [
    "Node.js is a JavaScript runtime built on Chrome's V8 engine that lets you run JavaScript on the server. It uses an event-driven, non-blocking I/O model, making it efficient for data-intensive real-time applications.",
    "Node.js is single-threaded but handles concurrency through its event loop. While CPU-intensive tasks can block the loop, I/O operations (file reads, network requests, database queries) are non-blocking and handled by libuv's thread pool.",
    "The npm ecosystem gives Node.js access to over 2 million packages. Core modules like fs, path, http, stream, and crypto are built-in, giving you powerful tools without any installation.",
  ],
  keyConcepts: [
    "The Event Loop: phases — timers, I/O, idle, poll, check, close",
    "Streams: Readable, Writable, Duplex, Transform",
    "The fs module: readFile, writeFile, createReadStream",
    "process object: env, argv, exit, stdin/stdout",
    "module.exports and CommonJS vs ES Modules",
    "Worker Threads for CPU-intensive tasks",
    "Error-first callbacks and the async patterns evolution",
    "EventEmitter — custom event systems",
  ],
  codeExample: {
    language: "javascript",
    title: "HTTP Server + Streams + EventEmitter",
    code: `const http = require('http')
const { EventEmitter } = require('events')
const fs = require('fs')

// Custom EventEmitter
class TaskRunner extends EventEmitter {
  async run(tasks) {
    for (const task of tasks) {
      this.emit('start', task.name)
      await task.fn()
      this.emit('done', task.name)
    }
    this.emit('complete')
  }
}

const runner = new TaskRunner()
runner.on('done', name => console.log(\`✓ \${name}\`))
runner.on('complete', () => console.log('All tasks done'))

// Streaming large file
const server = http.createServer((req, res) => {
  if (req.url === '/download') {
    res.setHeader('Content-Type', 'text/plain')
    const stream = fs.createReadStream('./large-file.txt')
    stream.pipe(res)
    stream.on('error', err => {
      res.statusCode = 500
      res.end(err.message)
    })
  }
})

server.listen(3000)`,
  },
}
