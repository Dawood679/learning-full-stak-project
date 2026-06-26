/**
 * Advanced Backend Track — 3 Month Cohort Schedule
 * July 1 to September 30, 2026 (weekdays only)
 *
 * Month 1 (July)   → Node.js + Express + MongoDB + Auth + React
 * Month 2 (August) → WebSockets + WebRTC + Redis + BullMQ + Cron + Docker + System Design
 * Month 3 (Sep)    → GenAI + Capstone Project
 *
 * Assumption: JS basics already known — dives into backend from Day 1
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
  // ─── MONTH 1: JULY — Node.js, Express, MongoDB, Auth, React ──────────────
  // Week 1 — Node.js + Express Basics
  { day: 0,  topicSlug: "nodejs",              title: "Advanced — Node.js Fundamentals",           month: 1, week: 1 },
  { day: 1,  topicSlug: "nodejs-server",       title: "Advanced — Building HTTP Servers",          month: 1, week: 1 },
  { day: 2,  topicSlug: "express",             title: "Advanced — Express.js Setup & Routing",     month: 1, week: 1 },
  { day: 3,  topicSlug: "express-middleware",  title: "Advanced — Middleware & async/await Patterns", month: 1, week: 1 },
  { day: 4,  topicSlug: "express-rest",        title: "Advanced — REST API Design & Testing",      month: 1, week: 1 },
  // Week 2 — MongoDB + Mongoose
  { day: 5,  topicSlug: "mongodb",             title: "Advanced — MongoDB Basics & Atlas Setup",   month: 1, week: 2 },
  { day: 6,  topicSlug: "mongoose",            title: "Advanced — Mongoose Schemas & Models",      month: 1, week: 2 },
  { day: 7,  topicSlug: "nosql-concepts",      title: "Advanced — Relationships & .populate()",    month: 1, week: 2 },
  { day: 8,  topicSlug: "nodejs-optimization", title: "Advanced — Aggregation Pipeline & Pagination", month: 1, week: 2 },
  { day: 9,  topicSlug: "express-production",  title: "Advanced — Production Folder Structure (MVC)", month: 1, week: 2 },
  // Week 3 — Auth + React Basics
  { day: 10, topicSlug: "express-rest",        title: "Advanced — Auth: bcrypt + Signup Flow",     month: 1, week: 3 },
  { day: 11, topicSlug: "nodejs-optimization", title: "Advanced — JWT: Login + Refresh Tokens",    month: 1, week: 3 },
  { day: 12, topicSlug: "express-production",  title: "Advanced — Auth Middleware + RBAC",         month: 1, week: 3 },
  { day: 13, topicSlug: "react",               title: "Advanced — React Fundamentals & Vite Setup", month: 1, week: 3 },
  { day: 14, topicSlug: "react-hooks",         title: "Advanced — React Hooks (useState, useEffect)", month: 1, week: 3 },
  // Week 4 — React + Full-Stack Integration
  { day: 15, topicSlug: "react-context",       title: "Advanced — useContext, useRef & Custom Hooks", month: 1, week: 4 },
  { day: 16, topicSlug: "react-router",        title: "Advanced — React Router & Protected Routes", month: 1, week: 4 },
  { day: 17, topicSlug: "react-redux",         title: "Advanced — State Management (Zustand)",     month: 1, week: 4 },
  { day: 18, topicSlug: "react-deployment",    title: "Advanced — Connect Frontend to Backend",    month: 1, week: 4 },
  { day: 19, topicSlug: "react-deployment",    title: "Advanced — Milestone: Full MERN App Deploy", month: 1, week: 4 },

  // ─── MONTH 2: AUGUST — Real-Time, Queues, Docker, System Design ──────────
  // Week 5 — Socket.io + WebSockets
  { day: 20, topicSlug: "websockets",          title: "Advanced — WebSocket Concepts & Socket.IO Setup", month: 2, week: 1 },
  { day: 21, topicSlug: "websockets",          title: "Advanced — Rooms, Namespaces & Broadcasting", month: 2, week: 1 },
  { day: 22, topicSlug: "pubsub-pattern",      title: "Advanced — Chat App Backend (Rooms + MongoDB)", month: 2, week: 1 },
  { day: 23, topicSlug: "websockets",          title: "Advanced — Chat App Frontend (React + Socket.IO)", month: 2, week: 1 },
  { day: 24, topicSlug: "pubsub-pattern",      title: "Advanced — Presence, Reconnection & Deploy", month: 2, week: 1 },
  // Week 6 — WebRTC
  { day: 25, topicSlug: "webrtc",              title: "Advanced — WebRTC Concepts (STUN/TURN, SDP)", month: 2, week: 2 },
  { day: 26, topicSlug: "webrtc",              title: "Advanced — Signaling Server with Socket.IO", month: 2, week: 2 },
  { day: 27, topicSlug: "webrtc",              title: "Advanced — getUserMedia & RTCPeerConnection", month: 2, week: 2 },
  { day: 28, topicSlug: "webrtc",              title: "Advanced — 1-to-1 Video Call (Offer/Answer)", month: 2, week: 2 },
  { day: 29, topicSlug: "webrtc",              title: "Advanced — ICE Candidates + Screen Sharing",  month: 2, week: 2 },
  // Week 7 — Redis + Cron + BullMQ
  { day: 30, topicSlug: "cron-jobs",           title: "Advanced — Redis Basics & Caching",         month: 2, week: 3 },
  { day: 31, topicSlug: "pubsub-pattern",      title: "Advanced — Redis Pub/Sub",                  month: 2, week: 3 },
  { day: 32, topicSlug: "cron-jobs",           title: "Advanced — Rate Limiting + node-cron",      month: 2, week: 3 },
  { day: 33, topicSlug: "bullmq",              title: "Advanced — BullMQ: Producer/Consumer/Worker", month: 2, week: 3 },
  { day: 34, topicSlug: "bullmq",              title: "Advanced — BullMQ: Notifications Project",  month: 2, week: 3 },
  // Week 8 — Docker + CI/CD
  { day: 35, topicSlug: "docker",              title: "Advanced — Docker Basics & Dockerfile",     month: 2, week: 4 },
  { day: 36, topicSlug: "docker-compose",      title: "Advanced — Docker Compose (App + DB + Redis)", month: 2, week: 4 },
  { day: 37, topicSlug: "devops",              title: "Advanced — GitHub Actions CI Pipeline",     month: 2, week: 4 },
  { day: 38, topicSlug: "jenkins",             title: "Advanced — Nginx Reverse Proxy Setup",      month: 2, week: 4 },
  { day: 39, topicSlug: "aws-ec2",             title: "Advanced — Deploy Dockerized App to VPS",   month: 2, week: 4 },

  // ─── MONTH 3: SEPTEMBER — System Design + GenAI + Capstone ───────────────
  // Week 9 — System Design
  { day: 40, topicSlug: "devops-microservices", title: "Advanced — Scaling: Vertical vs Horizontal", month: 3, week: 1 },
  { day: 41, topicSlug: "kubernetes",           title: "Advanced — Load Balancing Algorithms",     month: 3, week: 1 },
  { day: 42, topicSlug: "nodejs-optimization",  title: "Advanced — Caching Strategies & CDN",      month: 3, week: 1 },
  { day: 43, topicSlug: "kubernetes-advanced",  title: "Advanced — DB Indexing, Replication & Sharding", month: 3, week: 1 },
  { day: 44, topicSlug: "devops-microservices", title: "Advanced — Design: URL Shortener + Chat App Architecture", month: 3, week: 1 },
  // Week 10 — GenAI Integration
  { day: 45, topicSlug: "genai",               title: "Advanced — LLM API Basics (Claude/OpenAI)", month: 3, week: 2 },
  { day: 46, topicSlug: "genai",               title: "Advanced — Streaming LLM Responses",        month: 3, week: 2 },
  { day: 47, topicSlug: "genai",               title: "Advanced — AI Chatbot in MERN App",         month: 3, week: 2 },
  { day: 48, topicSlug: "genai",               title: "Advanced — Embeddings & Vector DBs",        month: 3, week: 2 },
  { day: 49, topicSlug: "genai",               title: "Advanced — Simple RAG Pipeline",            month: 3, week: 2 },
  // Week 11 — Capstone Build
  { day: 50, topicSlug: "devops-microservices", title: "Advanced — Capstone Planning & Architecture", month: 3, week: 3 },
  { day: 51, topicSlug: "express-rest",         title: "Advanced — Capstone: Backend Structure",   month: 3, week: 3 },
  { day: 52, topicSlug: "react",                title: "Advanced — Capstone: Frontend Structure",  month: 3, week: 3 },
  { day: 53, topicSlug: "websockets",           title: "Advanced — Capstone: Real-Time Features",  month: 3, week: 3 },
  { day: 54, topicSlug: "bullmq",               title: "Advanced — Capstone: Queues + Caching",    month: 3, week: 3 },
  // Week 12 — Capstone Deploy + Graduation
  { day: 55, topicSlug: "genai",                title: "Advanced — Capstone: GenAI Features",      month: 3, week: 4 },
  { day: 56, topicSlug: "docker-compose",       title: "Advanced — Capstone: Dockerize",           month: 3, week: 4 },
  { day: 57, topicSlug: "devops",               title: "Advanced — Capstone: Deploy + Nginx + CI/CD", month: 3, week: 4 },
  { day: 58, topicSlug: "devops-microservices", title: "Advanced — Write README + Architecture Diagram + Demo Video", month: 3, week: 4 },
  { day: 59, topicSlug: "devops",               title: "Advanced Cohort — Final Review & Graduation", month: 3, week: 4 },
]

export const ADVANCED_COHORT_SCHEDULE = SCHEDULE_ENTRIES.map((entry) => ({
  ...entry,
  dayNumber: entry.day + 1,
  scheduledAt: allDates[entry.day],
}))

export const ADVANCED_MONTH_LABELS = {
  1: "July 2026 — Node.js, Express, MongoDB & React",
  2: "August 2026 — Real-Time, Queues, Docker & System Design",
  3: "September 2026 — GenAI & Capstone Project",
}

export function getAdvancedMonthSessions(month) {
  return ADVANCED_COHORT_SCHEDULE.filter((s) => s.month === month)
}
