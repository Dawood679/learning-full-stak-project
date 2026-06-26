export const cronJobsContent = {
  slug: "cron-jobs",
  briefDescription: [
    "Cron jobs are tasks that run automatically on a schedule — without a human triggering them. The name comes from Unix's 'cron' daemon. A cron expression is a string with 5 fields (minute, hour, day-of-month, month, day-of-week) that defines when a job runs. For example: '0 2 * * *' means 'at 2:00 AM every day'. '*/5 * * * *' means 'every 5 minutes'. '0 9 * * 1-5' means 'at 9:00 AM on weekdays (Monday-Friday)'. The special characters are: * (any value), , (list: 1,3,5), - (range: 1-5), / (step: */5).",
    "In Node.js, the most popular library for cron is 'node-cron' (npm install node-cron). You define a schedule and a callback function. In production, system-level cron (crontab on Linux), cloud schedulers (AWS EventBridge, Google Cloud Scheduler), or job queues with delayed jobs (BullMQ) are preferred because they persist across server restarts. Cron jobs are used for: sending email digests, cleaning up expired sessions, syncing data from external APIs, generating daily reports, and checking expiring subscriptions.",
    "The biggest danger with cron jobs in distributed systems is duplicate execution — if your app runs on 3 servers, all 3 will try to run the same cron job simultaneously. The solution is distributed locking with Redis: use SET NX (Set if Not eXists) to create a lock before running the job. Only the server that successfully sets the lock runs the job. Set a TTL on the lock so it auto-expires if the server crashes. Cron jobs must be idempotent — running them multiple times produces the same result as running once, preventing double emails or duplicate records.",
  ],
  keyConcepts: [
    "Cron expression: 5 fields — minute(0-59), hour(0-23), day(1-31), month(1-12), weekday(0-6)",
    "Special characters: * (any), , (list), - (range), / (step e.g. */5 = every 5)",
    "Common expressions: '0 2 * * *' (2AM daily), '*/5 * * * *' (every 5 min), '0 9 * * 1-5' (9AM weekdays)",
    "node-cron: cron.schedule('expression', callback) — in-process, lost on restart",
    "Idempotency: running a cron job multiple times should produce the same result",
    "Distributed locking: Redis SET NX + TTL prevents duplicate execution across servers",
    "AWS EventBridge / Google Cloud Scheduler: cloud-native schedulers — persist always",
    "Use cases: email digests, session cleanup, external API syncs, daily reports",
    "Overlapping execution: if job takes longer than interval, next run starts before previous ends",
    "Monitoring cron jobs: log start/end times, alert on missed or failed jobs",
    "node-cron vs BullMQ: node-cron is in-process, BullMQ persists jobs in Redis with retries",
    "process.env.TZ: set timezone for cron jobs (default is server timezone)",
  ],
  codeExample: {
    language: "javascript",
    title: "node-cron with Distributed Redis Locking to Prevent Duplicate Runs",
    code: `const cron = require('node-cron')
const Redis = require('ioredis')

const redis = new Redis(process.env.REDIS_URL)

// Distributed lock to prevent duplicate execution across multiple servers
async function withLock(lockKey, ttlSeconds, fn) {
  // SET NX: only set if the key doesn't exist
  const acquired = await redis.set(lockKey, process.env.SERVER_ID || '1', 'EX', ttlSeconds, 'NX')

  if (!acquired) {
    console.log(\`[cron] \${lockKey} already running on another instance, skipping\`)
    return
  }

  try {
    await fn()
  } finally {
    await redis.del(lockKey)  // release lock when done
  }
}

// ── Job 1: Daily email digest at 8:00 AM ──────────
cron.schedule('0 8 * * *', async () => {
  await withLock('cron:daily-digest', 600, async () => {
    console.log('[cron] Starting daily email digest...')
    const users = await prisma.user.findMany({
      where: { emailDigest: true, role: 'STUDENT' }
    })
    await Promise.allSettled(users.map(u => sendDailyDigest(u.email)))
    console.log(\`[cron] Sent digest to \${users.length} users\`)
  })
}, { timezone: 'Asia/Karachi' })

// ── Job 2: Every 5 minutes — sync course data ─────
cron.schedule('*/5 * * * *', async () => {
  await withLock('cron:course-sync', 240, async () => {
    console.log('[cron] Syncing course data...')
    const data = await fetchFromExternalAPI()
    await prisma.course.upsert({ where: { id: data.id }, update: data, create: data })
  })
})

// ── Job 3: Every weekday at 9 AM — reminder emails ─
cron.schedule('0 9 * * 1-5', async () => {
  await withLock('cron:class-reminder', 300, async () => {
    const today = new Date()
    const sessions = await prisma.classSession.findMany({
      where: { scheduledAt: { gte: today } },
      take: 5
    })
    await sendReminderEmails(sessions)
  })
}, { timezone: 'Asia/Karachi' })

console.log('✅ Cron jobs registered')`,
  },
}
