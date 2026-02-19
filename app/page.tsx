import { HeroSection } from '@/components/homepage/HeroSection'
import { TrustBadges } from '@/components/homepage/TrustBadges'
import { MarqueeBanner } from '@/components/homepage/MarqueeBanner'
import { StorySection } from '@/components/homepage/StorySection'
import { TestimonialsSection } from '@/components/homepage/TestimonialsSection'
import { CTASection } from '@/components/homepage/CTASection'
import { NewsletterSection } from '@/components/homepage/NewsletterSection'
import { FeaturedCollection, CategoryShowcase } from '@/components/products/ProductsGrid'
import CollectionsPreview from '@/components/products/CollectionsPreview'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-obsidian">
      <HeroSection />
      <TrustBadges />
      <FeaturedCollection />
      <MarqueeBanner />
      <CollectionsPreview />
      <StorySection />
      <CategoryShowcase />
      <TestimonialsSection />
      <NewsletterSection />
      <CTASection />
    </main>
  )
}
