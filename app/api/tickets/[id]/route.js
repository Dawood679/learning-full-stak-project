import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

const TICKET_INCLUDE = {
  assignee:  { select: { id: true, name: true, email: true, image: true } },
  createdBy: { select: { id: true, name: true } },
}

export async function PATCH(request, { params }) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  const ticket = await prisma.ticket.findUnique({ where: { id } })
  if (!ticket) return NextResponse.json({ error: "Not found" }, { status: 404 })

  const isAdmin = session.user.role === "ADMIN"
  const isOwner = ticket.assigneeId === session.user.id

  if (!isAdmin && !isOwner) return NextResponse.json({ error: "Forbidden" }, { status: 403 })

  const body = await request.json()

  // Students may only change status
  const data = isAdmin ? body : { status: body.status }

  const updated = await prisma.ticket.update({
    where: { id },
    data,
    include: TICKET_INCLUDE,
  })

  return NextResponse.json({ ticket: updated })
}

export async function DELETE(_req, { params }) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  if (session.user.role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 })

  const { id } = await params
  await prisma.ticket.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
