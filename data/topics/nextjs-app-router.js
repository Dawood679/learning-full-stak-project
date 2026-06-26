export const nextjsAppRouterContent = {
  slug: "nextjs-app-router",
  briefDescription: [
    "The Next.js App Router (introduced in Next.js 13, stable in 14+) uses the app/ directory and replaces the older pages/ directory approach. Every file named page.tsx inside app/ becomes a public route. Layouts (layout.tsx) wrap pages and persist across navigation — the root layout wraps your entire app and must include the <html> and <body> tags. Server Components are the default — they render on the server, never ship their code to the browser, and can directly access databases and secrets. Client Components are opted into with the 'use client' directive at the top of the file and run in the browser.",
    "Server-Side Rendering (SSR) means the HTML is generated on the server for each request. Static Site Generation (SSG) means pages are pre-built at deploy time. The App Router uses React's caching and revalidation instead of getServerSideProps/getStaticProps. In Server Components, you can fetch data directly with async/await — no useEffect needed. Use fetch() with Next.js cache options: fetch(url, { cache: 'no-store' }) for SSR (fresh on every request), fetch(url, { next: { revalidate: 60 } }) for ISR (cache for 60 seconds then regenerate), or fetch(url) for SSG (cached until redeployed).",
    "The App Router adds several special file conventions beyond page.tsx: loading.tsx (shown while a page loads — automatic Suspense boundary), error.tsx (error UI for the route segment), not-found.tsx (404 page), and template.tsx (like layout but creates a new instance on navigation). Route Groups (folders wrapped in parentheses like (auth)) let you organize files without affecting the URL. Parallel Routes (@folder) and Intercepting Routes (..) enable advanced patterns like modals and split-view UIs. API Routes in the App Router use route.ts files with exported GET, POST, etc. handler functions.",
  ],
  keyConcepts: [
    "app/page.tsx: creates a public route at the file's path in the app/ directory",
    "app/layout.tsx: persistent wrapper — root layout must include <html> and <body>",
    "Server Component (default): renders on server, no useState/useEffect, can access DB directly",
    "'use client' directive: opts a file into being a Client Component (runs in browser)",
    "fetch() with { cache: 'no-store' }: always fetch fresh (SSR behavior)",
    "fetch() with { next: { revalidate: 60 } }: revalidate cache every 60 seconds (ISR)",
    "fetch() with default options: static fetch, cached until redeployment (SSG)",
    "loading.tsx: automatic Suspense boundary — shows while page.tsx loads",
    "error.tsx: 'use client' component — catches errors in the route segment",
    "Route groups: (folder) — organizes files without adding to URL path",
    "generateMetadata(): async function that returns SEO metadata for a page",
    "Route Handlers (route.ts): export GET/POST/etc. functions — replaces pages/api/",
  ],
  codeExample: {
    language: "jsx",
    title: "App Router — Server Component, Client Component, Data Fetching, Route Handler",
    code: `// ── app/layout.tsx — root layout ──
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <nav>/* Navbar — persists across all pages */</nav>
        <main>{children}</main>
      </body>
    </html>
  )
}

// ── app/blog/page.tsx — Server Component (default) ──
// Runs on server — can directly query DB, no client bundle
async function getPosts() {
  const res = await fetch('https://api.example.com/posts', {
    next: { revalidate: 60 },  // ISR: cache 60 seconds, then regenerate
  })
  return res.json()
}

export async function generateMetadata() {
  return { title: 'Blog | DevOnix', description: 'Learn with us' }
}

export default async function BlogPage() {
  const posts = await getPosts()  // await directly — no useEffect!

  return (
    <div>
      <h1>Latest Posts</h1>
      {posts.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </article>
      ))}
    </div>
  )
}

// ── app/blog/loading.tsx — shown while page loads ──
export default function Loading() {
  return <div className="skeleton-list">Loading posts...</div>
}

// ── app/blog/error.tsx — must be a Client Component ──
'use client'
export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
      <button onClick={reset}>Try again</button>
    </div>
  )
}

// ── components/LikeButton.tsx — Client Component ──
'use client'
import { useState } from 'react'

export default function LikeButton({ postId, initialLikes }: { postId: number; initialLikes: number }) {
  const [likes, setLikes] = useState(initialLikes)

  async function handleLike() {
    const res = await fetch(\`/api/posts/\${postId}/like\`, { method: 'POST' })
    const data = await res.json()
    setLikes(data.likes)
  }

  return <button onClick={handleLike}>❤️ {likes}</button>
}

// ── Server + Client Component composition ──
// app/blog/[id]/page.tsx — Server Component
export default async function PostPage({ params }: { params: { id: string } }) {
  const post = await fetch(\`https://api.example.com/posts/\${params.id}\`, {
    cache: 'no-store',  // fresh SSR — different user might see different content
  }).then(r => r.json())

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      {/* Client Component inside Server Component — passes serializable props */}
      <LikeButton postId={post.id} initialLikes={post.likes} />
    </article>
  )
}

// ── app/api/posts/[id]/like/route.ts — Route Handler ──
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const post = await prisma.post.update({
    where: { id: params.id },
    data: { likes: { increment: 1 } },
  })
  return NextResponse.json({ likes: post.likes })
}`,
  },
}
