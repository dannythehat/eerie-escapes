'use client';

import Link from 'next/link';
import { MapPin, Clock, Star } from 'lucide-react';

interface Holiday {
  id: string;
  title: string;
  location: string;
  price: number;
  duration: number;
  image: string;
  rating: number;
  reviewCount: number;
  theme: string;
}

interface RelatedHolidaysProps {
  holidays: Holiday[];
  currentHolidayId: string;
}

export function RelatedHolidays({ holidays, currentHolidayId }: RelatedHolidaysProps) {
  const relatedHolidays = holidays.filter((h) => h.id !== currentHolidayId).slice(0, 3);

  if (relatedHolidays.length === 0) {
    return null;
  }

  return (
    <div className="bg-gray-900 border border-red-900/30 rounded-xl p-8">
      <h2 className="text-3xl font-bold text-white mb-6">
        You Might Also Like
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {relatedHolidays.map((holiday) => (
          <Link
            key={holiday.id}
            href={`/holidays/${holiday.id}`}
            className="group block bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-red-900/50 transition-all duration-300 hover:transform hover:scale-105"
          >
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={holiday.image}
                alt={holiday.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
              
              {/* Theme Badge */}
              <div className="absolute top-3 right-3">
                <span className="bg-red-600/90 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {holiday.theme}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-red-500 transition-colors duration-200">
                {holiday.title}
              </h3>

              {/* Location */}
              <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                <MapPin className="w-4 h-4" />
                <span>{holiday.location}</span>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                  <span className="text-white font-semibold">{holiday.rating}</span>
                </div>
                <span className="text-gray-400 text-sm">
                  ({holiday.reviewCount} reviews)
                </span>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-700">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span>{holiday.duration} days</span>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-400">From</div>
                  <div className="text-xl font-bold text-white">
                    ${holiday.price}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* View All Link */}
      <div className="mt-6 text-center">
        <Link
          href="/holidays"
          className="inline-flex items-center gap-2 text-red-500 hover:text-red-400 font-semibold transition-colors duration-200"
        >
          View all holidays
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
}
