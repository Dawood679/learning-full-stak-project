export const expressMiddlewareContent = {
  slug: "express-middleware",
  briefDescription: [
    "Middleware in Express is a function with signature (req, res, next). It runs between receiving a request and sending a response. Middleware can: execute any code, modify req and res objects, end the request-response cycle, or call next() to pass control to the next middleware. The order you register middleware matters — they run top-to-bottom. Application-level middleware is registered with app.use(). Router-level middleware is registered on an Express Router. Built-in middleware: express.json() parses JSON request bodies, express.urlencoded() parses HTML form data, express.static('public') serves static files.",
    "File handling in Express uses the multer middleware package for multipart/form-data uploads. Configure multer with a storage destination (disk or memory), set file size limits, and filter by mimetype. Access uploaded files via req.file (single) or req.files (multiple). For serving user-uploaded files, combine express.static() with the upload destination folder. Error-handling middleware has 4 parameters: (err, req, res, next) — Express identifies it as error middleware by the 4th parameter. Always add your error handler after all routes as the last app.use() call.",
    "Useful middleware packages: morgan for request logging (logs method, URL, status, response time), cors for Cross-Origin Resource Sharing headers (needed when browser and API are on different domains), helmet for security HTTP headers (prevents XSS, clickjacking, etc.), compression for gzip-compressing responses, and express-rate-limit for rate limiting. Writing custom middleware is straightforward — just a function that calls next() when done. Async middleware must catch errors and pass them to next(err) or Express won't catch them. For authentication, middleware reads the token from the Authorization header and attaches the decoded user to req.user.",
  ],
  keyConcepts: [
    "Middleware signature: (req, res, next) => { /* ... */ next() }",
    "next(): pass control to next middleware; next(err): pass to error handler",
    "app.use(middleware): register middleware for all routes",
    "app.use('/path', middleware): register only for routes starting with /path",
    "express.json(): parse JSON bodies — must be registered before routes that need it",
    "express.urlencoded({ extended: true }): parse HTML form POST bodies",
    "express.static('public'): serve static files from the 'public' folder",
    "Error middleware: (err, req, res, next) — 4 params; must be last app.use()",
    "multer: npm package for handling multipart/form-data file uploads",
    "cors(): allow cross-origin requests from browsers",
    "morgan('dev'): log request method, URL, status, and response time",
    "Custom auth middleware: verify JWT, attach user to req.user, call next()",
  ],
  codeExample: {
    language: "javascript",
    title: "Custom Middleware, Auth Middleware, File Upload with Multer, Error Handling",
    code: `const express = require('express')
const morgan  = require('morgan')
const cors    = require('cors')
const multer  = require('multer')
const jwt     = require('jsonwebtoken')
const path    = require('path')

const app = express()

// ── Built-in middleware ──
app.use(express.json())                        // parse JSON bodies
app.use(express.urlencoded({ extended: true })) // parse form bodies
app.use(express.static('public'))              // serve files from /public

// ── Third-party middleware ──
app.use(morgan('dev'))                         // log every request
app.use(cors({ origin: 'http://localhost:5173' })) // allow Vite dev server

// ── Custom middleware: request logger ──
app.use((req, res, next) => {
  req.requestTime = Date.now()  // attach data to req
  next()                        // MUST call next() to continue
})

// ── Custom middleware: auth guard ──
function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' })
  }
  const token = authHeader.split(' ')[1]
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded  // attach user to every subsequent request
    next()
  } catch {
    res.status(401).json({ error: 'Invalid or expired token' })
  }
}

// ── Custom middleware: role check factory ──
function requireRole(role) {
  return (req, res, next) => {
    if (req.user?.role !== role) {
      return res.status(403).json({ error: 'Forbidden — insufficient permissions' })
    }
    next()
  }
}

// ── Multer: file upload ──
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, unique + path.extname(file.originalname))
  },
})

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },  // 5 MB limit
  fileFilter: (req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/webp']
    cb(null, allowed.includes(file.mimetype))  // false rejects the file
  },
})

// ── Routes ──
app.get('/api/public', (req, res) => {
  res.json({ message: 'Anyone can access this' })
})

// Protected route — requireAuth runs before the handler
app.get('/api/profile', requireAuth, (req, res) => {
  res.json({ user: req.user })
})

// Admin route — requires auth AND admin role
app.delete('/api/users/:id', requireAuth, requireRole('admin'), (req, res) => {
  res.json({ message: \`User \${req.params.id} deleted\` })
})

// Single file upload
app.post('/api/upload/avatar', requireAuth, upload.single('avatar'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' })
  res.json({ url: \`/uploads/\${req.file.filename}\`, size: req.file.size })
})

// Multiple file upload
app.post('/api/upload/gallery', upload.array('photos', 10), (req, res) => {
  const urls = req.files.map(f => \`/uploads/\${f.filename}\`)
  res.json({ urls })
})

// ── Error handling middleware (MUST be last, with 4 params) ──
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: \`Upload error: \${err.message}\` })
  }
  console.error(err.stack)
  res.status(err.statusCode ?? 500).json({
    error: err.message ?? 'Internal Server Error',
  })
})

app.listen(3000, () => console.log('Server on port 3000'))`,
  },
}
