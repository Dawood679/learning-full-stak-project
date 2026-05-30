import { HeroSection }    from "@/components/landing/HeroSection"
import { MarqueeBanner }  from "@/components/landing/MarqueeBanner"
import { AnimatedStats }  from "@/components/landing/AnimatedStats"
import { FeaturesSection } from "@/components/landing/FeaturesSection"
import { TopicsShowcase } from "@/components/landing/TopicsShowcase"
import { CTASection }     from "@/components/landing/CTASection"
import { LoadingScreen }  from "@/components/landing/LoadingScreen"

export const metadata = {
  title: "DevOnix — Learn Web Dev, Backend & DevOps",
  description:
    "Master full-stack development with 24 topics and 170+ quiz questions. From HTML to Kubernetes.",
}

export default function HomePage() {
  return (
    <>
      {/* Intro loading counter — only on first visit, scrolls off automatically */}
      <LoadingScreen />

      <HeroSection />

      {/* Infinite scrolling tech marquee */}
      <MarqueeBanner />

      {/* Stats with count-up animation on scroll */}
      <AnimatedStats />

      <FeaturesSection />
      <TopicsShowcase />
      <CTASection />
    </>
  )
}
