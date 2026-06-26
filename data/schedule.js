/**
 * 3-Month Cohort Schedule — July 1 to September 30, 2026
 * Classes: Monday – Friday (weekdays only)
 * Each entry = one class session tied to a topic slug
 *
 * Month 1 (July)   → Internet basics, HTML, CSS, JS fundamentals
 * Month 2 (August) → React, Node.js, Express, Databases
 * Month 3 (Sep)    → Auth, WebSockets, DevOps, Docker, AWS, Next.js
 */

// Returns weekday dates (Mon–Fri) starting from startDate, count many
function weekdayDates(startDate, count) {
  const dates = []
  const d = new Date(startDate)
  while (dates.length < count) {
    const dow = d.getDay() // 0 = Sun, 6 = Sat
    if (dow !== 0 && dow !== 6) {
      dates.push(new Date(d))
    }
    d.setDate(d.getDate() + 1)
  }
  return dates
}

// All weekdays from July 1 to Sep 30, 2026
const START = new Date("2026-07-01T00:00:00.000Z")
const allDates = weekdayDates(START, 66) // ~66 weekdays in 3 months

// Schedule entries — each links a topic slug to a day index (0-based)
// Day index maps to allDates[index]
const SCHEDULE_ENTRIES = [
  // ─── MONTH 1: JULY — Episode 1 & 2 ────────────────────────────────
  // Week 1
  { day: 0,  topicSlug: "html",                  title: "Episode 2 — Starting with HTML",          month: 1, week: 1 },
  { day: 1,  topicSlug: "html-tables",            title: "Episode 2 — More on HTML + Tables",        month: 1, week: 1 },
  { day: 2,  topicSlug: "html-forms",             title: "Episode 2 — HTML Forms & Media Tags",      month: 1, week: 1 },
  { day: 3,  topicSlug: "css",                    title: "Episode 2 — Basics of CSS",                month: 1, week: 1 },
  { day: 4,  topicSlug: "css-selectors",          title: "Episode 2 — Styling with CSS",             month: 1, week: 1 },
  // Week 2
  { day: 5,  topicSlug: "css-flexbox",            title: "Episode 2 — CSS Flexbox & Grid",           month: 1, week: 2 },
  { day: 6,  topicSlug: "css-animations",         title: "Episode 2 — CSS Pseudo + Animations",      month: 1, week: 2 },
  { day: 7,  topicSlug: "css-responsive",         title: "Episode 2 — Responsive Design & SASS",     month: 1, week: 2 },
  { day: 8,  topicSlug: "javascript",             title: "Episode 2 — JavaScript Basics + ES6+",     month: 1, week: 2 },
  { day: 9,  topicSlug: "javascript-loops",       title: "Episode 2 — Loops & Conditionals",         month: 1, week: 2 },
  // Week 3
  { day: 10, topicSlug: "javascript-functions",   title: "Episode 2 — Functions in JavaScript",      month: 1, week: 3 },
  { day: 11, topicSlug: "javascript-arrays",      title: "Episode 2 — Arrays & Objects",             month: 1, week: 3 },
  { day: 12, topicSlug: "javascript-dom",         title: "Episode 2 — DOM Manipulation",             month: 1, week: 3 },
  { day: 13, topicSlug: "javascript-events",      title: "Episode 2 — Event Handling",               month: 1, week: 3 },
  { day: 14, topicSlug: "javascript-browser",     title: "Episode 2 — Browser APIs & Storage",       month: 1, week: 3 },
  // Week 4
  { day: 15, topicSlug: "javascript-oop",         title: "Episode 2 — OOP in JavaScript",            month: 1, week: 4 },
  { day: 16, topicSlug: "javascript-async",       title: "Episode 2 — Async JS & Promises",          month: 1, week: 4 },
  { day: 17, topicSlug: "javascript-advanced",    title: "Episode 2 — Error Handling + Advanced JS", month: 1, week: 4 },
  { day: 18, topicSlug: "git",                    title: "Episode 2 — Git & GitHub",                 month: 1, week: 4 },
  { day: 19, topicSlug: "html",                   title: "Month 1 Review & Project",                 month: 1, week: 4 },

  // ─── MONTH 2: AUGUST — Episode 3 & 4 ──────────────────────────────
  // Week 1
  { day: 20, topicSlug: "react",                  title: "Episode 3 — Introduction to React",        month: 2, week: 1 },
  { day: 21, topicSlug: "react-jsx",              title: "Episode 3 — React Basics & JSX",           month: 2, week: 1 },
  { day: 22, topicSlug: "react-state",            title: "Episode 3 — State, Props & Styling",       month: 2, week: 1 },
  { day: 23, topicSlug: "react-hooks",            title: "Episode 3 — React Hooks (useState, useEffect)", month: 2, week: 1 },
  { day: 24, topicSlug: "react-context",          title: "Episode 3 — Advanced Hooks & Context API", month: 2, week: 1 },
  // Week 2
  { day: 25, topicSlug: "react-router",           title: "Episode 3 — React Router",                 month: 2, week: 2 },
  { day: 26, topicSlug: "react-redux",            title: "Episode 3 — Redux & State Management",     month: 2, week: 2 },
  { day: 27, topicSlug: "react-forms",            title: "Episode 3 — Forms & Performance",          month: 2, week: 2 },
  { day: 28, topicSlug: "react-deployment",       title: "Episode 3 — React Project & Deployment",   month: 2, week: 2 },
  { day: 29, topicSlug: "nodejs",                 title: "Episode 4 — Starting with Node.js",        month: 2, week: 2 },
  // Week 3
  { day: 30, topicSlug: "nodejs-server",          title: "Episode 4 — Creating a Node.js Server",    month: 2, week: 3 },
  { day: 31, topicSlug: "express",                title: "Episode 4 — Express.js Fundamentals",      month: 2, week: 3 },
  { day: 32, topicSlug: "express-middleware",     title: "Episode 4 — Middleware & File Handling",   month: 2, week: 3 },
  { day: 33, topicSlug: "sql-fundamentals",       title: "Episode 4 — SQL & Relational Databases",   month: 2, week: 3 },
  { day: 34, topicSlug: "nosql-concepts",         title: "Episode 4 — NoSQL Concepts",               month: 2, week: 3 },
  // Week 4
  { day: 35, topicSlug: "mongodb",                title: "Episode 4 — MongoDB Deep Dive",            month: 2, week: 4 },
  { day: 36, topicSlug: "mongoose",               title: "Episode 4 — Mongoose ODM",                 month: 2, week: 4 },
  { day: 37, topicSlug: "postgresql",             title: "Episode 4 — PostgreSQL & SQL Advanced",    month: 2, week: 4 },
  { day: 38, topicSlug: "prisma-orm",             title: "Episode 4 — Prisma ORM",                   month: 2, week: 4 },
  { day: 39, topicSlug: "express-rest",           title: "Episode 4 — REST API Development",         month: 2, week: 4 },
  // Week 5 (if any)
  { day: 40, topicSlug: "nodejs-optimization",    title: "Episode 4 — DB Optimization & Logging",    month: 2, week: 5 },
  { day: 41, topicSlug: "express-production",     title: "Episode 4 — Production Project Structure", month: 2, week: 5 },
  { day: 42, topicSlug: "nodejs",                 title: "Month 2 Review & Backend Project",         month: 2, week: 5 },

  // ─── MONTH 3: SEPTEMBER — Episodes 4–5 Advanced ───────────────────
  // Week 1
  { day: 43, topicSlug: "websockets",             title: "Episode 4 — WebSockets & Socket.IO",       month: 3, week: 1 },
  { day: 44, topicSlug: "cron-jobs",              title: "Episode 4 — Cron Jobs & Scheduling",       month: 3, week: 1 },
  { day: 45, topicSlug: "bullmq",                 title: "Episode 4 — BullMQ Job Queues",            month: 3, week: 1 },
  { day: 46, topicSlug: "pubsub-pattern",         title: "Episode 4 — Pub/Sub Pattern & Redis",      month: 3, week: 1 },
  { day: 47, topicSlug: "webrtc",                 title: "Episode 4 — WebRTC Peer-to-Peer",          month: 3, week: 1 },
  // Week 2
  { day: 48, topicSlug: "process-management",     title: "Episode 4 — Process Management (PM2)",     month: 3, week: 2 },
  { day: 49, topicSlug: "nextjs",                 title: "Episode 5 — Next.js Fundamentals",         month: 3, week: 2 },
  { day: 50, topicSlug: "nextjs-app-router",      title: "Episode 5 — Next.js App Router & SSR",     month: 3, week: 2 },
  { day: 51, topicSlug: "docker",                 title: "Episode 5 — Docker & Containerization",    month: 3, week: 2 },
  { day: 52, topicSlug: "docker-compose",         title: "Episode 5 — Docker Compose & DevOps",      month: 3, week: 2 },
  // Week 3
  { day: 53, topicSlug: "devops",                 title: "Episode 5 — DevOps Fundamentals & CI/CD",  month: 3, week: 3 },
  { day: 54, topicSlug: "jenkins",                title: "Episode 5 — Jenkins Pipelines",            month: 3, week: 3 },
  { day: 55, topicSlug: "aws-ec2",                title: "Episode 5 — AWS EC2 & Cloud Deployment",   month: 3, week: 3 },
  { day: 56, topicSlug: "kubernetes",             title: "Episode 5 — Kubernetes Fundamentals",      month: 3, week: 3 },
  { day: 57, topicSlug: "kubernetes-advanced",    title: "Episode 5 — Kubernetes Advanced",          month: 3, week: 3 },
  // Week 4
  { day: 58, topicSlug: "devops-microservices",   title: "Episode 5 — Microservices Architecture",   month: 3, week: 4 },
  { day: 59, topicSlug: "genai",                  title: "Episode 5 — GenAI & LangChain Intro",      month: 3, week: 4 },
  { day: 60, topicSlug: "pwa",                    title: "Episode 5 — PWA Development",              month: 3, week: 4 },
  { day: 61, topicSlug: "aws-ec2",                title: "Episode 5 — Final Deployment Project",     month: 3, week: 4 },
  { day: 62, topicSlug: "devops",                 title: "Cohort Final Review & Graduation",         month: 3, week: 4 },
]

// Build the full schedule with actual dates
export const COHORT_SCHEDULE = SCHEDULE_ENTRIES.map((entry) => ({
  ...entry,
  dayNumber: entry.day + 1,
  scheduledAt: allDates[entry.day],
}))

// Helper: get today's class sessions
export function getTodaySessions() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return COHORT_SCHEDULE.filter((s) => {
    const d = new Date(s.scheduledAt)
    d.setHours(0, 0, 0, 0)
    return d.getTime() === today.getTime()
  })
}

// Helper: get sessions for a given month (1, 2, or 3)
export function getMonthSessions(month) {
  return COHORT_SCHEDULE.filter((s) => s.month === month)
}

// Month labels
export const MONTH_LABELS = {
  1: "July 2026",
  2: "August 2026",
  3: "September 2026",
}
