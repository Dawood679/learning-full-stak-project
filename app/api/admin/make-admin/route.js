import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

// POST /api/admin/make-admin
// Body: { email, secret }
// Allows promoting a user to ADMIN using ADMIN_SECRET env var
export async function POST(request) {
  const body = await request.json()
  const { email, secret } = body

  if (!secret || secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 403 })
  }

  if (!email) {
    return NextResponse.json({ error: "Email required" }, { status: 400 })
  }

  const user = await prisma.user.update({
    where: { email },
    data: { role: "ADMIN" },
    select: { id: true, email: true, role: true },
  })

  return NextResponse.json({ success: true, user })
}
