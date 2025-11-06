'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import Image from 'next/image';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Mitchell',
    location: 'London, UK',
    avatar: 'https://i.pravatar.cc/150?img=1',
    rating: 5,
    text: 'The Transylvania tour was absolutely terrifying in the best way possible! The castle overnight stay gave me chills I\'ll never forget. Eerie Escapes delivered an authentic horror experience.',
    trip: 'Dracula\'s Castle Tour',
  },
  {
    id: 2,
    name: 'Marcus Chen',
    location: 'Singapore',
    avatar: 'https://i.pravatar.cc/150?img=12',
    rating: 5,
    text: 'As a horror enthusiast, I\'ve always wanted to visit Salem. The witch trial reenactments were incredibly immersive. The guides were knowledgeable and the whole experience was spine-tingling.',
    trip: 'Salem Witch Trials Experience',
  },
  {
    id: 3,
    name: 'Elena Rodriguez',
    location: 'Barcelona, Spain',
    avatar: 'https://i.pravatar.cc/150?img=5',
    rating: 5,
    text: 'The Paris Catacombs overnight experience was surreal. Being surrounded by millions of skulls in complete darkness was both terrifying and beautiful. A once-in-a-lifetime experience!',
    trip: 'Paris Catacombs Overnight',
  },
  {
    id: 4,
    name: 'James O\'Connor',
    location: 'Dublin, Ireland',
    avatar: 'https://i.pravatar.cc/150?img=8',
    rating: 5,
    text: 'Edinburgh\'s underground vaults exceeded all expectations. The paranormal activity was real, and our guide\'s stories were captivating. Perfect for anyone who loves dark history.',
    trip: 'Edinburgh Underground Vaults',
  },
  {
    id: 5,
    name: 'Yuki Tanaka',
    location: 'Tokyo, Japan',
    avatar: 'https://i.pravatar.cc/150?img=9',
    rating: 5,
    text: 'Aokigahara Forest was hauntingly beautiful. The silence is deafening, and the history is profound. Our guide was respectful and informative. A deeply moving experience.',
    trip: 'Aokigahara Forest Tour',
  },
  {
    id: 6,
    name: 'Amanda Foster',
    location: 'New York, USA',
    avatar: 'https://i.pravatar.cc/150?img=10',
    rating: 5,
    text: 'Best horror vacation ever! The attention to detail, the authentic locations, and the professional guides made this trip unforgettable. Already booking my next nightmare!',
    trip: 'Multiple Tours',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('/images/pattern.png')] bg-repeat" />
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
            Tales from the <span className="text-red-500">Brave</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Hear from fellow thrill-seekers who dared to explore the dark side of travel
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gradient-to-br from-gray-900 via-gray-900 to-black border border-gray-800 rounded-2xl p-6 hover:border-red-900/50 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/10 group"
            >
              {/* Quote Icon */}
              <div className="mb-4">
                <Quote className="w-10 h-10 text-red-500/30 group-hover:text-red-500/50 transition-colors" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-red-500 text-red-500"
                  />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-300 mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* Trip Name */}
              <div className="mb-4 pb-4 border-b border-gray-800">
                <p className="text-sm text-red-400 font-semibold">
                  {testimonial.trip}
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-red-500/30">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-white font-semibold">{testimonial.name}</p>
                  <p className="text-gray-500 text-sm">{testimonial.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-gray-400 mb-4">Join thousands of brave travelers</p>
          <a
            href="/holidays"
            className="inline-block bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/50"
          >
            Start Your Journey
          </a>
        </motion.div>
      </div>
    </section>
  );
}
