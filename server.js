const { createServer } = require("http")
const next = require("next")
const { Server } = require("socket.io")
const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()
const port = parseInt(process.env.PORT || "3000", 10)
const dev = process.env.NODE_ENV !== "production"
const app = next({ dev })
const handle = app.getRequestHandler()

// userId -> { totalSeconds: number, sessionStart: number|null, connections: number }
const userSessions = new Map()

function getSession(userId) {
  if (!userSessions.has(userId)) {
    userSessions.set(userId, { totalSeconds: 0, sessionStart: null, connections: 0 })
  }
  return userSessions.get(userId)
}

function accumulateTime(data) {
  if (data.sessionStart !== null) {
    data.totalSeconds += Math.floor((Date.now() - data.sessionStart) / 1000)
    data.sessionStart = null
  }
}

function getTodayKey() {
  return new Date().toISOString().slice(0, 10)
}

async function runAttendanceCheck() {
  console.log("[Attendance] Running 5 PM check...")

  // Accumulate any still-active sessions before checking
  for (const data of userSessions.values()) {
    if (data.sessionStart !== null) {
      data.totalSeconds += Math.floor((Date.now() - data.sessionStart) / 1000)
      // keep sessionStart for ongoing sessions
      data.sessionStart = Date.now()
    }
  }

  const FIVE_HOURS = 5 * 60 * 60

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  const classSession = await prisma.classSession.findFirst({
    where: { scheduledAt: { gte: today, lt: tomorrow } },
  })

  if (!classSession) {
    console.log("[Attendance] No class session for today, skipping.")
    return
  }

  let marked = 0
  for (const [userId, data] of userSessions.entries()) {
    if (data.totalSeconds >= FIVE_HOURS) {
      await prisma.attendance.upsert({
        where: { userId_classSessionId: { userId, classSessionId: classSession.id } },
        create: { userId, classSessionId: classSession.id, status: "PRESENT" },
        update: { status: "PRESENT" },
      })
      console.log(`[Attendance] ✓ ${userId} — ${Math.floor(data.totalSeconds / 3600)}h online → PRESENT`)
      marked++
    }
  }
  console.log(`[Attendance] Done. ${marked} student(s) marked PRESENT.`)
}

app.prepare().then(() => {
  const httpServer = createServer((req, res) => handle(req, res))

  const io = new Server(httpServer, {
    path: "/api/socket",
    cors: { origin: "*", methods: ["GET", "POST"] },
  })

  io.on("connection", (socket) => {
    const userId = socket.handshake.auth?.userId
    if (!userId) {
      socket.disconnect()
      return
    }

    const data = getSession(userId)
    data.connections++
    if (data.connections === 1) {
      // First tab — start the clock
      data.sessionStart = Date.now()
    }

    socket.on("ping", () => {
      socket.emit("pong")
    })

    socket.on("disconnect", () => {
      const d = getSession(userId)
      d.connections = Math.max(0, d.connections - 1)
      if (d.connections === 0) {
        // Last tab closed — stop the clock
        accumulateTime(d)
      }
    })
  })

  // Check every minute for the 17:00 trigger
  let lastCheckedDay = null

  setInterval(async () => {
    const now = new Date()
    const todayKey = getTodayKey()

    // Reset data at midnight
    if (lastCheckedDay && lastCheckedDay !== todayKey) {
      userSessions.clear()
      console.log("[Attendance] New day — session data reset.")
    }
    lastCheckedDay = todayKey

    // Trigger at 17:00 (once per day)
    if (now.getHours() === 17 && now.getMinutes() === 0) {
      const checkKey = `${todayKey}-checked`
      if (!userSessions.has(checkKey)) {
        userSessions.set(checkKey, true) // sentinel so it runs only once
        await runAttendanceCheck()
      }
    }
  }, 60_000)

  httpServer.listen(port, () => {
    console.log(`> Ready on http://localhost:${port} [${dev ? "development" : "production"}]`)
  })
})
