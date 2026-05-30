import { Inter } from "next/font/google"
import { ThemeProvider } from "next-themes"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { SmoothScroll } from "@/components/SmoothScroll"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata = {
  title: {
    default: "DevOnix — Learn Web Dev, Backend & DevOps",
    template: "%s | DevOnix",
  },
  description:
    "A comprehensive learning platform covering HTML, CSS, JavaScript, React, Next.js, Node.js, databases, Docker, Kubernetes, and DevOps with interactive quizzes.",
  keywords: ["web development", "learn", "javascript", "react", "nodejs", "docker", "kubernetes", "devops"],
  authors: [{ name: "DevOnix" }],
  creator: "DevOnix",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_URL,
    title: "DevOnix — Learn Web Dev, Backend & DevOps",
    description: "Master web development with concise explanations and interactive quizzes.",
    siteName: "DevOnix",
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <SmoothScroll>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  )
}
