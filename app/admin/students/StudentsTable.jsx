"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { getSocket } from "@/lib/socket-client"

function AttendanceBadge({ percentage }) {
  if (percentage >= 75)
    return <span className="text-xs font-semibold text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2.5 py-1 rounded-full">{percentage}%</span>
  if (percentage >= 50)
    return <span className="text-xs font-semibold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-2.5 py-1 rounded-full">{percentage}%</span>
  return <span className="text-xs font-semibold text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-2.5 py-1 rounded-full">{percentage ?? 0}%</span>
}

function OnlineDot({ online }) {
  return (
    <span className="flex items-center gap-1.5">
      <span
        className={`inline-block w-2 h-2 rounded-full ${
          online ? "bg-green-500 shadow-[0_0_0_2px_rgba(34,197,94,0.25)]" : "bg-slate-300 dark:bg-slate-600"
        }`}
      />
      <span className={`text-xs font-medium ${online ? "text-green-600 dark:text-green-400" : "text-slate-400"}`}>
        {online ? "Online" : "Offline"}
      </span>
    </span>
  )
}

export function StudentsTable({ students, adminUserId }) {
  const [onlineSet, setOnlineSet] = useState(new Set())

  useEffect(() => {
    const socket = getSocket(adminUserId)

    socket.emit("subscribe:online")

    function handleOnlineUsers(ids) {
      setOnlineSet(new Set(ids))
    }

    socket.on("online:users", handleOnlineUsers)

    return () => {
      socket.off("online:users", handleOnlineUsers)
    }
  }, [adminUserId])

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400">
            <th className="text-left px-6 py-3 font-medium">Student</th>
            <th className="text-center px-4 py-3 font-medium">Status</th>
            <th className="text-center px-4 py-3 font-medium">Classes Attended</th>
            <th className="text-center px-4 py-3 font-medium">Attendance %</th>
            <th className="text-center px-4 py-3 font-medium">Quiz Attempts</th>
            <th className="text-center px-4 py-3 font-medium">Avg Score</th>
            <th className="text-center px-4 py-3 font-medium">Joined</th>
            <th className="text-center px-4 py-3 font-medium">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
          {students.map((student) => (
            <tr key={student.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  {student.image && (
                    <img src={student.image} alt={student.name} className="w-8 h-8 rounded-full" />
                  )}
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">{student.name ?? "Unknown"}</p>
                    <p className="text-xs text-slate-400">{student.email}</p>
                  </div>
                </div>
              </td>
              <td className="text-center px-4 py-4">
                <OnlineDot online={onlineSet.has(student.id)} />
              </td>
              <td className="text-center px-4 py-4 text-slate-700 dark:text-slate-300 font-medium">
                {student.present}/{student.total}
              </td>
              <td className="text-center px-4 py-4">
                <AttendanceBadge percentage={student.percentage} />
              </td>
              <td className="text-center px-4 py-4 text-slate-700 dark:text-slate-300">
                {student.quizAttempts.length}
              </td>
              <td className="text-center px-4 py-4 text-slate-700 dark:text-slate-300">
                {student.avgScore !== null ? `${student.avgScore}%` : "—"}
              </td>
              <td className="text-center px-4 py-4 text-slate-500 dark:text-slate-400 text-xs">
                {new Date(student.createdAt).toLocaleDateString("en-PK", { month: "short", day: "numeric", year: "numeric" })}
              </td>
              <td className="text-center px-4 py-4">
                <Link
                  href={`/admin/students/${student.id}`}
                  className="text-xs text-violet-600 dark:text-violet-400 hover:underline font-medium"
                >
                  View Details
                </Link>
              </td>
            </tr>
          ))}
          {students.length === 0 && (
            <tr>
              <td colSpan={8} className="text-center px-6 py-12 text-slate-400">
                No students have signed in yet
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
