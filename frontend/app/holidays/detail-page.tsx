'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Breadcrumb } from '@/components/Breadcrumb';
import { ImageGallery } from '@/components/holidays/ImageGallery';
import { ItinerarySection } from '@/components/holidays/ItinerarySection';
import { AccommodationDetails } from '@/components/holidays/AccommodationDetails';
import { BookingWidget } from '@/components/holidays/BookingWidget';
import { WhatsIncludedSection } from '@/components/holidays/WhatsIncludedSection';
import { FAQAccordion } from '@/components/holidays/FAQAccordion';
import { RelatedHolidays } from '@/components/holidays/RelatedHolidays';
import { SocialShare } from '@/components/holidays/SocialShare';
import { MapPin, Clock, Users, Star } from 'lucide-react';

interface Holiday {
  id: string;
  title: string;
  description: string;
  location: string;
  price: number;
  duration: number;
  difficulty: string;
  theme: string;
  images: string[];
  rating: number;
  reviewCount: number;
  maxGuests: number;
  availability: string[];
  itinerary: Array<{
    day: number;
    title: string;
    description: string;
    activities: string[];
  }>;
  accommodation: {
    name: string;
    type: string;
    description: string;
    amenities: string[];
    images: string[];
  };
  included: Array<{
    text: string;
    included: boolean;
  }>;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

export default function HolidayDetailPage() {
  const params = useParams();
  const holidayId = params?.id as string;
  
  const [holiday, setHoliday] = useState<Holiday | null>(null);
  const [relatedHolidays, setRelatedHolidays] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (holidayId) {
      fetchHolidayDetails();
    }
  }, [holidayId]);

  const fetchHolidayDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/holidays/${holidayId}`);
      const data = await response.json();
      setHoliday(data.holiday);
      setRelatedHolidays(data.relatedHolidays || []);
    } catch (error) {
      console.error('Error fetching holiday:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading your nightmare...</p>
        </div>
      </div>
    );
  }

  if (!holiday) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">👻</div>
          <h2 className="text-2xl font-bold text-white mb-2">Holiday Not Found</h2>
          <p className="text-gray-400 mb-6">This scare-cation seems to have vanished...</p>
          <a
            href="/holidays"
            className="inline-block bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors duration-200"
          >
            Browse All Holidays
          </a>
        </div>
      </div>
    );
  }

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Holidays', href: '/holidays' },
    { label: holiday.title, href: `/holidays/${holiday.id}` },
  ];

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Breadcrumb */}
      <div className="bg-gray-900 border-b border-red-900/20">
        <div className="container mx-auto px-4 py-4">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>

      {/* Image Gallery */}
      <div className="container mx-auto px-4 py-8">
        <ImageGallery images={holiday.images} title={holiday.title} />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-red-600 text-white text-sm font-semibold px-3 py-1 rounded-full">
                  {holiday.theme}
                </span>
                <span className="bg-gray-800 text-gray-300 text-sm font-semibold px-3 py-1 rounded-full">
                  {holiday.difficulty}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {holiday.title}
              </h1>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-6 text-gray-300">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-red-500" />
                  <span>{holiday.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-red-500" />
                  <span>{holiday.duration} days</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-red-500" />
                  <span>Up to {holiday.maxGuests} guests</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                  <span className="font-semibold">{holiday.rating}</span>
                  <span className="text-gray-400">({holiday.reviewCount} reviews)</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-gray-900 border border-red-900/30 rounded-xl p-8">
              <h2 className="text-3xl font-bold text-white mb-4">About This Experience</h2>
              <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                {holiday.description}
              </p>
            </div>

            {/* Itinerary */}
            <ItinerarySection itinerary={holiday.itinerary} />

            {/* Accommodation */}
            <AccommodationDetails accommodation={holiday.accommodation} />

            {/* What's Included */}
            <WhatsIncludedSection included={holiday.included} />

            {/* FAQ */}
            <FAQAccordion faqs={holiday.faqs} />

            {/* Social Share */}
            <SocialShare
              url={currentUrl}
              title={holiday.title}
              description={holiday.description.substring(0, 200)}
            />
          </div>

          {/* Right Column - Booking Widget */}
          <div className="lg:col-span-1">
            <BookingWidget
              holidayId={holiday.id}
              price={holiday.price}
              duration={holiday.duration}
              availability={holiday.availability}
              maxGuests={holiday.maxGuests}
            />
          </div>
        </div>

        {/* Related Holidays */}
        <div className="mt-16">
          <RelatedHolidays
            holidays={relatedHolidays}
            currentHolidayId={holiday.id}
          />
        </div>
      </div>
    </div>
  );
}
