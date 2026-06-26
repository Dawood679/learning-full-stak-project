import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { Kanban } from "lucide-react"
import KanbanBoard from "@/components/board/KanbanBoard"

export const metadata = { title: "My Tickets — DevOnix" }

export default async function MyBoardPage() {
  const session = await auth()
  if (!session?.user) redirect("/sign-in")
  if (session.user.role === "ADMIN") redirect("/admin/board")

  const tickets = await prisma.ticket.findMany({
    where:   { assigneeId: session.user.id },
    include: {
      assignee:  { select: { id: true, name: true, email: true, image: true } },
      createdBy: { select: { id: true, name: true } },
    },
    orderBy: [{ status: "asc" }, { createdAt: "desc" }],
  })

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-violet-100 dark:bg-violet-900/40 flex items-center justify-center">
            <Kanban className="w-5 h-5 text-violet-600 dark:text-violet-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">My Tickets</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              {tickets.length} ticket{tickets.length !== 1 ? "s" : ""} assigned · drag to update status
            </p>
          </div>
        </div>

        {tickets.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-slate-400 dark:text-slate-600">
            <Kanban className="w-14 h-14 mb-4 opacity-30" />
            <p className="text-sm font-medium">No tickets assigned to you yet.</p>
            <p className="text-xs mt-1 opacity-70">Your admin will assign tasks here.</p>
          </div>
        ) : (
          <KanbanBoard
            initialTickets={tickets}
            isDraggable={true}
            isAdmin={false}
          />
        )}
      </div>
    </div>
  )
}
