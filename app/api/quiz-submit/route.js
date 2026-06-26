import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(request) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await request.json()
  const { topicSlug, score, total, answers } = body

  if (!topicSlug || score === undefined || !total) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 })
  }

  const userId = session.user.id
  const percentage = Math.round((score / total) * 100)

  // Save quiz attempt
  const attempt = await prisma.quizAttempt.create({
    data: {
      userId,
      topicSlug,
      score,
      total,
      answers: answers ?? [],
    },
  })

  // Find the class session for this topic that is today or most recent past session
  const today = new Date()
  today.setHours(23, 59, 59, 999)

  const classSession = await prisma.classSession.findFirst({
    where: {
      topicSlug,
      scheduledAt: { lte: today },
    },
    orderBy: { scheduledAt: "desc" },
  })

  let attendanceMarked = false
  if (classSession) {
    // Upsert attendance — mark PRESENT if quiz score >= 50%
    await prisma.attendance.upsert({
      where: {
        userId_classSessionId: {
          userId,
          classSessionId: classSession.id,
        },
      },
      create: {
        userId,
        classSessionId: classSession.id,
        status: percentage >= 50 ? "PRESENT" : "ABSENT",
        quizScore: percentage,
        completedAt: new Date(),
      },
      update: {
        status: percentage >= 50 ? "PRESENT" : "ABSENT",
        quizScore: percentage,
        completedAt: new Date(),
      },
    })
    attendanceMarked = true
  }

  return NextResponse.json({
    success: true,
    attemptId: attempt.id,
    percentage,
    attendanceMarked,
    status: percentage >= 50 ? "PRESENT" : "ABSENT",
  })
}
