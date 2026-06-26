"use client"

import { useDroppable } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { cn } from "@/lib/utils"
import TicketCard from "./TicketCard"

const COLUMN_META = {
  BACKLOG:     { label: "Backlog",      dot: "bg-slate-400",   header: "bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400" },
  TODO:        { label: "To Do",        dot: "bg-blue-500",    header: "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400" },
  IN_PROGRESS: { label: "In Progress",  dot: "bg-violet-500",  header: "bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-400" },
  REVIEW:      { label: "Review",       dot: "bg-amber-500",   header: "bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400" },
  DONE:        { label: "Done",         dot: "bg-green-500",   header: "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400" },
}

export default function KanbanColumn({ id, tickets, isDraggable, isAdmin, onDelete }) {
  const { setNodeRef, isOver } = useDroppable({ id })
  const meta = COLUMN_META[id]

  return (
    <div className="flex flex-col min-w-[240px] w-[260px] shrink-0">
      {/* Header */}
      <div className={cn("flex items-center gap-2 px-3 py-2.5 rounded-t-xl", meta.header)}>
        <span className={cn("w-2 h-2 rounded-full shrink-0", meta.dot)} />
        <span className="text-xs font-semibold uppercase tracking-wide">{meta.label}</span>
        <span className="ml-auto text-xs font-bold opacity-60 tabular-nums">{tickets.length}</span>
      </div>

      {/* Drop zone */}
      <div
        ref={setNodeRef}
        className={cn(
          "flex flex-col gap-2 p-2 min-h-[200px] flex-1 rounded-b-xl border border-t-0 transition-colors",
          isOver
            ? "bg-violet-50 dark:bg-violet-900/10 border-violet-300 dark:border-violet-700"
            : "bg-slate-50/60 dark:bg-slate-900/30 border-slate-200 dark:border-slate-700"
        )}
      >
        <SortableContext items={tickets.map((t) => t.id)} strategy={verticalListSortingStrategy}>
          {tickets.map((ticket) => (
            <TicketCard
              key={ticket.id}
              ticket={ticket}
              isDraggable={isDraggable}
              isAdmin={isAdmin}
              onDelete={onDelete}
            />
          ))}
        </SortableContext>

        {tickets.length === 0 && (
          <div className="flex-1 flex items-center justify-center text-xs text-slate-300 dark:text-slate-700 italic py-6">
            Drop here
          </div>
        )}
      </div>
    </div>
  )
}
