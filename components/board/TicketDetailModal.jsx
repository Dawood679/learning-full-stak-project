"use client"

import { useState } from "react"
import { X, Calendar, User, Tag, Clock, Layers, Pencil, Loader2, Check } from "lucide-react"
import { cn } from "@/lib/utils"

const PRIORITY_STYLES = {
  HIGH:   "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  MEDIUM: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  LOW:    "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
}

const STATUS_META = {
  BACKLOG:     { label: "Backlog",     color: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300" },
  TODO:        { label: "To Do",       color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" },
  IN_PROGRESS: { label: "In Progress", color: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400" },
  REVIEW:      { label: "Review",      color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" },
  DONE:        { label: "Done",        color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" },
}

const INPUT_CLS = "w-full text-sm px-3 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500"

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

export default function TicketDetailModal({ ticket, onClose, isAdmin = false, students = [], onUpdate }) {
  const [editing, setEditing]   = useState(false)
  const [saving, setSaving]     = useState(false)
  const [error, setError]       = useState(null)
  const [form, setForm]         = useState(null)

  if (!ticket) return null

  const isOverdue = ticket.dueDate && new Date(ticket.dueDate) < new Date()
  const status    = STATUS_META[ticket.status] ?? { label: ticket.status, color: "" }

  const startEdit = () => {
    setForm({
      title:      ticket.title,
      description: ticket.description ?? "",
      priority:   ticket.priority,
      status:     ticket.status,
      assigneeId: ticket.assignee?.id ?? "",
      dueDate:    ticket.dueDate ? new Date(ticket.dueDate).toISOString().split("T")[0] : "",
    })
    setError(null)
    setEditing(true)
  }

  const cancelEdit = () => {
    setEditing(false)
    setForm(null)
    setError(null)
  }

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const handleSave = async () => {
    if (!form.title.trim()) { setError("Title is required"); return }
    setSaving(true)
    setError(null)
    try {
      const res = await fetch(`/api/tickets/${ticket.id}`, {
        method:  "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title:       form.title.trim(),
          description: form.description.trim() || null,
          priority:    form.priority,
          status:      form.status,
          assigneeId:  form.assigneeId || null,
          dueDate:     form.dueDate || null,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? "Update failed")
      onUpdate?.(data.ticket)
      setEditing(false)
      setForm(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={editing ? undefined : onClose}
    >
      <div
        className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl w-full max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            {!editing && (
              <>
                <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide", PRIORITY_STYLES[ticket.priority])}>
                  {ticket.priority}
                </span>
                <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide", status.color)}>
                  {status.label}
                </span>
              </>
            )}
            {editing && (
              <span className="text-xs font-semibold text-violet-600 dark:text-violet-400">Editing Ticket</span>
            )}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {isAdmin && !editing && (
              <button
                onClick={startEdit}
                className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-violet-50 hover:bg-violet-100 dark:bg-violet-900/30 dark:hover:bg-violet-900/50 text-violet-700 dark:text-violet-400 transition-colors"
              >
                <Pencil className="w-3.5 h-3.5" />
                Edit
              </button>
            )}
            <button
              onClick={editing ? cancelEdit : onClose}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4 max-h-[60vh] overflow-y-auto">
          {editing ? (
            /* ── Edit Form ── */
            <div className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={set("title")}
                  className={INPUT_CLS}
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">Description</label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={set("description")}
                  placeholder="Optional details…"
                  className={cn(INPUT_CLS, "resize-none")}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Priority */}
                <div>
                  <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">Priority</label>
                  <select value={form.priority} onChange={set("priority")} className={INPUT_CLS}>
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                  </select>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">Status</label>
                  <select value={form.status} onChange={set("status")} className={INPUT_CLS}>
                    <option value="BACKLOG">Backlog</option>
                    <option value="TODO">To Do</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="REVIEW">Review</option>
                    <option value="DONE">Done</option>
                  </select>
                </div>
              </div>

              {/* Due Date */}
              <div>
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">Due Date</label>
                <input
                  type="date"
                  value={form.dueDate}
                  onChange={set("dueDate")}
                  className={INPUT_CLS}
                />
              </div>

              {/* Assignee */}
              <div>
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">Assign to</label>
                <select value={form.assigneeId} onChange={set("assigneeId")} className={INPUT_CLS}>
                  <option value="">Unassigned</option>
                  {students.map((s) => (
                    <option key={s.id} value={s.id}>{s.name ?? s.email}</option>
                  ))}
                </select>
              </div>

              {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
            </div>
          ) : (
            /* ── View Mode ── */
            <>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white leading-snug">
                {ticket.title}
              </h2>

              {ticket.description && (
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line">
                  {ticket.description}
                </p>
              )}

              <div className="space-y-3 pt-1">
                {ticket.assignee && (
                  <Row icon={User} label="Assigned To">
                    {ticket.assignee.name ?? ticket.assignee.email}
                  </Row>
                )}
                {ticket.createdBy && (
                  <Row icon={Tag} label="Created By">
                    {ticket.createdBy.name ?? "—"}
                  </Row>
                )}
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
                {ticket.createdAt && (
                  <Row icon={Clock} label="Created">
                    {new Date(ticket.createdAt).toLocaleDateString("en-PK", {
                      year: "numeric", month: "short", day: "numeric",
                    })}
                  </Row>
                )}
                <Row icon={Layers} label="Status">
                  <span className={cn("inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide", status.color)}>
                    {status.label}
                  </span>
                </Row>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3">
          {editing ? (
            <>
              <button
                onClick={cancelEdit}
                className="text-sm font-medium px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white text-sm font-semibold px-5 py-2 rounded-xl transition-colors"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                {saving ? "Saving…" : "Save Changes"}
              </button>
            </>
          ) : (
            <button
              onClick={onClose}
              className="text-sm font-medium px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
