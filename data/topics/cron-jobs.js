export const cronJobsContent = {
  slug: "cron-jobs",
  briefDescription: [
    "Cron jobs are scheduled tasks that run automatically at specified times or intervals. The name comes from Unix's cron daemon, which reads a crontab file containing the schedule expressions and commands to run.",
    "In Node.js, popular libraries like node-cron and node-schedule let you define jobs programmatically using cron expressions. In production, system-level cron (crontab), cloud schedulers (AWS EventBridge, GCP Cloud Scheduler), or job queues (Bull MQ) are preferred.",
    "Cron expressions use 5 or 6 fields to specify schedule: minute, hour, day-of-month, month, day-of-week (and optionally seconds). Using '*/5 * * * *' means every 5 minutes; '0 2 * * 1' means every Monday at 2am.",
  ],
  keyConcepts: [
    "Cron expression syntax: * * * * * (min hr dom mon dow)",
    "Special characters: * (any), , (list), - (range), / (step)",
    "node-cron vs node-schedule vs agenda",
    "Distributed cron: preventing duplicate runs across instances",
    "Idempotency: jobs must be safe to run multiple times",
    "Job locking with Redis to prevent overlapping execution",
    "Monitoring: dead letter queues, alerting on missed jobs",
    "Cloud schedulers: AWS EventBridge, GCP Cloud Scheduler",
  ],
  codeExample: {
    language: "javascript",
    title: "node-cron Scheduled Tasks with Locking",
    code: `const cron = require('node-cron')
const redis = require('redis')

const client = redis.createClient()

// Distributed lock to prevent duplicate runs
async function withLock(lockKey, ttl, fn) {
  const acquired = await client.set(lockKey, '1', {
    NX: true, // Only set if not exists
    EX: ttl   // Expire after ttl seconds
  })
  if (!acquired) {
    console.log(\`[\${lockKey}] Already running, skipping\`)
    return
  }
  try {
    await fn()
  } finally {
    await client.del(lockKey)
  }
}

// Run every day at 2am: send digest emails
cron.schedule('0 2 * * *', async () => {
  await withLock('job:digest-emails', 300, async () => {
    console.log('Sending digest emails...')
    const users = await User.findAll({ where: { emailDigest: true } })
    await Promise.allSettled(users.map(sendDigestEmail))
  })
})

// Every 5 minutes: sync external API data
cron.schedule('*/5 * * * *', async () => {
  await withLock('job:api-sync', 240, async () => {
    const data = await fetchExternalAPI()
    await syncToDatabase(data)
  })
})`,
  },
}
