import Image from 'next/image'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-midnight-950">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blood-900/20 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-blood-500 mb-6 text-center">
            About Eerie Escapes
          </h1>
          <p className="text-xl text-gray-300 text-center max-w-3xl mx-auto">
            Where Travel Meets Terror
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-midnight-900/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-blood-500 mb-8">Our Story</h2>
            <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
              <p>
                We are passionate entrepreneurs and horror enthusiasts who have spent years 
                exploring the chilling corners of the world and the macabre stories that captivate us. 
                From the haunted castles of Scotland to the eerie catacombs of Paris, from the 
                mysterious forests of Romania to the spine-tingling ghost tours of New Orleans, 
                we've experienced it all.
              </p>
              <p>
                Our journey began with a simple observation: while mainstream travel platforms 
                offered countless beach resorts and city tours, there was no dedicated space for 
                those of us who seek the darker, more thrilling side of travel. Horror enthusiasts 
                were scattered across forums, piecing together information from unreliable sources, 
                missing out on incredible experiences simply because they didn't know they existed.
              </p>
              <p>
                Combining our experience in automation, AI, and app development with our love for 
                spine-tingling travel, we created <span className="text-blood-500 font-semibold">Eerie Escapes</span> to 
                unite horror fans through unforgettable experiences. We leverage cutting-edge technology 
                to discover, curate, and present the world's most terrifying holidays in one hauntingly 
                beautiful platform.
              </p>
              <p>
                Our mission is simple: to bring the strangest, most eerie celebrations and holidays 
                worldwide into one comprehensive experience, making it easy for fellow horror lovers 
                to book their dream scares. Whether you're seeking paranormal investigations, true 
                crime tours, horror film festivals, or macabre cultural celebrations, we've got you covered.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-blood-500 mb-8">Our Mission & Values</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-midnight-800 border border-blood-900/20 rounded-lg p-6">
                <div className="text-blood-500 text-4xl mb-4">🎭</div>
                <h3 className="text-xl font-semibold text-blood-400 mb-3">Authenticity</h3>
                <p className="text-gray-400">
                  We curate only genuine, verified horror experiences. Every listing is thoroughly 
                  researched and vetted to ensure you get the real deal, not tourist traps.
                </p>
              </div>
              
              <div className="bg-midnight-800 border border-blood-900/20 rounded-lg p-6">
                <div className="text-blood-500 text-4xl mb-4">🌍</div>
                <h3 className="text-xl font-semibold text-blood-400 mb-3">Global Reach</h3>
                <p className="text-gray-400">
                  From well-known haunted locations to hidden gems, we cover horror experiences 
                  across every continent, bringing you the world's darkest destinations.
                </p>
              </div>
              
              <div className="bg-midnight-800 border border-blood-900/20 rounded-lg p-6">
                <div className="text-blood-500 text-4xl mb-4">🤖</div>
                <h3 className="text-xl font-semibold text-blood-400 mb-3">Innovation</h3>
                <p className="text-gray-400">
                  Using AI and automation, we continuously discover new experiences and keep our 
                  content fresh, ensuring you never miss the latest horror travel opportunities.
                </p>
              </div>
              
              <div className="bg-midnight-800 border border-blood-900/20 rounded-lg p-6">
                <div className="text-blood-500 text-4xl mb-4">👥</div>
                <h3 className="text-xl font-semibold text-blood-400 mb-3">Community</h3>
                <p className="text-gray-400">
                  We're building a global community of horror enthusiasts who share experiences, 
                  reviews, and recommendations, creating a trusted network of fellow thrill-seekers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-midnight-900/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-blood-500 mb-8 text-center">Meet The Team</h2>
            <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
              A small but passionate team of horror enthusiasts, developers, and travel experts 
              dedicated to bringing you the world's most terrifying experiences.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Team Member 1 */}
              <div className="bg-midnight-800 border border-blood-900/20 rounded-lg p-6 text-center hover:border-blood-500/50 transition-colors">
                <div className="w-24 h-24 bg-gradient-to-br from-blood-900 to-blood-700 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl">
                  👻
                </div>
                <h3 className="text-xl font-semibold text-blood-400 mb-2">Alex Darkwood</h3>
                <p className="text-blood-500 text-sm mb-3">Co-Founder & CEO</p>
                <p className="text-gray-400 text-sm">
                  Horror film enthusiast and tech entrepreneur with 10+ years in travel tech. 
                  Visited 50+ haunted locations worldwide.
                </p>
              </div>

              {/* Team Member 2 */}
              <div className="bg-midnight-800 border border-blood-900/20 rounded-lg p-6 text-center hover:border-blood-500/50 transition-colors">
                <div className="w-24 h-24 bg-gradient-to-br from-blood-900 to-blood-700 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl">
                  🦇
                </div>
                <h3 className="text-xl font-semibold text-blood-400 mb-2">Morgan Nightshade</h3>
                <p className="text-blood-500 text-sm mb-3">Co-Founder & CTO</p>
                <p className="text-gray-400 text-sm">
                  Full-stack developer and AI specialist. Paranormal investigator in spare time. 
                  Built the automation that powers our platform.
                </p>
              </div>

              {/* Team Member 3 */}
              <div className="bg-midnight-800 border border-blood-900/20 rounded-lg p-6 text-center hover:border-blood-500/50 transition-colors">
                <div className="w-24 h-24 bg-gradient-to-br from-blood-900 to-blood-700 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl">
                  🕷️
                </div>
                <h3 className="text-xl font-semibold text-blood-400 mb-2">Raven Blackwell</h3>
                <p className="text-blood-500 text-sm mb-3">Head of Content</p>
                <p className="text-gray-400 text-sm">
                  Travel writer specializing in dark tourism. Published author of "Macabre Journeys". 
                  Curates all our horror experiences.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-blood-500 mb-8 text-center">Why Choose Eerie Escapes?</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4 bg-midnight-800 border border-blood-900/20 rounded-lg p-6">
                <div className="text-blood-500 text-2xl flex-shrink-0">✓</div>
                <div>
                  <h3 className="text-lg font-semibold text-blood-400 mb-2">Curated by Horror Experts</h3>
                  <p className="text-gray-400">
                    Every experience is personally vetted by our team of horror enthusiasts who have 
                    actually visited these locations or thoroughly researched them.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-midnight-800 border border-blood-900/20 rounded-lg p-6">
                <div className="text-blood-500 text-2xl flex-shrink-0">✓</div>
                <div>
                  <h3 className="text-lg font-semibold text-blood-400 mb-2">Flexible Payment Options</h3>
                  <p className="text-gray-400">
                    Book your dream scare-cation with monthly installment plans. No need to wait – 
                    start planning your horror adventure today.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-midnight-800 border border-blood-900/20 rounded-lg p-6">
                <div className="text-blood-500 text-2xl flex-shrink-0">✓</div>
                <div>
                  <h3 className="text-lg font-semibold text-blood-400 mb-2">Comprehensive Information</h3>
                  <p className="text-gray-400">
                    Detailed itineraries, safety information, accommodation options, and insider tips 
                    for every experience. We leave no stone unturned.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-midnight-800 border border-blood-900/20 rounded-lg p-6">
                <div className="text-blood-500 text-2xl flex-shrink-0">✓</div>
                <div>
                  <h3 className="text-lg font-semibold text-blood-400 mb-2">Community-Driven Reviews</h3>
                  <p className="text-gray-400">
                    Read honest reviews from fellow horror enthusiasts and earn rewards for sharing 
                    your own experiences with the community.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-b from-midnight-900/50 to-midnight-950">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-blood-500 mb-4">Ready to Start Your Dark Journey?</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Join thousands of horror enthusiasts who have discovered their perfect scare-cation through Eerie Escapes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/holidays"
              className="inline-flex items-center justify-center rounded-md bg-blood-600 px-8 py-3 text-base font-medium text-white hover:bg-blood-700 transition-colors"
            >
              Explore Experiences
            </a>
            <a
              href="/partners"
              className="inline-flex items-center justify-center rounded-md bg-midnight-800 border border-blood-500 px-8 py-3 text-base font-medium text-blood-500 hover:bg-midnight-700 transition-colors"
            >
              Become a Partner
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
