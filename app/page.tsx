import { HeroSection } from '@/components/homepage/HeroSection'
import { MarqueeBanner } from '@/components/homepage/MarqueeBanner'
import { FeaturedProducts } from '@/components/homepage/FeaturedProducts'
import { StorySection } from '@/components/homepage/StorySection'
import { GemstoneShowcase } from '@/components/homepage/GemstoneShowcase'
import { TestimonialsSection } from '@/components/homepage/TestimonialsSection'
import { CTASection } from '@/components/homepage/CTASection'
import { TrustBadges } from '@/components/homepage/TrustBadges'
import { NewsletterSection } from '@/components/homepage/NewsletterSection'
import { FeaturedCollection, CategoryShowcase } from '@/components/products/ProductsGrid'
import CollectionsPreview from '@/components/products/CollectionsPreview'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-brand-black">
      <HeroSection />
      <MarqueeBanner />
      <TrustBadges />
      <FeaturedCollection />
      <CollectionsPreview />
      <FeaturedProducts />
      <StorySection />
      <CategoryShowcase />
      <GemstoneShowcase />
      <TestimonialsSection />
      <NewsletterSection />
      <CTASection />
    </main>
  )
}
