"use server"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import bcrypt from "bcryptjs"
import { sendWelcomeEmail } from "@/lib/email"

export async function registerStudent(prevState, formData) {
  const session = await auth()
  if (session?.user?.role !== "ADMIN") return { error: "Unauthorized" }

  const name     = formData.get("name")?.trim()
  const email    = formData.get("email")?.trim().toLowerCase()
  const password = formData.get("password")
  const track    = formData.get("track")

  if (!name || !email || !password || !track)
    return { error: "Sab fields fill karo." }

  if (password.length < 6)
    return { error: "Password kam az kam 6 characters ka hona chahiye." }

  const validTracks = ["MERN_STACK", "FULL_STACK", "ADVANCED"]
  if (!validTracks.includes(track))
    return { error: "Invalid track." }

  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing)
    return { error: `Ye email already registered hai: ${email}` }

  const hashed = await bcrypt.hash(password, 12)

  await prisma.user.create({
    data: { name, email, password: hashed, track },
  })

  // Send welcome email — if email fails, account is still created
  try {
    await sendWelcomeEmail({ name, email, password, track })
  } catch (err) {
    console.error("Welcome email send nahi hui:", err)
    revalidatePath("/admin/tracks")
    return { success: true, name, emailSent: false }
  }

  revalidatePath("/admin/tracks")
  return { success: true, name, emailSent: true }
}

export async function addToTrack(prevState, formData) {
  const session = await auth()
  if (session?.user?.role !== "ADMIN") return { error: "Unauthorized" }

  const email = formData.get("email")?.trim().toLowerCase()
  const track = formData.get("track")

  if (!email) return { error: "Email is required" }

  const validTracks = ["MERN_STACK", "FULL_STACK", "ADVANCED"]
  if (!validTracks.includes(track)) return { error: "Invalid track type" }

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) return { error: `No account found for: ${email}` }
  if (user.role === "ADMIN") return { error: "Cannot assign a track to an admin account" }

  await prisma.user.update({ where: { email }, data: { track } })
  revalidatePath("/admin/tracks")
  return { success: true, name: user.name ?? email }
}

export async function removeFromTrack(prevState, formData) {
  const session = await auth()
  if (session?.user?.role !== "ADMIN") return { error: "Unauthorized" }

  const userId = formData.get("userId")
  if (!userId) return { error: "User ID required" }

  await prisma.user.update({ where: { id: userId }, data: { track: null } })
  revalidatePath("/admin/tracks")
  return { success: true }
}
