"use client"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { GripVertical, Calendar, User, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

const PRIORITY_STYLES = {
  HIGH:   "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  MEDIUM: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  LOW:    "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
}

export default function TicketCard({ ticket, isDraggable = true, isAdmin = false, onDelete }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: ticket.id })

  const style = {
    transform:  CSS.Transform.toString(transform),
    transition,
    opacity:    isDragging ? 0.4 : 1,
  }

  const isOverdue = ticket.dueDate && new Date(ticket.dueDate) < new Date()

  const handleDelete = async (e) => {
    e.stopPropagation()
    if (!window.confirm(`Delete "${ticket.title}"?`)) return
    await fetch(`/api/tickets/${ticket.id}`, { method: "DELETE" })
    onDelete?.(ticket.id)
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800",
        "p-3 shadow-sm hover:shadow-md transition-shadow select-none group",
        isDragging && "shadow-lg ring-2 ring-violet-500/40"
      )}
    >
      <div className="flex items-start gap-2">
        {isDraggable && (
          <button
            {...attributes}
            {...listeners}
            className="mt-0.5 text-slate-300 dark:text-slate-600 hover:text-slate-500 dark:hover:text-slate-400 cursor-grab active:cursor-grabbing shrink-0"
            aria-label="Drag ticket"
          >
            <GripVertical className="w-4 h-4" />
          </button>
        )}

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-1.5 mb-1.5">
            <span className={cn("text-[10px] font-semibold px-1.5 py-0.5 rounded-full uppercase tracking-wide shrink-0", PRIORITY_STYLES[ticket.priority])}>
              {ticket.priority}
            </span>
            {isAdmin && (
              <button
                onClick={handleDelete}
                className="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-red-500 dark:text-slate-600 dark:hover:text-red-400 transition-all shrink-0"
                aria-label="Delete ticket"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <p className="text-sm font-medium text-slate-900 dark:text-white leading-snug">
            {ticket.title}
          </p>

          {ticket.description && (
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
              {ticket.description}
            </p>
          )}

          <div className="flex items-center justify-between mt-2 gap-2">
            {ticket.assignee && (
              <div className="flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500 min-w-0">
                <User className="w-3 h-3 shrink-0" />
                <span className="truncate">{ticket.assignee.name ?? ticket.assignee.email}</span>
              </div>
            )}
            {ticket.dueDate && (
              <div className={cn("flex items-center gap-1 text-xs shrink-0 ml-auto", isOverdue ? "text-red-500" : "text-slate-400")}>
                <Calendar className="w-3 h-3" />
                <span>
                  {new Date(ticket.dueDate).toLocaleDateString("en-PK", { month: "short", day: "numeric" })}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
