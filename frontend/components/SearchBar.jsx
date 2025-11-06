'use client';

import { motion } from 'framer-motion';
import { Search, MapPin, Calendar, Sparkles } from 'lucide-react';
import { useState } from 'react';

export default function SearchBar({ onSearch, className = '' }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [theme, setTheme] = useState('');

  const themes = [
    'All Themes',
    'Haunted Tours',
    'Paranormal',
    'Crime Scenes',
    'Dark History',
    'Macabre Festivals',
    'Horror Attractions',
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch?.({
      query: searchQuery,
      location,
      date,
      theme: theme === 'All Themes' ? '' : theme,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={className}
    >
      <form onSubmit={handleSubmit}>
        <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 border border-red-900/30 rounded-2xl p-6 shadow-2xl backdrop-blur-sm">
          {/* Main Search Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {/* Search Query */}
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-red-500 transition-colors" />
              <input
                type="text"
                placeholder="Search experiences..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-gray-900/80 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
              />
            </div>

            {/* Location */}
            <div className="relative group">
              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-red-500 transition-colors" />
              <input
                type="text"
                placeholder="Where to?"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-gray-900/80 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
              />
            </div>

            {/* Date */}
            <div className="relative group">
              <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-red-500 transition-colors" />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-gray-900/80 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
              />
            </div>

            {/* Theme */}
            <div className="relative group">
              <Sparkles className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-red-500 transition-colors" />
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-gray-900/80 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all appearance-none cursor-pointer"
              >
                <option value="">Select theme...</option>
                {themes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:from-red-700 hover:via-red-800 hover:to-red-900 text-white font-semibold py-4 rounded-xl transition-all duration-300 transform hover:scale-[1.01] shadow-lg hover:shadow-red-500/50 flex items-center justify-center gap-2 group"
          >
            <Search className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            <span>Discover Your Nightmare</span>
          </button>
        </div>
      </form>
    </motion.div>
  );
}
