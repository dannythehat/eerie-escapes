'use client'

import { useState } from 'react'

export default function PartnersPage() {
  const [formData, setFormData] = useState({
    businessName: '',
    contactName: '',
    email: '',
    phone: '',
    website: '',
    businessType: '',
    description: '',
    location: '',
    experienceTypes: [] as string[],
    agreeToTerms: false
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData(prev => ({ ...prev, [name]: checked }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleExperienceTypeChange = (type: string) => {
    setFormData(prev => ({
      ...prev,
      experienceTypes: prev.experienceTypes.includes(type)
        ? prev.experienceTypes.filter(t => t !== type)
        : [...prev.experienceTypes, type]
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitStatus('success')
      // Reset form
      setFormData({
        businessName: '',
        contactName: '',
        email: '',
        phone: '',
        website: '',
        businessType: '',
        description: '',
        location: '',
        experienceTypes: [],
        agreeToTerms: false
      })
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-midnight-950">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blood-900/20 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-blood-500 mb-6 text-center">
            Partner With Us
          </h1>
          <p className="text-xl text-gray-300 text-center max-w-3xl mx-auto">
            Join our network of horror experience providers and reach thousands of thrill-seekers worldwide
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-midnight-900/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-blood-500 mb-12 text-center">Why Partner With Eerie Escapes?</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-midnight-800 border border-blood-900/20 rounded-lg p-6 hover:border-blood-500/50 transition-colors">
                <div className="text-blood-500 text-4xl mb-4">🌍</div>
                <h3 className="text-xl font-semibold text-blood-400 mb-3">Global Audience</h3>
                <p className="text-gray-400">
                  Access to thousands of horror enthusiasts actively seeking unique experiences worldwide.
                </p>
              </div>

              <div className="bg-midnight-800 border border-blood-900/20 rounded-lg p-6 hover:border-blood-500/50 transition-colors">
                <div className="text-blood-500 text-4xl mb-4">💳</div>
                <h3 className="text-xl font-semibold text-blood-400 mb-3">Automated Payments</h3>
                <p className="text-gray-400">
                  Secure, automated booking and payment processing with flexible installment options for customers.
                </p>
              </div>

              <div className="bg-midnight-800 border border-blood-900/20 rounded-lg p-6 hover:border-blood-500/50 transition-colors">
                <div className="text-blood-500 text-4xl mb-4">📈</div>
                <h3 className="text-xl font-semibold text-blood-400 mb-3">Marketing Support</h3>
                <p className="text-gray-400">
                  Professional photography, content creation, and promotion across our marketing channels.
                </p>
              </div>

              <div className="bg-midnight-800 border border-blood-900/20 rounded-lg p-6 hover:border-blood-500/50 transition-colors">
                <div className="text-blood-500 text-4xl mb-4">📊</div>
                <h3 className="text-xl font-semibold text-blood-400 mb-3">Partner Dashboard</h3>
                <p className="text-gray-400">
                  Comprehensive dashboard to manage listings, bookings, availability, and track performance.
                </p>
              </div>

              <div className="bg-midnight-800 border border-blood-900/20 rounded-lg p-6 hover:border-blood-500/50 transition-colors">
                <div className="text-blood-500 text-4xl mb-4">💰</div>
                <h3 className="text-xl font-semibold text-blood-400 mb-3">Competitive Rates</h3>
                <p className="text-gray-400">
                  Industry-leading commission rates with transparent pricing and no hidden fees.
                </p>
              </div>

              <div className="bg-midnight-800 border border-blood-900/20 rounded-lg p-6 hover:border-blood-500/50 transition-colors">
                <div className="text-blood-500 text-4xl mb-4">🤝</div>
                <h3 className="text-xl font-semibold text-blood-400 mb-3">Dedicated Support</h3>
                <p className="text-gray-400">
                  Personal account manager and 24/7 support to help you succeed on our platform.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-blood-500 mb-12 text-center">How It Works</h2>
            
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-blood-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-blood-400 mb-2">Apply to Join</h3>
                  <p className="text-gray-400">
                    Fill out our partner application form below. We'll review your submission within 2-3 business days.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-blood-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-blood-400 mb-2">Get Verified</h3>
                  <p className="text-gray-400">
                    Our team will verify your business and schedule a brief onboarding call to discuss your experiences.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-blood-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-blood-400 mb-2">Create Listings</h3>
                  <p className="text-gray-400">
                    Use our partner dashboard to create compelling listings with photos, descriptions, pricing, and availability.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-blood-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-blood-400 mb-2">Start Earning</h3>
                  <p className="text-gray-400">
                    Once approved, your experiences go live. Receive bookings, manage customers, and grow your business.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Signup Form */}
      <section className="py-16 bg-midnight-900/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-blood-500 mb-8 text-center">Partner Application Form</h2>
            <p className="text-gray-400 text-center mb-12">
              Ready to join? Fill out the form below and we'll get back to you within 2-3 business days.
            </p>

            {submitStatus === 'success' && (
              <div className="mb-8 p-4 bg-green-900/20 border border-green-500/50 rounded-lg text-green-400">
                Thank you for your application! We'll review it and get back to you within 2-3 business days.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 bg-midnight-800 border border-blood-900/20 rounded-lg p-8">
              {/* Business Information */}
              <div>
                <h3 className="text-xl font-semibold text-blood-400 mb-4">Business Information</h3>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="businessName" className="block text-sm font-medium text-gray-300 mb-2">
                      Business Name *
                    </label>
                    <input
                      type="text"
                      id="businessName"
                      name="businessName"
                      required
                      value={formData.businessName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-midnight-900 border border-blood-900/20 rounded-md text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blood-500"
                      placeholder="Your business name"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contactName" className="block text-sm font-medium text-gray-300 mb-2">
                        Contact Name *
                      </label>
                      <input
                        type="text"
                        id="contactName"
                        name="contactName"
                        required
                        value={formData.contactName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-midnight-900 border border-blood-900/20 rounded-md text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blood-500"
                        placeholder="Your name"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-midnight-900 border border-blood-900/20 rounded-md text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blood-500"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-midnight-900 border border-blood-900/20 rounded-md text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blood-500"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>

                    <div>
                      <label htmlFor="website" className="block text-sm font-medium text-gray-300 mb-2">
                        Website
                      </label>
                      <input
                        type="url"
                        id="website"
                        name="website"
                        value={formData.website}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-midnight-900 border border-blood-900/20 rounded-md text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blood-500"
                        placeholder="https://yourwebsite.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="businessType" className="block text-sm font-medium text-gray-300 mb-2">
                        Business Type *
                      </label>
                      <select
                        id="businessType"
                        name="businessType"
                        required
                        value={formData.businessType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-midnight-900 border border-blood-900/20 rounded-md text-gray-300 focus:outline-none focus:ring-2 focus:ring-blood-500"
                      >
                        <option value="">Select type</option>
                        <option value="tour-operator">Tour Operator</option>
                        <option value="venue">Venue/Attraction</option>
                        <option value="accommodation">Accommodation</option>
                        <option value="event-organizer">Event Organizer</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="location" className="block text-sm font-medium text-gray-300 mb-2">
                        Primary Location *
                      </label>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        required
                        value={formData.location}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-midnight-900 border border-blood-900/20 rounded-md text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blood-500"
                        placeholder="City, Country"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Experience Types */}
              <div>
                <h3 className="text-xl font-semibold text-blood-400 mb-4">Experience Types</h3>
                <p className="text-sm text-gray-400 mb-4">Select all that apply to your offerings:</p>
                
                <div className="grid md:grid-cols-2 gap-3">
                  {[
                    'Haunted Tours',
                    'Ghost Hunting',
                    'Horror Festivals',
                    'True Crime Tours',
                    'Paranormal Investigation',
                    'Dark History Tours',
                    'Escape Rooms',
                    'Horror Accommodation',
                    'Macabre Museums',
                    'Cemetery Tours',
                    'Horror Film Locations',
                    'Other'
                  ].map(type => (
                    <label key={type} className="flex items-center gap-2 text-gray-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.experienceTypes.includes(type)}
                        onChange={() => handleExperienceTypeChange(type)}
                        className="w-4 h-4 bg-midnight-900 border-blood-900/20 rounded text-blood-600 focus:ring-blood-500"
                      />
                      <span className="text-sm">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                  Tell Us About Your Business *
                </label>
                <textarea
                  id="description"
                  name="description"
                  required
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={6}
                  className="w-full px-4 py-2 bg-midnight-900 border border-blood-900/20 rounded-md text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blood-500"
                  placeholder="Describe your horror experiences, what makes them unique, and why you'd be a great partner..."
                />
              </div>

              {/* Terms Agreement */}
              <div>
                <label className="flex items-start gap-3 text-gray-300 cursor-pointer">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    required
                    checked={formData.agreeToTerms}
                    onChange={handleInputChange}
                    className="mt-1 w-4 h-4 bg-midnight-900 border-blood-900/20 rounded text-blood-600 focus:ring-blood-500"
                  />
                  <span className="text-sm">
                    I agree to the Eerie Escapes Partner Terms & Conditions and understand that my application 
                    will be reviewed before approval. *
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center rounded-md bg-blood-600 px-6 py-3 text-base font-medium text-white hover:bg-blood-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-blood-500 mb-12 text-center">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div className="bg-midnight-800 border border-blood-900/20 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blood-400 mb-2">What are the commission rates?</h3>
                <p className="text-gray-400">
                  Our commission structure is competitive and transparent. Rates vary based on experience type 
                  and booking volume, typically ranging from 15-25%. We'll discuss specific rates during onboarding.
                </p>
              </div>

              <div className="bg-midnight-800 border border-blood-900/20 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blood-400 mb-2">How long does approval take?</h3>
                <p className="text-gray-400">
                  We review all applications within 2-3 business days. Once approved, you can start creating 
                  listings immediately and go live within a week.
                </p>
              </div>

              <div className="bg-midnight-800 border border-blood-900/20 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blood-400 mb-2">Do I need insurance?</h3>
                <p className="text-gray-400">
                  Yes, all partners must maintain appropriate liability insurance for their experiences. 
                  We can provide recommendations for insurance providers if needed.
                </p>
              </div>

              <div className="bg-midnight-800 border border-blood-900/20 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blood-400 mb-2">How do I receive payments?</h3>
                <p className="text-gray-400">
                  Payments are processed automatically and transferred to your account on a bi-weekly basis. 
                  We support multiple payment methods including bank transfer and PayPal.
                </p>
              </div>

              <div className="bg-midnight-800 border border-blood-900/20 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blood-400 mb-2">Can I manage my own availability?</h3>
                <p className="text-gray-400">
                  Absolutely! Our partner dashboard gives you full control over your calendar, pricing, 
                  and availability. Update anytime, and changes reflect instantly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gradient-to-b from-midnight-900/50 to-midnight-950">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-blood-500 mb-4">Still Have Questions?</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Our partnership team is here to help. Reach out and we'll answer any questions you have.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center rounded-md bg-midnight-800 border border-blood-500 px-8 py-3 text-base font-medium text-blood-500 hover:bg-midnight-700 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </section>
    </div>
  )
}
