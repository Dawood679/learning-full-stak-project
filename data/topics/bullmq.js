export const bullmqContent = {
  slug: "bullmq",
  briefDescription: [
    "BullMQ is a powerful, Redis-based job queue library for Node.js. It handles background processing, retries, priority queuing, scheduled jobs, rate limiting, and real-time job monitoring — making it essential for production Node.js apps.",
    "BullMQ separates Producers (add jobs to queues) from Workers (process jobs). Jobs have lifecycle events: waiting, active, completed, failed, delayed. Workers can concurrency process multiple jobs, and failed jobs are automatically retried with exponential backoff.",
    "BullMQ's QueueScheduler handles delayed jobs and stalled job detection (worker crashes). Bull Board or Arena provide visual dashboards to monitor queues, view job details, retry failed jobs, and track throughput.",
  ],
  keyConcepts: [
    "Queue: accepts jobs with data and options",
    "Worker: processes jobs with a processor function",
    "Job options: delay, priority, attempts, backoff, removeOnComplete",
    "QueueEvents: listening to completed, failed, progress events",
    "Flows: parent-child job dependencies (FlowProducer)",
    "Rate limiting: limit job processing rate",
    "Sandboxed processors: run workers in separate processes",
    "BullBoard / Arena for queue monitoring UI",
  ],
  codeExample: {
    language: "javascript",
    title: "BullMQ Queue, Worker & Job Events",
    code: `const { Queue, Worker, QueueEvents } = require('bullmq')
const Redis = require('ioredis')

const connection = new Redis({ maxRetriesPerRequest: null })

// Producer: add jobs to the queue
const emailQueue = new Queue('emails', { connection })

await emailQueue.add('send-welcome', {
  to: 'user@example.com',
  subject: 'Welcome!',
  templateId: 'welcome'
}, {
  attempts: 3,
  backoff: { type: 'exponential', delay: 2000 },
  removeOnComplete: { count: 100 },
  removeOnFail: { count: 500 }
})

// Schedule a job for later
await emailQueue.add('send-reminder', { userId: '123' }, {
  delay: 24 * 60 * 60 * 1000 // 24 hours from now
})

// Consumer: process jobs
const worker = new Worker('emails', async (job) => {
  const { to, subject, templateId } = job.data
  await job.updateProgress(50)
  await sendEmail({ to, subject, templateId })
  await job.updateProgress(100)
  return { sent: true }
}, {
  connection,
  concurrency: 5
})

worker.on('failed', (job, err) => {
  console.error(\`Job \${job.id} failed:\`, err.message)
})`,
  },
}
