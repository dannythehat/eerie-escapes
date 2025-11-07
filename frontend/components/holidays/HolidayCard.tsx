'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Clock, Star, TrendingUp } from 'lucide-react';

interface Holiday {
  id: string;
  title: string;
  location: string;
  price: number;
  duration: number;
  difficulty: string;
  theme: string;
  image: string;
  rating: number;
  reviewCount: number;
  startDate: string;
}

interface HolidayCardProps {
  holiday: Holiday;
  view: 'grid' | 'list';
}

export function HolidayCard({ holiday, view }: HolidayCardProps) {
  const difficultyColors = {
    easy: 'bg-green-500/20 text-green-400 border-green-500/30',
    moderate: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    challenging: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    extreme: 'bg-red-500/20 text-red-400 border-red-500/30',
  };

  if (view === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Link href={`/holidays/${holiday.id}`}>
          <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden hover:border-red-500/50 transition-all duration-300 group">
            <div className="flex flex-col md:flex-row">
              {/* Image */}
              <div className="relative w-full md:w-80 h-64 md:h-auto overflow-hidden">
                <Image
                  src={holiday.image}
                  alt={holiday.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                    difficultyColors[holiday.difficulty.toLowerCase() as keyof typeof difficultyColors]
                  }`}>
                    {holiday.difficulty}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-red-500 transition-colors">
                      {holiday.title}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-400 mb-2">
                      <MapPin className="w-4 h-4" />
                      <span>{holiday.location}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-red-500">
                      ${holiday.price.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-400">per person</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 mb-4">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{new Date(holiday.startDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{holiday.duration} days</span>
                  </div>
                  <div className="flex items-center gap-2 text-yellow-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-semibold">{holiday.rating}</span>
                    <span className="text-gray-400 text-sm">({holiday.reviewCount} reviews)</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-red-500/10 text-red-400 rounded-full text-sm border border-red-500/30">
                    {holiday.theme}
                  </span>
                  <button className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  // Grid View
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -8 }}
    >
      <Link href={`/holidays/${holiday.id}`}>
        <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden hover:border-red-500/50 transition-all duration-300 group h-full flex flex-col">
          {/* Image */}
          <div className="relative h-56 overflow-hidden">
            <Image
              src={holiday.image}
              alt={holiday.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute top-4 left-4">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                difficultyColors[holiday.difficulty.toLowerCase() as keyof typeof difficultyColors]
              }`}>
                {holiday.difficulty}
              </span>
            </div>
            <div className="absolute top-4 right-4">
              <div className="flex items-center gap-1 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-full">
                <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                <span className="text-white text-sm font-semibold">{holiday.rating}</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-5 flex-1 flex flex-col">
            <div className="mb-3">
              <span className="px-3 py-1 bg-red-500/10 text-red-400 rounded-full text-xs border border-red-500/30">
                {holiday.theme}
              </span>
            </div>

            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-500 transition-colors line-clamp-2">
              {holiday.title}
            </h3>

            <div className="flex items-center gap-2 text-gray-400 mb-3">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{holiday.location}</span>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{new Date(holiday.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{holiday.duration}d</span>
              </div>
            </div>

            <div className="mt-auto pt-4 border-t border-gray-800 flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-red-500">
                  ${holiday.price.toLocaleString()}
                </div>
                <div className="text-xs text-gray-400">per person</div>
              </div>
              <div className="text-sm text-gray-400">
                {holiday.reviewCount} reviews
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
