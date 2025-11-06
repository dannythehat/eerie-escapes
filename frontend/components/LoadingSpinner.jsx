'use client';

import { motion } from 'framer-motion';

export default function LoadingSpinner({ size = 'md', fullScreen = false }) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };

  const spinner = (
    <motion.div
      className={`${sizeClasses[size]} border-4 border-gray-700 border-t-red-500 rounded-full`}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
    />
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="text-center">
          {spinner}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-gray-400 mt-4"
          >
            Loading your nightmare...
          </motion.p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-8">
      {spinner}
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden animate-pulse">
      <div className="h-64 bg-gray-800" />
      <div className="p-6">
        <div className="h-4 bg-gray-800 rounded w-1/4 mb-4" />
        <div className="h-6 bg-gray-800 rounded w-3/4 mb-3" />
        <div className="h-4 bg-gray-800 rounded w-full mb-2" />
        <div className="h-4 bg-gray-800 rounded w-5/6 mb-4" />
        <div className="flex gap-4 mb-4">
          <div className="h-4 bg-gray-800 rounded w-1/4" />
          <div className="h-4 bg-gray-800 rounded w-1/4" />
        </div>
        <div className="h-10 bg-gray-800 rounded" />
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
