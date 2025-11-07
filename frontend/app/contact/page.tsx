'use client'

import { useState } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
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
        name: '',
        email: '',
        subject: '',
        message: ''
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
            Contact Us
          </h1>
          <p className="text-xl text-gray-300 text-center max-w-3xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-1 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-blood-500 mb-6">Get In Touch</h2>
                <p className="text-gray-400 mb-8">
                  Whether you're a traveler with questions or a potential partner, we're here to help.
                </p>
              </div>

              {/* Contact Methods */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blood-900/20 rounded-lg flex items-center justify-center text-blood-500 text-xl">
                    📧
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-blood-400 mb-1">Email</h3>
                    <a href="mailto:hello@eerieescapes.com" className="text-gray-400 hover:text-blood-500 transition-colors">
                      hello@eerieescapes.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blood-900/20 rounded-lg flex items-center justify-center text-blood-500 text-xl">
                    💬
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-blood-400 mb-1">Live Chat</h3>
                    <p className="text-gray-400">
                      Available Mon-Fri, 9am-6pm EST
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blood-900/20 rounded-lg flex items-center justify-center text-blood-500 text-xl">
                    📱
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-blood-400 mb-1">Social Media</h3>
                    <div className="flex gap-3 mt-2">
                      <a href="#" className="text-gray-400 hover:text-blood-500 transition-colors">
                        Instagram
                      </a>
                      <span className="text-gray-600">•</span>
                      <a href="#" className="text-gray-400 hover:text-blood-500 transition-colors">
                        Twitter
                      </a>
                      <span className="text-gray-600">•</span>
                      <a href="#" className="text-gray-400 hover:text-blood-500 transition-colors">
                        Facebook
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Response Time */}
              <div className="bg-midnight-800 border border-blood-900/20 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blood-400 mb-2">Response Time</h3>
                <p className="text-gray-400 text-sm">
                  We typically respond to all inquiries within 24 hours during business days. 
                  For urgent matters, please use our live chat feature.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-midnight-800 border border-blood-900/20 rounded-lg p-8">
                <h2 className="text-2xl font-bold text-blood-500 mb-6">Send Us a Message</h2>

                {submitStatus === 'success' && (
                  <div className="mb-6 p-4 bg-green-900/20 border border-green-500/50 rounded-lg text-green-400">
                    Thank you for your message! We'll get back to you within 24 hours.
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 bg-midnight-900 border border-blood-900/20 rounded-md text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blood-500"
                        placeholder="John Doe"
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
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-midnight-900 border border-blood-900/20 rounded-md text-gray-300 focus:outline-none focus:ring-2 focus:ring-blood-500"
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="booking">Booking Question</option>
                      <option value="partner">Partnership Inquiry</option>
                      <option value="technical">Technical Support</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={8}
                      className="w-full px-4 py-2 bg-midnight-900 border border-blood-900/20 rounded-md text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blood-500"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center rounded-md bg-blood-600 px-6 py-3 text-base font-medium text-white hover:bg-blood-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-midnight-900/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-blood-500 mb-4 text-center">Quick Answers</h2>
            <p className="text-gray-400 text-center mb-12">
              Looking for quick answers? Check out these frequently asked questions.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-midnight-800 border border-blood-900/20 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blood-400 mb-2">How do I book an experience?</h3>
                <p className="text-gray-400 text-sm">
                  Browse our holidays, select your dates, and complete the booking form. You can pay in full 
                  or choose our flexible installment option.
                </p>
              </div>

              <div className="bg-midnight-800 border border-blood-900/20 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blood-400 mb-2">What's your cancellation policy?</h3>
                <p className="text-gray-400 text-sm">
                  Cancellation policies vary by experience. Most offer full refunds up to 30 days before 
                  the experience date. Check individual listings for details.
                </p>
              </div>

              <div className="bg-midnight-800 border border-blood-900/20 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blood-400 mb-2">Are experiences suitable for children?</h3>
                <p className="text-gray-400 text-sm">
                  Age recommendations are listed on each experience page. Many are adults-only, while 
                  others are family-friendly. Always check before booking.
                </p>
              </div>

              <div className="bg-midnight-800 border border-blood-900/20 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blood-400 mb-2">How do I become a partner?</h3>
                <p className="text-gray-400 text-sm">
                  Visit our <a href="/partners" className="text-blood-500 hover:underline">Partner Portal</a> and 
                  fill out the application form. We'll review and get back to you within 2-3 business days.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Resources */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-blood-500 mb-8 text-center">Other Ways to Connect</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <a
                href="/about"
                className="bg-midnight-800 border border-blood-900/20 rounded-lg p-6 text-center hover:border-blood-500/50 transition-colors group"
              >
                <div className="text-4xl mb-3">📖</div>
                <h3 className="text-lg font-semibold text-blood-400 mb-2 group-hover:text-blood-500 transition-colors">
                  About Us
                </h3>
                <p className="text-gray-400 text-sm">
                  Learn more about our story and mission
                </p>
              </a>

              <a
                href="/partners"
                className="bg-midnight-800 border border-blood-900/20 rounded-lg p-6 text-center hover:border-blood-500/50 transition-colors group"
              >
                <div className="text-4xl mb-3">🤝</div>
                <h3 className="text-lg font-semibold text-blood-400 mb-2 group-hover:text-blood-500 transition-colors">
                  Partner With Us
                </h3>
                <p className="text-gray-400 text-sm">
                  Join our network of experience providers
                </p>
              </a>

              <a
                href="/holidays"
                className="bg-midnight-800 border border-blood-900/20 rounded-lg p-6 text-center hover:border-blood-500/50 transition-colors group"
              >
                <div className="text-4xl mb-3">🎃</div>
                <h3 className="text-lg font-semibold text-blood-400 mb-2 group-hover:text-blood-500 transition-colors">
                  Browse Experiences
                </h3>
                <p className="text-gray-400 text-sm">
                  Explore our horror travel offerings
                </p>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
