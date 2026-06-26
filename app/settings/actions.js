"use server"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function updateName(prevState, formData) {
  const session = await auth()
  if (!session?.user) return { error: "Not authenticated" }

  const name = formData.get("name")?.trim()
  if (!name || name.length < 2) return { error: "Name must be at least 2 characters" }
  if (name.length > 60)         return { error: "Name too long (max 60 characters)" }

  await prisma.user.update({
    where: { id: session.user.id },
    data:  { name },
  })

  return { success: "Name updated successfully" }
}

export async function updatePassword(prevState, formData) {
  const session = await auth()
  if (!session?.user) return { error: "Not authenticated" }

  const current    = formData.get("current")?.trim()
  const next       = formData.get("next")?.trim()
  const confirm    = formData.get("confirm")?.trim()

  if (!current || !next || !confirm) return { error: "All fields are required" }
  if (next.length < 6)               return { error: "New password must be at least 6 characters" }
  if (next !== confirm)              return { error: "Passwords do not match" }

  const user = await prisma.user.findUnique({ where: { id: session.user.id } })

  if (!user?.password) {
    return { error: "Your account uses Google sign-in — password cannot be changed here" }
  }

  const valid = await bcrypt.compare(current, user.password)
  if (!valid) return { error: "Current password is incorrect" }

  const hashed = await bcrypt.hash(next, 12)
  await prisma.user.update({
    where: { id: session.user.id },
    data:  { password: hashed },
  })

  return { success: "Password updated successfully" }
}
