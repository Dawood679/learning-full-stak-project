"use client"

import { X, Calendar, User, Tag, Clock, Layers } from "lucide-react"
import { cn } from "@/lib/utils"

const PRIORITY_STYLES = {
  HIGH:   "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  MEDIUM: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  LOW:    "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
}

const STATUS_META = {
  BACKLOG:     { label: "Backlog",      color: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300" },
  TODO:        { label: "To Do",        color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" },
  IN_PROGRESS: { label: "In Progress",  color: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400" },
  REVIEW:      { label: "Review",       color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" },
  DONE:        { label: "Done",         color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" },
}

function Row({ icon: Icon, label, children }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 mt-0.5">
        <Icon className="w-4 h-4 text-slate-500 dark:text-slate-400" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-0.5">{label}</p>
        <div className="text-sm text-slate-800 dark:text-slate-200">{children}</div>
      </div>
    </div>
  )
}

export default function TicketDetailModal({ ticket, onClose }) {
  if (!ticket) return null

  const isOverdue = ticket.dueDate && new Date(ticket.dueDate) < new Date()
  const status    = STATUS_META[ticket.status] ?? { label: ticket.status, color: "" }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl w-full max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide", PRIORITY_STYLES[ticket.priority])}>
              {ticket.priority}
            </span>
            <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide", status.color)}>
              {status.label}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-5">
          {/* Title */}
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white leading-snug">
            {ticket.title}
          </h2>

          {/* Description */}
          {ticket.description && (
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line">
              {ticket.description}
            </p>
          )}

          <div className="space-y-3 pt-1">
            {/* Assignee */}
            {ticket.assignee && (
              <Row icon={User} label="Assigned To">
                <span>{ticket.assignee.name ?? ticket.assignee.email}</span>
              </Row>
            )}

            {/* Created By */}
            {ticket.createdBy && (
              <Row icon={Tag} label="Created By">
                <span>{ticket.createdBy.name ?? ticket.createdBy.email ?? "—"}</span>
              </Row>
            )}

            {/* Due Date */}
            {ticket.dueDate && (
              <Row icon={Calendar} label="Due Date">
                <span className={cn(isOverdue && "text-red-500 font-medium")}>
                  {new Date(ticket.dueDate).toLocaleDateString("en-PK", {
                    weekday: "short", year: "numeric", month: "short", day: "numeric",
                  })}
                  {isOverdue && " · Overdue"}
                </span>
              </Row>
            )}

            {/* Created At */}
            {ticket.createdAt && (
              <Row icon={Clock} label="Created">
                <span>
                  {new Date(ticket.createdAt).toLocaleDateString("en-PK", {
                    year: "numeric", month: "short", day: "numeric",
                  })}
                </span>
              </Row>
            )}

            {/* Status */}
            <Row icon={Layers} label="Status">
              <span className={cn("inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide", status.color)}>
                {status.label}
              </span>
            </Row>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="text-sm font-medium px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
