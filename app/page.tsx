import { HeroSection } from '@/components/homepage/HeroSection'
import { ManifestoSection } from '@/components/homepage/ManifestoSection'
import { VaultSection } from '@/components/homepage/VaultSection'
import { CraftSection } from '@/components/homepage/CraftSection'
import { SocialProofSection } from '@/components/homepage/SocialProofSection'
import { GuaranteeSection } from '@/components/homepage/GuaranteeSection'
import { FinalCTASection } from '@/components/homepage/FinalCTASection'

export default function HomePage() {
  return (
    <main className="bg-void-black">
      <HeroSection />
      <ManifestoSection />
      <VaultSection />
      <CraftSection />
      <SocialProofSection />
      <GuaranteeSection />
      <FinalCTASection />
    </main>
  )
}
