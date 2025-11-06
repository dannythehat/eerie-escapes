'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Calendar, DollarSign } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function FeaturedHolidaysCarousel({ holidays = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying || holidays.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % holidays.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, holidays.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + holidays.length) % holidays.length);
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % holidays.length);
    setIsAutoPlaying(false);
  };

  if (!holidays || holidays.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-400">No featured holidays available</p>
      </div>
    );
  }

  const currentHoliday = holidays[currentIndex];

  return (
    <section className="py-20 bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Featured <span className="text-red-500">Nightmares</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Handpicked spine-chilling experiences that will haunt your dreams
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative max-w-6xl mx-auto">
          {/* Main Slide */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="relative h-[600px] rounded-3xl overflow-hidden group"
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src={currentHoliday.coverImage || currentHoliday.images?.[0] || '/images/placeholder.jpg'}
                alt={currentHoliday.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative h-full flex flex-col justify-end p-8 md:p-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {/* Theme Badge */}
                <span className="inline-block px-4 py-2 bg-red-600/90 backdrop-blur-sm text-white text-sm font-semibold rounded-full mb-4">
                  {currentHoliday.theme}
                </span>

                {/* Title */}
                <h3 className="text-3xl md:text-5xl font-bold text-white mb-4">
                  {currentHoliday.title}
                </h3>

                {/* Description */}
                <p className="text-gray-300 text-lg mb-6 max-w-3xl line-clamp-2">
                  {currentHoliday.shortDescription || currentHoliday.description}
                </p>

                {/* Details */}
                <div className="flex flex-wrap gap-6 mb-6">
                  <div className="flex items-center gap-2 text-gray-300">
                    <MapPin className="w-5 h-5 text-red-500" />
                    <span>{currentHoliday.city}, {currentHoliday.country}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Calendar className="w-5 h-5 text-red-500" />
                    <span>{currentHoliday.durationDays} Days / {currentHoliday.durationNights} Nights</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <DollarSign className="w-5 h-5 text-red-500" />
                    <span>From ${currentHoliday.basePrice}</span>
                  </div>
                </div>

                {/* CTA Button */}
                <Link
                  href={`/holidays/${currentHoliday.slug}`}
                  className="inline-block bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/50"
                >
                  Explore This Nightmare
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {holidays.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-8 bg-red-500'
                    : 'w-2 bg-gray-600 hover:bg-gray-500'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
