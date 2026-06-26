import Link from "next/link"
import { ArrowLeft, GitBranch } from "lucide-react"
import { prisma } from "@/lib/prisma"
import TrackSection from "./TrackSection"
import RegisterStudentForm from "./RegisterStudentForm"

export const metadata = {
  title: "Track Management — Admin",
}

async function getStudentsByTrack() {
  const users = await prisma.user.findMany({
    where: { role: "STUDENT" },
    select: { id: true, name: true, email: true, image: true, track: true },
    orderBy: { createdAt: "asc" },
  })

  return {
    MERN_STACK: users.filter((u) => u.track === "MERN_STACK"),
    FULL_STACK:  users.filter((u) => !u.track || u.track === "FULL_STACK"),
    ADVANCED:    users.filter((u) => u.track === "ADVANCED"),
    INTERNEE:    users.filter((u) => u.track === "INTERNEE"),
  }
}

export default async function TracksPage() {
  const byTrack = await getStudentsByTrack()

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page header */}
      <div className="flex items-center gap-3 mb-2">
        <Link href="/admin" className="text-slate-500 hover:text-violet-600 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex items-center gap-2">
          <GitBranch className="w-6 h-6 text-violet-600" />
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Track Management</h1>
        </div>
      </div>
      <p className="text-slate-500 dark:text-slate-400 text-sm mb-8 ml-8">
        Assign students to their learning track. Each track shows a different 3-month curriculum.
      </p>

      <div className="space-y-6">
        {/* Register new student form */}
        <RegisterStudentForm />

        <div className="border-t border-slate-200 dark:border-slate-800 pt-2">
          <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-4">
            Track Assignment
          </h3>
        </div>

        <TrackSection
          track="MERN_STACK"
          label="MERN Stack"
          description="90-day plan: HTML → CSS → JS → React (with Redux) → Node.js → MongoDB → Auth → Projects"
          students={byTrack.MERN_STACK}
        />

        <TrackSection
          track="FULL_STACK"
          label="Full Stack Internee"
          description="Current internee curriculum: HTML → CSS → JS → React → Node.js → Express → Databases → WebSockets → DevOps"
          students={byTrack.FULL_STACK}
        />

        <TrackSection
          track="ADVANCED"
          label="Advanced Backend"
          description="12-week advanced plan: Node.js + Auth → WebSockets + WebRTC → Redis + BullMQ → Docker → System Design → GenAI → Capstone"
          students={byTrack.ADVANCED}
        />

        <TrackSection
          track="INTERNEE"
          label="Internee"
          description="Company interns: HTML → CSS → JS → Node.js → Express → MongoDB → React → Docker → Real Project"
          students={byTrack.INTERNEE}
        />
      </div>

      <p className="text-xs text-slate-400 dark:text-slate-500 mt-8 text-center">
        Students must sign out and back in after being assigned a track for the change to take effect.
      </p>
    </div>
  )
}
