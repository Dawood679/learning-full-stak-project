/**
 * MERN Stack Track — 3 Month Cohort Schedule
 * July 1 to September 30, 2026 (weekdays only)
 *
 * Month 1 (July)   → HTML, CSS, JavaScript, Git (same as Full Stack)
 * Month 2 (August) → React (with Redux/Forms), Node.js, Express, MongoDB
 * Month 3 (Sep)    → Auth, Blog App, E-commerce/Job Portal, Deployment
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
  // ─── MONTH 1: JULY — HTML, CSS, JavaScript ────────────────────────────────
  // Week 1
  { day: 0,  topicSlug: "html",                title: "MERN — Starting with HTML",                month: 1, week: 1 },
  { day: 1,  topicSlug: "html-tables",         title: "MERN — HTML Tables & Structure",           month: 1, week: 1 },
  { day: 2,  topicSlug: "html-forms",          title: "MERN — HTML Forms & Media Tags",           month: 1, week: 1 },
  { day: 3,  topicSlug: "css",                 title: "MERN — CSS Basics",                        month: 1, week: 1 },
  { day: 4,  topicSlug: "css-selectors",       title: "MERN — CSS Selectors & Styling",           month: 1, week: 1 },
  // Week 2
  { day: 5,  topicSlug: "css-flexbox",         title: "MERN — CSS Flexbox & Grid",                month: 1, week: 2 },
  { day: 6,  topicSlug: "css-animations",      title: "MERN — CSS Animations & Pseudo-classes",   month: 1, week: 2 },
  { day: 7,  topicSlug: "css-responsive",      title: "MERN — Responsive Design",                 month: 1, week: 2 },
  { day: 8,  topicSlug: "javascript",          title: "MERN — JavaScript Basics + ES6+",          month: 1, week: 2 },
  { day: 9,  topicSlug: "javascript-loops",    title: "MERN — Loops & Conditionals",              month: 1, week: 2 },
  // Week 3
  { day: 10, topicSlug: "javascript-functions", title: "MERN — Functions in JavaScript",          month: 1, week: 3 },
  { day: 11, topicSlug: "javascript-arrays",   title: "MERN — Arrays & Objects",                  month: 1, week: 3 },
  { day: 12, topicSlug: "javascript-dom",      title: "MERN — DOM Manipulation",                  month: 1, week: 3 },
  { day: 13, topicSlug: "javascript-events",   title: "MERN — Event Handling",                    month: 1, week: 3 },
  { day: 14, topicSlug: "javascript-browser",  title: "MERN — Browser APIs & Storage",            month: 1, week: 3 },
  // Week 4
  { day: 15, topicSlug: "javascript-oop",      title: "MERN — OOP in JavaScript",                 month: 1, week: 4 },
  { day: 16, topicSlug: "javascript-async",    title: "MERN — Async JS & Promises",               month: 1, week: 4 },
  { day: 17, topicSlug: "javascript-advanced", title: "MERN — Error Handling + Advanced JS",      month: 1, week: 4 },
  { day: 18, topicSlug: "git",                 title: "MERN — Git & GitHub",                      month: 1, week: 4 },
  { day: 19, topicSlug: "html",                title: "MERN Month 1 — Review & Portfolio Project", month: 1, week: 4 },

  // ─── MONTH 2: AUGUST — React, Node.js, Express, MongoDB ──────────────────
  // Week 1 — React Basics
  { day: 20, topicSlug: "react",               title: "MERN — Introduction to React",             month: 2, week: 1 },
  { day: 21, topicSlug: "react-jsx",           title: "MERN — React Basics & JSX",               month: 2, week: 1 },
  { day: 22, topicSlug: "react-state",         title: "MERN — State, Props & Styling",            month: 2, week: 1 },
  { day: 23, topicSlug: "react-hooks",         title: "MERN — React Hooks (useState, useEffect)", month: 2, week: 1 },
  { day: 24, topicSlug: "react-context",       title: "MERN — Advanced Hooks & Context API",      month: 2, week: 1 },
  // Week 2 — React Advanced
  { day: 25, topicSlug: "react-router",        title: "MERN — React Router",                      month: 2, week: 2 },
  { day: 26, topicSlug: "react-redux",         title: "MERN — Redux Toolkit",                     month: 2, week: 2 },
  { day: 27, topicSlug: "react-forms",         title: "MERN — Forms & React Hook Form",           month: 2, week: 2 },
  { day: 28, topicSlug: "react-deployment",    title: "MERN — React Project & Deployment",        month: 2, week: 2 },
  { day: 29, topicSlug: "nodejs",              title: "MERN — Introduction to Node.js",           month: 2, week: 2 },
  // Week 3 — Node.js & Express
  { day: 30, topicSlug: "nodejs-server",       title: "MERN — Creating a Node.js Server",         month: 2, week: 3 },
  { day: 31, topicSlug: "express",             title: "MERN — Express.js Fundamentals",           month: 2, week: 3 },
  { day: 32, topicSlug: "express-middleware",  title: "MERN — Middleware & File Handling",         month: 2, week: 3 },
  { day: 33, topicSlug: "express-rest",        title: "MERN — REST API Design",                   month: 2, week: 3 },
  { day: 34, topicSlug: "nosql-concepts",      title: "MERN — NoSQL Concepts",                    month: 2, week: 3 },
  // Week 4 — MongoDB
  { day: 35, topicSlug: "mongodb",             title: "MERN — MongoDB Deep Dive",                 month: 2, week: 4 },
  { day: 36, topicSlug: "mongoose",            title: "MERN — Mongoose ODM",                      month: 2, week: 4 },
  { day: 37, topicSlug: "express-rest",        title: "MERN — Full CRUD API with MongoDB",        month: 2, week: 4 },
  { day: 38, topicSlug: "nodejs-optimization", title: "MERN — DB Optimization & Logging",         month: 2, week: 4 },
  { day: 39, topicSlug: "express-production",  title: "MERN — Production Project Structure",       month: 2, week: 4 },
  // Week 5
  { day: 40, topicSlug: "mongodb",             title: "MERN — Relationships & Population",         month: 2, week: 5 },
  { day: 41, topicSlug: "express-rest",        title: "MERN — Pagination, Sorting & Filtering",   month: 2, week: 5 },
  { day: 42, topicSlug: "nodejs",              title: "MERN Month 2 — Review & Notes App Project", month: 2, week: 5 },

  // ─── MONTH 3: SEPTEMBER — Auth, Projects, Deployment ─────────────────────
  // Week 1 — Authentication
  { day: 43, topicSlug: "express-rest",        title: "MERN — Password Hashing (bcrypt) & Signup", month: 3, week: 1 },
  { day: 44, topicSlug: "nodejs-optimization", title: "MERN — JWT Login & Token Generation",       month: 3, week: 1 },
  { day: 45, topicSlug: "express-production",  title: "MERN — JWT Middleware & Protected Routes",  month: 3, week: 1 },
  { day: 46, topicSlug: "react-redux",         title: "MERN — Role-Based Access Control",          month: 3, week: 1 },
  { day: 47, topicSlug: "react-deployment",    title: "MERN — Frontend Auth (Login + Protected Pages)", month: 3, week: 1 },
  // Week 2 — Blog App
  { day: 48, topicSlug: "mongodb",             title: "MERN — Blog App: DB Schema & Planning",     month: 3, week: 2 },
  { day: 49, topicSlug: "express-rest",        title: "MERN — Blog App: Post & Comment APIs",      month: 3, week: 2 },
  { day: 50, topicSlug: "react",               title: "MERN — Blog App: React Frontend",           month: 3, week: 2 },
  { day: 51, topicSlug: "react",               title: "MERN — Blog App: Image Upload + Likes",     month: 3, week: 2 },
  { day: 52, topicSlug: "devops",              title: "MERN — Blog App: End-to-End Testing & Deploy", month: 3, week: 2 },
  // Week 3 — E-commerce / Job Portal
  { day: 53, topicSlug: "react",               title: "MERN — E-commerce/Job Portal: UI",          month: 3, week: 3 },
  { day: 54, topicSlug: "express-rest",        title: "MERN — E-commerce/Job Portal: APIs",        month: 3, week: 3 },
  { day: 55, topicSlug: "mongodb",             title: "MERN — E-commerce/Job Portal: DB",          month: 3, week: 3 },
  { day: 56, topicSlug: "docker",              title: "MERN — Security, Testing & Docker",          month: 3, week: 3 },
  { day: 57, topicSlug: "aws-ec2",             title: "MERN — Full Deployment to AWS",             month: 3, week: 3 },
  // Week 4 — Portfolio & Wrap-up
  { day: 58, topicSlug: "genai",               title: "MERN — GenAI Integration (Optional)",       month: 3, week: 4 },
  { day: 59, topicSlug: "devops",              title: "MERN Cohort — Final Review & Graduation",   month: 3, week: 4 },
]

export const MERN_COHORT_SCHEDULE = SCHEDULE_ENTRIES.map((entry) => ({
  ...entry,
  dayNumber: entry.day + 1,
  scheduledAt: allDates[entry.day],
}))

export const MERN_MONTH_LABELS = {
  1: "July 2026 — HTML, CSS & JavaScript",
  2: "August 2026 — React, Node.js & MongoDB",
  3: "September 2026 — Auth, Projects & Deployment",
}

export function getMernMonthSessions(month) {
  return MERN_COHORT_SCHEDULE.filter((s) => s.month === month)
}
