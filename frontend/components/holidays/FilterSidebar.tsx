'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, DollarSign, Calendar, Clock, TrendingUp, Filter } from 'lucide-react';

interface Filters {
  location?: string;
  theme?: string;
  priceRange?: [number, number];
  duration?: string;
  difficulty?: string;
  dateRange?: [Date, Date];
}

interface FilterSidebarProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
}

export function FilterSidebar({ filters, onFilterChange }: FilterSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState<Filters>(filters);

  const themes = [
    'Haunted Houses',
    'Ghost Tours',
    'Paranormal Investigation',
    'Horror Festivals',
    'Dark Tourism',
    'Zombie Experiences',
    'Vampire Tours',
    'Witch Trials',
    'Serial Killer Tours',
    'Asylum Visits',
  ];

  const difficulties = ['Easy', 'Moderate', 'Challenging', 'Extreme'];

  const durations = [
    { label: '1-3 days', value: '1-3' },
    { label: '4-7 days', value: '4-7' },
    { label: '8-14 days', value: '8-14' },
    { label: '15+ days', value: '15+' },
  ];

  const handlePriceChange = (min: number, max: number) => {
    setLocalFilters({ ...localFilters, priceRange: [min, max] });
  };

  const handleApplyFilters = () => {
    onFilterChange(localFilters);
    setIsOpen(false);
  };

  const handleClearFilters = () => {
    setLocalFilters({});
    onFilterChange({});
  };

  const activeFilterCount = Object.keys(localFilters).filter(
    key => localFilters[key as keyof Filters] !== undefined
  ).length;

  return (
    <>
      {/* Mobile Filter Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 z-40 bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-lg flex items-center gap-2"
      >
        <Filter className="w-5 h-5" />
        {activeFilterCount > 0 && (
          <span className="bg-white text-red-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
            {activeFilterCount}
          </span>
        )}
      </button>

      {/* Sidebar */}
      <AnimatePresence>
        {(isOpen || window.innerWidth >= 1024) && (
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            className="fixed lg:relative inset-y-0 left-0 z-50 lg:z-0 w-80 bg-gray-900 border-r border-gray-800 overflow-y-auto"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Filter className="w-6 h-6 text-red-500" />
                  Filters
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="lg:hidden text-gray-400 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Location Filter */}
              <div className="mb-6">
                <label className="block text-white font-semibold mb-3 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-red-500" />
                  Location
                </label>
                <input
                  type="text"
                  placeholder="Enter location..."
                  value={localFilters.location || ''}
                  onChange={(e) => setLocalFilters({ ...localFilters, location: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              {/* Theme Filter */}
              <div className="mb-6">
                <label className="block text-white font-semibold mb-3 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-red-500" />
                  Theme
                </label>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {themes.map((theme) => (
                    <label key={theme} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        name="theme"
                        value={theme}
                        checked={localFilters.theme === theme}
                        onChange={(e) => setLocalFilters({ ...localFilters, theme: e.target.value })}
                        className="w-4 h-4 text-red-600 focus:ring-red-500"
                      />
                      <span className="text-gray-400 group-hover:text-white transition-colors">
                        {theme}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <label className="block text-white font-semibold mb-3 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-red-500" />
                  Price Range
                </label>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      placeholder="Min"
                      value={localFilters.priceRange?.[0] || ''}
                      onChange={(e) => handlePriceChange(Number(e.target.value), localFilters.priceRange?.[1] || 10000)}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                    <span className="text-gray-400">-</span>
                    <input
                      type="number"
                      placeholder="Max"
                      value={localFilters.priceRange?.[1] || ''}
                      onChange={(e) => handlePriceChange(localFilters.priceRange?.[0] || 0, Number(e.target.value))}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                  <div className="flex gap-2">
                    {[500, 1000, 2000, 5000].map((price) => (
                      <button
                        key={price}
                        onClick={() => handlePriceChange(0, price)}
                        className="flex-1 px-2 py-1 bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white rounded text-sm transition-colors"
                      >
                        ${price}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Duration Filter */}
              <div className="mb-6">
                <label className="block text-white font-semibold mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-red-500" />
                  Duration
                </label>
                <div className="space-y-2">
                  {durations.map((duration) => (
                    <label key={duration.value} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        name="duration"
                        value={duration.value}
                        checked={localFilters.duration === duration.value}
                        onChange={(e) => setLocalFilters({ ...localFilters, duration: e.target.value })}
                        className="w-4 h-4 text-red-600 focus:ring-red-500"
                      />
                      <span className="text-gray-400 group-hover:text-white transition-colors">
                        {duration.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Difficulty Filter */}
              <div className="mb-6">
                <label className="block text-white font-semibold mb-3">
                  Difficulty Level
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {difficulties.map((difficulty) => (
                    <button
                      key={difficulty}
                      onClick={() => setLocalFilters({ 
                        ...localFilters, 
                        difficulty: localFilters.difficulty === difficulty ? undefined : difficulty 
                      })}
                      className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                        localFilters.difficulty === difficulty
                          ? 'bg-red-600 text-white'
                          : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                      }`}
                    >
                      {difficulty}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-6 border-t border-gray-800">
                <button
                  onClick={handleApplyFilters}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition-colors"
                >
                  Apply Filters
                </button>
                <button
                  onClick={handleClearFilters}
                  className="w-full bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white font-semibold py-3 rounded-lg transition-colors"
                >
                  Clear All
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
        />
      )}
    </>
  );
}
