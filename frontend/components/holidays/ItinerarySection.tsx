'use client';

import { useState } from 'react';

interface ItineraryDay {
  day: number;
  title: string;
  activities: string[];
}

interface ItinerarySectionProps {
  itinerary: ItineraryDay[];
}

export default function ItinerarySection({ itinerary }: ItinerarySectionProps) {
  const [expandedDay, setExpandedDay] = useState<number | null>(1);

  const toggleDay = (day: number) => {
    setExpandedDay(expandedDay === day ? null : day);
  };

  return (
    <div className="my-12">
      <h2 className="text-3xl font-bold text-white mb-6">Day-by-Day Itinerary</h2>
      <div className="space-y-4">
        {itinerary.map((day) => (
          <div
            key={day.day}
            className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden transition-all duration-300"
          >
            {/* Day Header */}
            <button
              onClick={() => toggleDay(day.day)}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-800 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">{day.day}</span>
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-bold text-white">Day {day.day}</h3>
                  <p className="text-gray-400">{day.title}</p>
                </div>
              </div>
              <svg
                className={`w-6 h-6 text-gray-400 transition-transform duration-300 ${
                  expandedDay === day.day ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Day Activities */}
            <div
              className={`transition-all duration-300 overflow-hidden ${
                expandedDay === day.day ? 'max-h-96' : 'max-h-0'
              }`}
            >
              <div className="px-6 pb-6 pt-2">
                <ul className="space-y-3">
                  {day.activities.map((activity, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-300">
                      <svg
                        className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                      <span>{activity}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Summary */}
      <div className="mt-6 bg-gradient-to-r from-red-900/20 to-purple-900/20 rounded-lg p-6 border border-red-900/30">
        <div className="flex items-start gap-3">
          <svg
            className="w-6 h-6 text-red-500 mt-1 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <h4 className="text-white font-semibold mb-2">Itinerary Note</h4>
            <p className="text-gray-300 text-sm">
              This itinerary is subject to change based on weather conditions, local events, and
              group preferences. Our experienced guides will ensure you have the best possible
              experience while maintaining flexibility.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
