"use client"

import { useState, useCallback } from "react"
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from "@dnd-kit/core"
import { SortableContext } from "@dnd-kit/sortable"
import KanbanColumn from "./KanbanColumn"
import TicketCard from "./TicketCard"

const COLUMNS = ["BACKLOG", "TODO", "IN_PROGRESS", "REVIEW", "DONE"]
const COLUMN_SET = new Set(COLUMNS)

function buildColumns(tickets) {
  const map = {}
  COLUMNS.forEach((c) => { map[c] = [] })
  for (const t of tickets) {
    if (map[t.status]) map[t.status].push(t)
  }
  return map
}

export default function KanbanBoard({ initialTickets, isDraggable = true, isAdmin = false, onDelete }) {
  const [tickets, setTickets]         = useState(initialTickets)
  const [activeTicket, setActiveTicket] = useState(null)
  const [error, setError]             = useState(null)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  )

  const columns = buildColumns(tickets)

  const findColumnOfTicket = useCallback(
    (ticketId) => COLUMNS.find((col) => columns[col].some((t) => t.id === ticketId)),
    [tickets]
  )

  const handleDragStart = useCallback(({ active }) => {
    setActiveTicket(tickets.find((t) => t.id === active.id) ?? null)
  }, [tickets])

  const handleDragEnd = useCallback(async ({ active, over }) => {
    setActiveTicket(null)
    if (!over) return

    const activeId = String(active.id)
    const overId   = String(over.id)

    // Determine destination column
    const destColumn = COLUMN_SET.has(overId)
      ? overId
      : findColumnOfTicket(overId)

    if (!destColumn) return

    const srcColumn = findColumnOfTicket(activeId)
    if (srcColumn === destColumn) return // same column → no-op

    // Snapshot for rollback
    const prev = tickets

    // Optimistic update
    setTickets((ts) => ts.map((t) => t.id === activeId ? { ...t, status: destColumn } : t))

    try {
      const res = await fetch(`/api/tickets/${activeId}`, {
        method:  "PATCH",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ status: destColumn }),
      })
      if (!res.ok) throw new Error("Update failed")
    } catch {
      setTickets(prev)
      setError("Could not move ticket. Please try again.")
      setTimeout(() => setError(null), 3000)
    }
  }, [tickets, findColumnOfTicket])

  const handleDelete = useCallback((id) => {
    setTickets((ts) => ts.filter((t) => t.id !== id))
    onDelete?.(id)
  }, [onDelete])

  // Called by AdminBoardClient when a new ticket is created
  KanbanBoard.addTicket = (ticket) => setTickets((ts) => [ticket, ...ts])

  return (
    <div>
      {error && (
        <div className="mb-4 px-4 py-2.5 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm rounded-xl">
          {error}
        </div>
      )}

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-4 overflow-x-auto pb-4">
          {COLUMNS.map((col) => (
            <KanbanColumn
              key={col}
              id={col}
              tickets={columns[col]}
              isDraggable={isDraggable}
              isAdmin={isAdmin}
              onDelete={handleDelete}
            />
          ))}
        </div>

        <DragOverlay>
          {activeTicket ? (
            <TicketCard ticket={activeTicket} isDraggable={false} isAdmin={false} />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  )
}
