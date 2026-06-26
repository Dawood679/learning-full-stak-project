/**
 * Internee Track — 3 Month Cohort Schedule
 * July 1 to September 30, 2026 (weekdays only)
 *
 * Month 1 (July)   → Web Fundamentals: HTML, CSS, JavaScript, Git
 * Month 2 (August) → Backend Stack: Node.js, Express, MongoDB, React
 * Month 3 (Sep)    → Full Stack Projects + Docker + Deployment
 */

function weekdayDates(startDate, count) {
  const dates = []
  const d = new Date(startDate)
  while (dates.length < count) {
    const dow = d.getDay()
    if (dow !== 0 && dow !== 6) {
      dates.push(new Date(d))
    }
    d.setDate(d.getDate() + 1)
  }
  return dates
}

const START = new Date("2026-07-01T00:00:00.000Z")
const allDates = weekdayDates(START, 66)

const SCHEDULE_ENTRIES = [
  // ─── MONTH 1: JULY — Web Fundamentals ────────────────────────────────────
  // Week 1 — HTML & CSS
  { day: 0,  topicSlug: "html",                 title: "Internee — HTML Structure & Semantics",           month: 1, week: 1 },
  { day: 1,  topicSlug: "html-tables",          title: "Internee — HTML Tables & Lists",                  month: 1, week: 1 },
  { day: 2,  topicSlug: "html-forms",           title: "Internee — HTML Forms & Input Elements",          month: 1, week: 1 },
  { day: 3,  topicSlug: "css",                  title: "Internee — CSS Basics & Box Model",               month: 1, week: 1 },
  { day: 4,  topicSlug: "css-selectors",        title: "Internee — CSS Selectors & Specificity",          month: 1, week: 1 },
  // Week 2 — CSS Advanced
  { day: 5,  topicSlug: "css-flexbox",          title: "Internee — Flexbox & Grid Layouts",               month: 1, week: 2 },
  { day: 6,  topicSlug: "css-responsive",       title: "Internee — Responsive & Mobile-First Design",     month: 1, week: 2 },
  { day: 7,  topicSlug: "css-animations",       title: "Internee — CSS Animations & Transitions",        month: 1, week: 2 },
  { day: 8,  topicSlug: "javascript",           title: "Internee — JavaScript Intro & ES6+",              month: 1, week: 2 },
  { day: 9,  topicSlug: "javascript-loops",     title: "Internee — Loops, Conditions & Control Flow",     month: 1, week: 2 },
  // Week 3 — JavaScript Core
  { day: 10, topicSlug: "javascript-functions", title: "Internee — Functions & Scope",                    month: 1, week: 3 },
  { day: 11, topicSlug: "javascript-arrays",    title: "Internee — Arrays, Objects & Destructuring",      month: 1, week: 3 },
  { day: 12, topicSlug: "javascript-dom",       title: "Internee — DOM Manipulation",                     month: 1, week: 3 },
  { day: 13, topicSlug: "javascript-events",    title: "Internee — Events & User Interactions",           month: 1, week: 3 },
  { day: 14, topicSlug: "javascript-browser",   title: "Internee — Browser APIs & LocalStorage",          month: 1, week: 3 },
  // Week 4 — JS Advanced & Git
  { day: 15, topicSlug: "javascript-oop",       title: "Internee — OOP: Classes & Prototypes",            month: 1, week: 4 },
  { day: 16, topicSlug: "javascript-async",     title: "Internee — Async JS: Promises & async/await",     month: 1, week: 4 },
  { day: 17, topicSlug: "javascript-advanced",  title: "Internee — Advanced JS: Closures & Modules",      month: 1, week: 4 },
  { day: 18, topicSlug: "git",                  title: "Internee — Git & GitHub Collaboration",            month: 1, week: 4 },
  { day: 19, topicSlug: "html",                 title: "Internee Month 1 — Review & Mini UI Project",     month: 1, week: 4 },

  // ─── MONTH 2: AUGUST — Node.js, Express, MongoDB, React ──────────────────
  // Week 1 — Node.js
  { day: 20, topicSlug: "nodejs",               title: "Internee — Introduction to Node.js",               month: 2, week: 1 },
  { day: 21, topicSlug: "nodejs-server",        title: "Internee — Building a Node.js HTTP Server",        month: 2, week: 1 },
  { day: 22, topicSlug: "process-management",   title: "Internee — Process Management & npm Scripts",      month: 2, week: 1 },
  { day: 23, topicSlug: "express",              title: "Internee — Express.js Setup & Routing",            month: 2, week: 1 },
  { day: 24, topicSlug: "express-middleware",   title: "Internee — Middleware: CORS, Body-Parser, Multer", month: 2, week: 1 },
  // Week 2 — REST API + MongoDB
  { day: 25, topicSlug: "express-rest",         title: "Internee — REST API Design & Best Practices",      month: 2, week: 2 },
  { day: 26, topicSlug: "nosql-concepts",       title: "Internee — NoSQL vs SQL Concepts",                 month: 2, week: 2 },
  { day: 27, topicSlug: "mongodb",              title: "Internee — MongoDB: CRUD & Aggregation",           month: 2, week: 2 },
  { day: 28, topicSlug: "mongoose",             title: "Internee — Mongoose: Schema, Model & Validation",  month: 2, week: 2 },
  { day: 29, topicSlug: "express-production",   title: "Internee — Auth: JWT Login & Protected Routes",    month: 2, week: 2 },
  // Week 3 — React
  { day: 30, topicSlug: "react",                title: "Internee — Introduction to React",                 month: 2, week: 3 },
  { day: 31, topicSlug: "react-jsx",            title: "Internee — JSX, Components & Props",               month: 2, week: 3 },
  { day: 32, topicSlug: "react-state",          title: "Internee — State Management & Lifecycle",          month: 2, week: 3 },
  { day: 33, topicSlug: "react-hooks",          title: "Internee — React Hooks (useState, useEffect)",     month: 2, week: 3 },
  { day: 34, topicSlug: "react-router",         title: "Internee — React Router & Navigation",             month: 2, week: 3 },
  // Week 4 — React + Data Fetching
  { day: 35, topicSlug: "react-context",        title: "Internee — Context API & Global State",            month: 2, week: 4 },
  { day: 36, topicSlug: "react-forms",          title: "Internee — Forms, Validation & React Hook Form",   month: 2, week: 4 },
  { day: 37, topicSlug: "react",                title: "Internee — Connecting React to REST API",          month: 2, week: 4 },
  { day: 38, topicSlug: "nodejs-optimization",  title: "Internee — Error Handling & API Optimization",     month: 2, week: 4 },
  { day: 39, topicSlug: "react-deployment",     title: "Internee — Deploying React App (Vercel/Netlify)",  month: 2, week: 4 },
  // Week 5
  { day: 40, topicSlug: "express-rest",         title: "Internee — Full MERN: Pagination & Search APIs",   month: 2, week: 5 },
  { day: 41, topicSlug: "mongodb",              title: "Internee — MongoDB Indexing & Relationships",       month: 2, week: 5 },
  { day: 42, topicSlug: "react",                title: "Internee Month 2 — MERN Todo/Notes App Project",   month: 2, week: 5 },

  // ─── MONTH 3: SEPTEMBER — Projects, Docker, Deployment ───────────────────
  // Week 1 — Company Project Start
  { day: 43, topicSlug: "express-rest",         title: "Internee — Project Planning & Architecture",        month: 3, week: 1 },
  { day: 44, topicSlug: "mongodb",              title: "Internee — Company Project: Database Design",       month: 3, week: 1 },
  { day: 45, topicSlug: "express-production",   title: "Internee — Company Project: Backend APIs",          month: 3, week: 1 },
  { day: 46, topicSlug: "react",                title: "Internee — Company Project: React Frontend",        month: 3, week: 1 },
  { day: 47, topicSlug: "react-forms",          title: "Internee — Company Project: Auth & Dashboard",      month: 3, week: 1 },
  // Week 2 — Docker + DevOps
  { day: 48, topicSlug: "docker",               title: "Internee — Docker: Containers & Images",            month: 3, week: 2 },
  { day: 49, topicSlug: "docker-compose",       title: "Internee — Docker Compose: Multi-Container Apps",   month: 3, week: 2 },
  { day: 50, topicSlug: "devops",               title: "Internee — CI/CD Pipelines & GitHub Actions",       month: 3, week: 2 },
  { day: 51, topicSlug: "aws-ec2",              title: "Internee — Deploying to AWS EC2",                   month: 3, week: 2 },
  { day: 52, topicSlug: "cron-jobs",            title: "Internee — Cron Jobs & Background Tasks",           month: 3, week: 2 },
  // Week 3 — Final Project Completion
  { day: 53, topicSlug: "websockets",           title: "Internee — Real-time Features with WebSockets",     month: 3, week: 3 },
  { day: 54, topicSlug: "react",                title: "Internee — Company Project: Real-time Updates",     month: 3, week: 3 },
  { day: 55, topicSlug: "genai",                title: "Internee — Adding AI Features (GenAI/OpenAI)",      month: 3, week: 3 },
  { day: 56, topicSlug: "nodejs-optimization",  title: "Internee — Performance & Security Hardening",       month: 3, week: 3 },
  { day: 57, topicSlug: "devops",               title: "Internee — Monitoring, Logging & Alerts",           month: 3, week: 3 },
  // Week 4 — Final Presentations
  { day: 58, topicSlug: "express-production",   title: "Internee — Code Review & Documentation",            month: 3, week: 4 },
  { day: 59, topicSlug: "devops",               title: "Internee Cohort — Final Project Presentation",      month: 3, week: 4 },
]

export const INTERNEE_COHORT_SCHEDULE = SCHEDULE_ENTRIES.map((entry) => ({
  ...entry,
  dayNumber: entry.day + 1,
  scheduledAt: allDates[entry.day],
}))

export const INTERNEE_MONTH_LABELS = {
  1: "July 2026 — Web Fundamentals",
  2: "August 2026 — Node.js, Express, MongoDB & React",
  3: "September 2026 — Projects, Docker & Deployment",
}

export function getInterneeMonthSessions(month) {
  return INTERNEE_COHORT_SCHEDULE.filter((s) => s.month === month)
}
