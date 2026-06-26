export const processManagementContent = {
  slug: "process-management",
  briefDescription: [
    "In production, you need your Node.js application to stay running even when it crashes, utilize all CPU cores, and restart automatically when the server reboots. PM2 (Process Manager 2) is the industry-standard solution for this. It keeps your app alive by auto-restarting on crashes, distributes traffic across multiple worker processes (one per CPU core) using cluster mode, provides log management, and generates startup scripts for auto-start on boot. Install it globally: 'npm install -g pm2'.",
    "Production project structure matters. A well-organized Node.js project separates concerns into folders: src/ (application code), config/ (environment config), routes/ (Express route files), utils/ (helper functions), middleware/ (auth, validation). The .env file stores environment-specific variables (DATABASE_URL, JWT_SECRET, PORT) — never commit this to Git. The .gitignore must include .env and node_modules/. Use ESLint and Prettier for consistent code formatting across the team.",
    "PM2 cluster mode forks one worker process per CPU core, and all workers share the same port. PM2's load balancer distributes incoming connections across workers. When deploying a new version, 'pm2 reload' achieves zero-downtime: new workers start and accept traffic before old ones are terminated. Graceful shutdown handles SIGTERM by calling server.close() to stop accepting new connections, waiting for in-flight requests to finish, and then cleanly closing database connections before exiting.",
  ],
  keyConcepts: [
    "PM2: process manager for Node.js — auto-restart, clustering, log management, startup scripts",
    "pm2 start app.js, pm2 stop, pm2 restart, pm2 delete, pm2 list, pm2 logs, pm2 monit",
    "PM2 cluster mode: exec_mode:'cluster', instances:'max' — one worker per CPU core",
    "pm2 reload: zero-downtime restart (new workers start before old ones exit)",
    "pm2 restart: immediate kill + restart (causes brief downtime)",
    "ecosystem.config.js: declarative PM2 config (name, script, instances, env, log files)",
    "pm2 startup: generate systemd/upstart script for auto-start on server reboot",
    "Graceful shutdown: listen to SIGTERM, server.close(), disconnect DB, then exit",
    "Production folder structure: src/, config/, routes/, utils/, middleware/",
    "Environment variables: process.env.PORT, .env file loaded with dotenv, never commit .env",
    "ESLint and Prettier: code quality and formatting consistency across the team",
    "Logging in production: winston or pino for structured JSON logs, morgan for HTTP access logs",
  ],
  codeExample: {
    language: "javascript",
    title: "PM2 Ecosystem Config + Graceful Shutdown Handler",
    code: `// ecosystem.config.js — PM2 configuration file
module.exports = {
  apps: [{
    name:             'devonix-api',
    script:           './src/server.js',
    instances:        'max',       // one per CPU core (auto-detect)
    exec_mode:        'cluster',   // fork mode uses Node cluster module
    watch:            false,       // don't watch files (use reload instead)
    max_memory_restart: '1G',     // restart if memory exceeds 1GB
    env: {
      NODE_ENV: 'development',
      PORT: 3000,
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 8080,
    },
    out_file:   './logs/app.log',
    error_file: './logs/err.log',
    merge_logs: true,             // merge logs from all cluster workers
    log_date_format: 'YYYY-MM-DD HH:mm:ss',
    restart_delay: 4000,          // wait 4s before restart on crash
  }]
}

// Usage:
// pm2 start ecosystem.config.js --env production
// pm2 reload ecosystem.config.js --env production  (zero-downtime)
// pm2 startup && pm2 save  (auto-start on reboot)

// ── src/server.js — Graceful Shutdown ────────────
const express = require('express')
const app = express()

// ... routes and middleware ...

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(\`Server started (PID: \${process.pid}) on port \${process.env.PORT}\`)
})

let isShuttingDown = false

async function gracefulShutdown(signal) {
  if (isShuttingDown) return
  isShuttingDown = true
  console.log(\`\${signal} received — starting graceful shutdown...\`)

  // 1. Stop accepting new connections
  server.close(async () => {
    console.log('HTTP server closed')
    try {
      // 2. Close database connections
      await prisma.$disconnect()
      // 3. Close Redis connection
      await redis.quit()
      console.log('All connections closed — exiting cleanly')
      process.exit(0)
    } catch (err) {
      console.error('Error during shutdown:', err)
      process.exit(1)
    }
  })

  // Force exit after 30 seconds (safety net)
  setTimeout(() => {
    console.error('Forced shutdown after timeout')
    process.exit(1)
  }, 30_000)
}

// PM2 sends SIGINT for pm2 stop, SIGTERM for pm2 reload
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'))
process.on('SIGINT',  () => gracefulShutdown('SIGINT'))`,
  },
}
