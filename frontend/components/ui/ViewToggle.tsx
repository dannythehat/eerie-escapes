'use client';

import { Grid, List } from 'lucide-react';

interface ViewToggleProps {
  view: 'grid' | 'list';
  onViewChange: (view: 'grid' | 'list') => void;
}

export function ViewToggle({ view, onViewChange }: ViewToggleProps) {
  return (
    <div className="flex items-center gap-2 bg-gray-900 border border-gray-800 rounded-lg p-1">
      <button
        onClick={() => onViewChange('grid')}
        className={`p-2 rounded transition-colors ${
          view === 'grid'
            ? 'bg-red-600 text-white'
            : 'text-gray-400 hover:text-white'
        }`}
        aria-label="Grid view"
      >
        <Grid className="w-5 h-5" />
      </button>
      <button
        onClick={() => onViewChange('list')}
        className={`p-2 rounded transition-colors ${
          view === 'list'
            ? 'bg-red-600 text-white'
            : 'text-gray-400 hover:text-white'
        }`}
        aria-label="List view"
      >
        <List className="w-5 h-5" />
      </button>
    </div>
  );
}
