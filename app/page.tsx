import { HeroSection } from '@/components/homepage/HeroSection'
import { FeaturedProducts } from '@/components/homepage/FeaturedProducts'
import { StorySection } from '@/components/homepage/StorySection'
import { GemstoneShowcase } from '@/components/homepage/GemstoneShowcase'
import { TestimonialsSection } from '@/components/homepage/TestimonialsSection'
import { CTASection } from '@/components/homepage/CTASection'
import { TrustBadges } from '@/components/homepage/TrustBadges'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-brand-black">
      <HeroSection />
      <TrustBadges />
      <FeaturedProducts />
      <StorySection />
      <GemstoneShowcase />
      <TestimonialsSection />
      <CTASection />
    </main>
  )
}
