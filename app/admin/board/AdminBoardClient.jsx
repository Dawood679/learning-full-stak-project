"use client"

import { useState, useCallback } from "react"
import { Kanban } from "lucide-react"
import KanbanBoard from "@/components/board/KanbanBoard"
import CreateTicketModal from "./CreateTicketModal"

export default function AdminBoardClient({ initialTickets, students }) {
  const [tickets, setTickets] = useState(initialTickets)

  const handleCreated = useCallback((ticket) => {
    setTickets((ts) => [ticket, ...ts])
  }, [])

  const handleDeleted = useCallback((id) => {
    setTickets((ts) => ts.filter((t) => t.id !== id))
  }, [])

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-violet-100 dark:bg-violet-900/40 flex items-center justify-center">
            <Kanban className="w-5 h-5 text-violet-600 dark:text-violet-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Ticket Board</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              {tickets.length} ticket{tickets.length !== 1 ? "s" : ""} · drag to move between columns
            </p>
          </div>
        </div>
        <CreateTicketModal students={students} onCreated={handleCreated} />
      </div>

      <KanbanBoard
        initialTickets={tickets}
        isDraggable={true}
        isAdmin={true}
        onDelete={handleDeleted}
      />
    </div>
  )
}
