import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import AdminBoardClient from "./AdminBoardClient"

export const metadata = { title: "Ticket Board — Admin · DevOnix" }

const TICKET_INCLUDE = {
  assignee:  { select: { id: true, name: true, email: true, image: true } },
  createdBy: { select: { id: true, name: true } },
}

export default async function AdminBoardPage() {
  const session = await auth()
  if (!session?.user || session.user.role !== "ADMIN") redirect("/sign-in")

  const [tickets, students] = await Promise.all([
    prisma.ticket.findMany({
      include:  TICKET_INCLUDE,
      orderBy:  [{ status: "asc" }, { createdAt: "desc" }],
    }),
    prisma.user.findMany({
      where:   { role: "STUDENT" },
      select:  { id: true, name: true, email: true },
      orderBy: { name: "asc" },
    }),
  ])

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <AdminBoardClient initialTickets={tickets} students={students} />
    </div>
  )
}
