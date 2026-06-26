import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

// GET /api/attendance — current user's attendance summary
export async function GET() {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const attendances = await prisma.attendance.findMany({
    where: { userId: session.user.id },
    include: {
      classSession: {
        include: { topic: { select: { title: true, slug: true } } },
      },
    },
    orderBy: { classSession: { scheduledAt: "asc" } },
  })

  const total = attendances.length
  const present = attendances.filter((a) => a.status === "PRESENT").length
  const percentage = total > 0 ? Math.round((present / total) * 100) : 0

  return NextResponse.json({ attendances, summary: { total, present, absent: total - present, percentage } })
}
