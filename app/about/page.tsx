import { Award, Heart, Shield, Sparkles } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-900 via-purple-700 to-gold-600 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6">
            Our Story
          </h1>
          <p className="text-xl md:text-2xl text-purple-100 max-w-3xl">
            Crafting timeless pieces with the world's most precious gemstones
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-neutral-700 leading-relaxed mb-6">
              For over three decades, Rare Gems has been at the forefront of exceptional 
              jewelry craftsmanship. Our journey began with a simple vision: to bring the 
              world's most exquisite gemstones to those who appreciate true beauty and rarity.
            </p>
            <p className="text-lg text-neutral-700 leading-relaxed mb-6">
              Every piece in our collection tells a story—from the mines where rare gems 
              are discovered to the hands of master artisans who transform them into 
              wearable art. We source our gemstones directly from trusted suppliers across 
              the globe, ensuring authenticity, quality, and ethical practices.
            </p>
            <p className="text-lg text-neutral-700 leading-relaxed">
              Whether you're seeking a statement piece for a special occasion or an 
              investment-grade gemstone, our expert team is dedicated to helping you 
              find the perfect match.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-4xl font-bold text-center mb-12 gradient-text">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                <Sparkles className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-2">Authenticity</h3>
              <p className="text-neutral-600">
                Every gemstone is certified and comes with complete documentation
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gold-100 rounded-full mb-4">
                <Award className="h-8 w-8 text-gold-600" />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-2">Excellence</h3>
              <p className="text-neutral-600">
                Master craftsmanship in every piece we create
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                <Heart className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-2">Ethics</h3>
              <p className="text-neutral-600">
                Committed to responsible sourcing and sustainable practices
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gold-100 rounded-full mb-4">
                <Shield className="h-8 w-8 text-gold-600" />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-2">Trust</h3>
              <p className="text-neutral-600">
                Building lasting relationships with our valued clients
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-gold-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-4xl font-bold mb-6">
            Ready to Find Your Perfect Piece?
          </h2>
          <p className="text-xl mb-8">
            Explore our collection and discover the gemstone that speaks to you
          </p>
          <a href="/shop" className="btn-primary bg-white text-purple-600 hover:bg-neutral-100">
            Browse Collection
          </a>
        </div>
      </section>
    </div>
  )
}
