'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Accommodation {
  name: string;
  type: string;
  description: string;
  amenities: string[];
  images: string[];
}

interface AccommodationDetailsProps {
  accommodation: Accommodation;
}

export default function AccommodationDetails({ accommodation }: AccommodationDetailsProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="my-12">
      <h2 className="text-3xl font-bold text-white mb-6">Where You'll Stay</h2>
      
      <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
        {/* Accommodation Images */}
        {accommodation.images && accommodation.images.length > 0 && (
          <div className="grid md:grid-cols-2 gap-4 p-6">
            {accommodation.images.map((image, index) => (
              <div
                key={index}
                className="relative h-64 rounded-lg overflow-hidden cursor-pointer group"
                onClick={() => setSelectedImage(index)}
              >
                <Image
                  src={image}
                  alt={`${accommodation.name} - Image ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
              </div>
            ))}
          </div>
        )}

        {/* Accommodation Info */}
        <div className="p-6 border-t border-gray-800">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">{accommodation.name}</h3>
              <p className="text-red-500 font-semibold">{accommodation.type}</p>
            </div>
            <div className="flex items-center gap-1">
              {[...Array(4)].map((_, i) => (
                <svg
                  key={i}
                  className="w-5 h-5 text-yellow-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>

          <p className="text-gray-300 mb-6 leading-relaxed">{accommodation.description}</p>

          {/* Amenities Grid */}
          <div>
            <h4 className="text-xl font-bold text-white mb-4">Amenities</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {accommodation.amenities.map((amenity, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 bg-gray-800 rounded-lg p-3 hover:bg-gray-750 transition-colors"
                >
                  <svg
                    className="w-5 h-5 text-green-500 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-300 text-sm">{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="p-6 bg-gray-800/50 border-t border-gray-800">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <svg
                className="w-6 h-6 text-red-500 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <h5 className="text-white font-semibold mb-1">Check-in</h5>
                <p className="text-gray-400 text-sm">After 3:00 PM</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <svg
                className="w-6 h-6 text-red-500 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <h5 className="text-white font-semibold mb-1">Check-out</h5>
                <p className="text-gray-400 text-sm">Before 11:00 AM</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <svg
                className="w-6 h-6 text-red-500 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <div>
                <h5 className="text-white font-semibold mb-1">Occupancy</h5>
                <p className="text-gray-400 text-sm">2 guests per room</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
