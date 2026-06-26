import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

const TICKET_INCLUDE = {
  assignee:  { select: { id: true, name: true, email: true, image: true } },
  createdBy: { select: { id: true, name: true } },
}

export async function GET() {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const where = session.user.role === "ADMIN" ? {} : { assigneeId: session.user.id }

  const tickets = await prisma.ticket.findMany({
    where,
    include: TICKET_INCLUDE,
    orderBy: [{ status: "asc" }, { createdAt: "desc" }],
  })

  return NextResponse.json({ tickets })
}

export async function POST(request) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  if (session.user.role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 })

  const { title, description, priority = "MEDIUM", assigneeId, dueDate } = await request.json()

  if (!title?.trim()) return NextResponse.json({ error: "Title is required" }, { status: 400 })

  const VALID = ["LOW", "MEDIUM", "HIGH"]
  if (!VALID.includes(priority)) return NextResponse.json({ error: "Invalid priority" }, { status: 400 })

  const ticket = await prisma.ticket.create({
    data: {
      title:       title.trim(),
      description: description?.trim() || null,
      priority,
      status:      "BACKLOG",
      assigneeId:  assigneeId || null,
      dueDate:     dueDate ? new Date(dueDate) : null,
      createdById: session.user.id,
    },
    include: TICKET_INCLUDE,
  })

  return NextResponse.json({ ticket }, { status: 201 })
}
