export const nextjsContent = {
  slug: "nextjs",
  briefDescription: [
    "Next.js is a React framework that provides server-side rendering (SSR), static site generation (SSG), API routes, file-based routing, and image optimization out of the box — production-ready React applications with zero config.",
    "The App Router (introduced in Next.js 13) uses React Server Components by default. Server Components run only on the server — they can fetch data directly, access the filesystem, and reduce client bundle size significantly.",
    "Next.js supports multiple rendering strategies per page: Static Generation (generateStaticParams), Server-Side Rendering (dynamic), Incremental Static Regeneration (revalidate), and Client-Side Rendering ('use client').",
  ],
  keyConcepts: [
    "App Router vs Pages Router architecture",
    "Server Components vs Client Components ('use client')",
    "File-based routing: folders become routes, page.jsx is the entry",
    "Layouts: layout.jsx wraps all nested pages",
    "Data fetching: fetch() in Server Components with cache options",
    "generateStaticParams for static route generation",
    "Route Groups (parentheses) and Parallel Routes",
    "next/image, next/link, next/font for optimization",
  ],
  codeExample: {
    language: "jsx",
    title: "Server Component with Data Fetching",
    code: `// app/products/[id]/page.jsx — Server Component
export async function generateStaticParams() {
  const products = await fetch('/api/products').then(r => r.json())
  return products.map(p => ({ id: String(p.id) }))
}

export default async function ProductPage({ params }) {
  // Direct DB query or API call — no useEffect needed
  const product = await prisma.product.findUnique({
    where: { id: params.id }
  })

  if (!product) notFound()

  return (
    <main>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      {/* Client Component for interactive parts */}
      <AddToCartButton productId={product.id} />
    </main>
  )
}

// Metadata API
export async function generateMetadata({ params }) {
  const product = await getProduct(params.id)
  return { title: product.name, description: product.description }
}`,
  },
}
