export const processManagementContent = {
  slug: "process-management",
  briefDescription: [
    "Process management in Node.js involves keeping applications running reliably in production. PM2 (Process Manager 2) is the de-facto standard — it handles process spawning, auto-restart on crash, clustering, log management, and zero-downtime reloads.",
    "The Node.js cluster module allows you to fork multiple worker processes that share the same server port, fully utilizing multi-core CPUs. PM2's cluster mode handles this automatically. When a worker crashes, PM2 restarts it immediately.",
    "In containerized environments (Docker, Kubernetes), process management shifts to the orchestrator — containers should run a single process, crash-restart is handled by K8s, and PM2 is often unnecessary. However, PM2 remains valuable in VM/bare-metal deployments.",
  ],
  keyConcepts: [
    "PM2: start, stop, restart, reload, delete, logs, monit",
    "PM2 cluster mode: fork workers per CPU core",
    "ecosystem.config.js: declarative PM2 configuration",
    "Zero-downtime reload: pm2 reload (graceful restart)",
    "Node.js cluster module: fork workers, share port",
    "Graceful shutdown: SIGTERM handler, draining connections",
    "Log management: pm2 logs, log rotation",
    "Process signals: SIGTERM, SIGINT, SIGHUP",
  ],
  codeExample: {
    language: "javascript",
    title: "PM2 Ecosystem Config + Graceful Shutdown",
    code: `// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'api-server',
    script: 'dist/server.js',
    instances: 'max',        // one per CPU core
    exec_mode: 'cluster',
    watch: false,
    max_memory_restart: '1G',
    env: { NODE_ENV: 'production', PORT: 3000 },
    log_file: './logs/app.log',
    error_file: './logs/err.log',
    merge_logs: true,
    restart_delay: 4000
  }]
}

// server.js — graceful shutdown
const server = app.listen(3000)
let isShuttingDown = false

process.on('SIGTERM', async () => {
  if (isShuttingDown) return
  isShuttingDown = true
  console.log('SIGTERM received, shutting down gracefully...')

  server.close(async () => {
    await prisma.$disconnect()
    await redisClient.quit()
    console.log('Server closed')
    process.exit(0)
  })

  // Force exit after 30s if not done
  setTimeout(() => process.exit(1), 30_000)
})`,
  },
}
