import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request, { params }) {
  try {
    const { slug } = await params
    const topic = await prisma.topic.findUnique({
      where: { slug },
      include: {
        questions: {
          orderBy: { order: "asc" },
        },
      },
    })

    if (!topic) {
      return NextResponse.json({ error: "Topic not found" }, { status: 404 })
    }

    return NextResponse.json({ questions: topic.questions })
  } catch (error) {
    console.error("GET /api/topics/[slug]/questions error:", error)
    return NextResponse.json({ error: "Failed to fetch questions" }, { status: 500 })
  }
}
