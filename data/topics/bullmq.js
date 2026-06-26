export const bullmqContent = {
  slug: "bullmq",
  briefDescription: [
    "BullMQ is a Redis-based job queue library for Node.js that handles background job processing. The key idea: instead of doing slow work (sending emails, processing images, generating PDFs) synchronously while the user waits, you add a 'job' to a queue and return a response immediately. A separate worker process picks up jobs from the queue and processes them in the background. This makes your API faster and more resilient — if the background job fails, it can be retried without the user needing to do anything.",
    "BullMQ has two main classes: Queue (where you add jobs) and Worker (where you process them). Jobs have options: delay (wait N milliseconds before processing), priority (lower number = higher priority), attempts (how many times to retry on failure), backoff (exponential delay between retries), and removeOnComplete/removeOnFail (cleanup old jobs). QueueEvents lets you listen to events from outside the worker: 'completed', 'failed', 'progress'. job.updateProgress(value) lets workers report completion percentage for real-time dashboards.",
    "BullMQ uses Redis as its backing store — all jobs are persisted in Redis, so they survive server restarts (unlike in-memory solutions). Jobs go through states: waiting → active → completed or failed → delayed (if delay option set). The Worker class processes jobs with a concurrency setting (how many jobs to process simultaneously). For monitoring, BullBoard or Arena provide a visual dashboard to view queues, running jobs, failed jobs, and retry them. BullMQ Flows enable parent-child job dependencies — a parent job only becomes active after all its children complete.",
  ],
  keyConcepts: [
    "Why queues: offload slow work to background, return fast API response, retry on failure",
    "Queue: add jobs with queue.add('job-name', data, options)",
    "Worker: process jobs with new Worker('queue-name', async (job) => {...}, { connection })",
    "Job options: delay, priority, attempts (retries), backoff (exponential/fixed), removeOnComplete",
    "Job lifecycle states: waiting → active → completed | failed | delayed",
    "Concurrency: how many jobs the worker processes simultaneously (default: 1)",
    "job.updateProgress(0-100): report completion percentage for monitoring",
    "QueueEvents: listen to 'completed', 'failed', 'progress' events from outside the worker",
    "Retries with backoff: on failure, wait 2s, then 4s, then 8s (exponential backoff)",
    "Delayed jobs: schedule job to run after a specific time in the future",
    "BullMQ Flows (FlowProducer): parent-child job dependencies — parent waits for all children",
    "BullBoard / Arena: visual dashboards to monitor queues, failed jobs, and retry them",
  ],
  codeExample: {
    language: "javascript",
    title: "BullMQ: Queue Producer, Worker, Job Progress, and Retries",
    code: `const { Queue, Worker, QueueEvents } = require('bullmq')
const Redis = require('ioredis')

const connection = new Redis(process.env.REDIS_URL, { maxRetriesPerRequest: null })

// ── Producer: API endpoint adds jobs ─────────────
const emailQueue = new Queue('emails', { connection })
const pdfQueue   = new Queue('pdf-generation', { connection })

// Called when user registers
async function onUserRegistered(user) {
  // Immediate welcome email
  await emailQueue.add('welcome-email', {
    to: user.email,
    name: user.name,
    templateId: 'welcome',
  }, {
    attempts: 3,                                  // retry up to 3 times
    backoff: { type: 'exponential', delay: 2000 }, // 2s, 4s, 8s between retries
    removeOnComplete: { count: 100 },             // keep last 100 completed
    removeOnFail: { count: 500 },                 // keep last 500 failed
  })

  // Schedule reminder email for 24 hours later
  await emailQueue.add('reminder-email', { to: user.email }, {
    delay: 24 * 60 * 60 * 1000,  // 24 hours in milliseconds
    attempts: 2,
  })
}

// ── Worker: processes jobs from the queue ─────────
const emailWorker = new Worker('emails', async (job) => {
  const { to, name, templateId } = job.data

  await job.updateProgress(20)  // 20% — starting

  const template = await loadTemplate(templateId)
  await job.updateProgress(50)  // 50% — template loaded

  await sendEmail({ to, subject: template.subject, html: template.html })
  await job.updateProgress(100) // 100% — done

  return { sent: true, to, sentAt: new Date().toISOString() }
}, {
  connection,
  concurrency: 5,  // process 5 emails simultaneously
})

// ── Event Listeners ───────────────────────────────
emailWorker.on('completed', (job, result) => {
  console.log(\`✅ Job \${job.id} completed:\`, result)
})

emailWorker.on('failed', (job, err) => {
  console.error(\`❌ Job \${job.id} failed (attempt \${job.attemptsMade}):\`, err.message)
})

// Listen from outside the worker (e.g., for real-time dashboard)
const events = new QueueEvents('emails', { connection })
events.on('progress', ({ jobId, data }) => {
  console.log(\`Job \${jobId}: \${data}% done\`)
})`,
  },
}
