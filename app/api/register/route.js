import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"

export async function POST(request) {
  const body = await request.json()
  const { name, email, password } = body

  if (!name || !email || !password) {
    return NextResponse.json({ error: "Sab fields required hain." }, { status: 400 })
  }

  if (password.length < 6) {
    return NextResponse.json({ error: "Password kam az kam 6 characters ka hona chahiye." }, { status: 400 })
  }

  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    return NextResponse.json({ error: "Ye email already registered hai." }, { status: 409 })
  }

  const hashed = await bcrypt.hash(password, 12)

  const user = await prisma.user.create({
    data: { name, email, password: hashed },
    select: { id: true, email: true, name: true },
  })

  return NextResponse.json({ success: true, user })
}
