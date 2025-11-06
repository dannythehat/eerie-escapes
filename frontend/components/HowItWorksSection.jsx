'use client';

import { motion } from 'framer-motion';
import { Search, Calendar, CreditCard, Plane } from 'lucide-react';

const steps = [
  {
    id: 1,
    icon: Search,
    title: 'Discover Your Nightmare',
    description: 'Browse our curated collection of spine-chilling experiences from around the world. Filter by location, theme, or intensity level.',
  },
  {
    id: 2,
    icon: Calendar,
    title: 'Choose Your Dates',
    description: 'Select your preferred travel dates and check availability. Many experiences offer year-round bookings with flexible scheduling.',
  },
  {
    id: 3,
    icon: CreditCard,
    title: 'Secure Your Spot',
    description: 'Book with confidence using our secure payment system. Choose from one-time payment or flexible monthly installments.',
  },
  {
    id: 4,
    icon: Plane,
    title: 'Embark on Terror',
    description: 'Receive your detailed itinerary and prepare for your adventure. Our team provides 24/7 support throughout your journey.',
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-20 bg-black relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-500 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-700 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            How It <span className="text-red-500">Works</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Four simple steps to your most terrifying adventure yet
          </p>
        </motion.div>

        {/* Steps */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative"
              >
                {/* Connector Line (hidden on mobile, shown on desktop) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-[60%] w-full h-0.5 bg-gradient-to-r from-red-500 to-transparent" />
                )}

                {/* Step Card */}
                <div className="relative bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-8 hover:border-red-900/50 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20 group">
                  {/* Step Number */}
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-red-500/50">
                    {step.id}
                  </div>

                  {/* Icon */}
                  <div className="mb-6 inline-flex p-4 bg-red-500/10 rounded-2xl group-hover:bg-red-500/20 transition-colors">
                    <step.icon className="w-8 h-8 text-red-500" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-8 bg-gradient-to-r from-gray-900 via-black to-gray-900 border border-gray-800 rounded-2xl p-8">
            <div className="text-center sm:text-left">
              <p className="text-2xl font-bold text-white mb-2">
                Need Help Planning?
              </p>
              <p className="text-gray-400">
                Our horror travel experts are here to help you craft the perfect nightmare
              </p>
            </div>
            <a
              href="/contact"
              className="whitespace-nowrap bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/50"
            >
              Contact Us
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
