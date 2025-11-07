'use client';

import { useState, useEffect } from 'react';
import { HolidayCard } from '@/components/holidays/HolidayCard';
import { FilterSidebar } from '@/components/holidays/FilterSidebar';
import { SearchBar } from '@/components/search/SearchBar';
import { Pagination } from '@/components/ui/Pagination';
import { ViewToggle } from '@/components/ui/ViewToggle';
import { Skeleton } from '@/components/ui/Skeleton';

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

interface Filters {
  location?: string;
  theme?: string;
  priceRange?: [number, number];
  duration?: string;
  difficulty?: string;
  dateRange?: [Date, Date];
}

export default function HolidaysPage() {
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState<Filters>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popularity');

  const itemsPerPage = 12;

  useEffect(() => {
    fetchHolidays();
  }, [currentPage, filters, searchQuery, sortBy]);

  const fetchHolidays = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        page: currentPage.toString(),
        limit: itemsPerPage.toString(),
        sort: sortBy,
        ...(searchQuery && { search: searchQuery }),
        ...(filters.location && { location: filters.location }),
        ...(filters.theme && { theme: filters.theme }),
        ...(filters.difficulty && { difficulty: filters.difficulty }),
        ...(filters.priceRange && {
          minPrice: filters.priceRange[0].toString(),
          maxPrice: filters.priceRange[1].toString(),
        }),
      });

      const response = await fetch(`/api/holidays?${queryParams}`);
      const data = await response.json();

      setHolidays(data.holidays);
      setTotalPages(Math.ceil(data.total / itemsPerPage));
    } catch (error) {
      console.error('Error fetching holidays:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header Section */}
      <div className="bg-gradient-to-b from-gray-900 to-gray-950 border-b border-red-900/20">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Discover Your Next <span className="text-red-500">Scare-cation</span>
          </h1>
          <p className="text-gray-400 text-lg mb-6">
            Explore spine-chilling holidays and horror experiences from around the world
          </p>
          
          {/* Search Bar */}
          <div className="max-w-3xl">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Sidebar */}
          <aside className="lg:w-80 flex-shrink-0">
            <FilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          </aside>

          {/* Holiday Listings */}
          <main className="flex-1">
            {/* Controls Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="text-gray-400">
                {loading ? (
                  <Skeleton className="h-6 w-32" />
                ) : (
                  <span>
                    Showing {holidays.length} of {totalPages * itemsPerPage} holidays
                  </span>
                )}
              </div>

              <div className="flex items-center gap-4">
                {/* Sort Dropdown */}
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="bg-gray-900 text-white border border-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="popularity">Most Popular</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="date">Upcoming Dates</option>
                  <option value="rating">Highest Rated</option>
                </select>

                {/* View Toggle */}
                <ViewToggle view={view} onViewChange={setView} />
              </div>
            </div>

            {/* Holiday Grid/List */}
            {loading ? (
              <div className={view === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
                : 'space-y-6'
              }>
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} className="h-96 rounded-xl" />
                ))}
              </div>
            ) : holidays.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">👻</div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  No holidays found
                </h3>
                <p className="text-gray-400">
                  Try adjusting your filters or search query
                </p>
              </div>
            ) : (
              <>
                <div className={view === 'grid'
                  ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
                  : 'space-y-6'
                }>
                  {holidays.map((holiday) => (
                    <HolidayCard
                      key={holiday.id}
                      holiday={holiday}
                      view={view}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-12">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setCurrentPage}
                    />
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
