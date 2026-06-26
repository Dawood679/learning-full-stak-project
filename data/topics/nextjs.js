export const nextjsContent = {
  slug: "nextjs",
  briefDescription: [
    "Next.js is a React framework that adds server-side rendering, static site generation, file-based routing, API routes, image optimization, and more — out of the box. The App Router (app/ directory) maps folders directly to URL segments: the folder 'products' becomes the route /products, and a page.jsx file inside it defines what's rendered there. layout.jsx wraps all pages in its segment and persists across navigation — ideal for navbars, sidebars, and providers.",
    "Next.js has two component types. Server Components (default) run only on the server, can directly access databases and private APIs, and never send their code to the browser. Client Components need the 'use client' directive at the top of the file and support React hooks, event listeners, and browser APIs (localStorage, window). You can nest Client Components inside Server Components to get the best of both worlds.",
    "Data fetching in Next.js uses native fetch() with caching options: { cache: 'force-cache' } for static, { cache: 'no-store' } for fully dynamic, and { next: { revalidate: 60 } } for ISR (Incremental Static Regeneration — serves stale while regenerating in background). The next/image component automatically optimizes images (lazy load, WebP conversion, responsive srcset). next/link enables client-side navigation with automatic prefetching.",
  ],
  keyConcepts: [
    "File-based routing: folders in app/ = URL segments, page.jsx = route component",
    "layout.jsx: wraps child pages, persists across navigation, great for navbars/providers",
    "loading.jsx and error.jsx: automatic streaming UI for each route segment",
    "Server Components: render on server only, can access DB/secrets, no JS sent to client",
    "Client Components: 'use client' directive, supports hooks, events, browser APIs",
    "Dynamic routes: [id]/page.jsx — access via params.id in page props",
    "generateStaticParams: pre-renders dynamic routes at build time (SSG for dynamic paths)",
    "fetch() cache options: force-cache (static), no-store (dynamic), revalidate:N (ISR)",
    "Server Actions: 'use server' async functions called from forms — no API route needed",
    "next/image: automatic lazy loading, WebP/AVIF format, responsive srcset generation",
    "next/link: client-side navigation with prefetching on hover",
    "Deployment: Vercel (zero config), Docker, or static export with 'next export'",
  ],
  codeExample: {
    language: "jsx",
    title: "Next.js App Router: Server Component + Dynamic Route + Server Action",
    code: `// app/layout.jsx — Root layout (persists across all pages)
export const metadata = { title: 'DevOnix LMS', description: 'Learn coding step by step' }

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav>
          <Link href="/">Home</Link>
          <Link href="/topics">Topics</Link>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  )
}

// app/topics/page.jsx — Server Component (reads DB directly)
import { prisma } from '@/lib/prisma'

export default async function TopicsPage() {
  const topics = await prisma.topic.findMany({ orderBy: { order: 'asc' } })
  return (
    <div>
      <h1>All Topics</h1>
      {topics.map(t => (
        <Link key={t.id} href={\`/topics/\${t.slug}\`}>{t.title}</Link>
      ))}
    </div>
  )
}

// app/topics/[slug]/page.jsx — Dynamic route
export default async function TopicPage({ params }) {
  const { slug } = await params
  const topic = await prisma.topic.findUnique({ where: { slug } })
  if (!topic) notFound()
  return <div><h1>{topic.title}</h1><p>{topic.description}</p></div>
}

// generateStaticParams — pre-render all topic pages at build time
export async function generateStaticParams() {
  const topics = await prisma.topic.findMany({ select: { slug: true } })
  return topics.map(t => ({ slug: t.slug }))
}

// Server Action (no separate API route needed)
'use server'
async function submitEnrollment(formData) {
  const email = formData.get('email')
  await prisma.user.create({ data: { email } })
  redirect('/dashboard')
}`,
  },
}
