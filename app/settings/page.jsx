import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { Settings, User, Lock } from "lucide-react"
import { UpdateNameForm, UpdatePasswordForm } from "./SettingsForms"

export const metadata = { title: "Settings — DevOnix" }

export default async function SettingsPage() {
  const session = await auth()
  if (!session?.user) redirect("/sign-in")

  const user = await prisma.user.findUnique({
    where:  { id: session.user.id },
    select: { name: true, email: true, password: true },
  })

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-violet-100 dark:bg-violet-900/40 flex items-center justify-center">
            <Settings className="w-5 h-5 text-violet-600 dark:text-violet-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Account Settings</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">{user?.email}</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Update Name */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
            <div className="flex items-center gap-2 mb-5">
              <User className="w-4 h-4 text-violet-600 dark:text-violet-400" />
              <h2 className="font-semibold text-slate-900 dark:text-white">Display Name</h2>
            </div>
            <UpdateNameForm currentName={user?.name} />
          </div>

          {/* Update Password */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
            <div className="flex items-center gap-2 mb-5">
              <Lock className="w-4 h-4 text-violet-600 dark:text-violet-400" />
              <h2 className="font-semibold text-slate-900 dark:text-white">Change Password</h2>
            </div>
            <UpdatePasswordForm hasPassword={!!user?.password} />
          </div>
        </div>
      </div>
    </div>
  )
}
