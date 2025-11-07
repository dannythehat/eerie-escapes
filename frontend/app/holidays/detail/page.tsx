'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Breadcrumb } from '@/components/Breadcrumb';
import { ImageGallery } from '@/components/holidays/ImageGallery';
import { ItinerarySection } from '@/components/holidays/ItinerarySection';
import { AccommodationDetails } from '@/components/holidays/AccommodationDetails';
import { BookingWidget } from '@/components/holidays/BookingWidget';
import { WhatsIncludedSection } from '@/components/holidays/WhatsIncludedSection';
import { FAQAccordion } from '@/components/holidays/FAQAccordion';
import { RelatedHolidays } from '@/components/holidays/RelatedHolidays';
import { SocialShare } from '@/components/holidays/SocialShare';
import { MapPin, Calendar, Users, Star, Clock, TrendingUp } from 'lucide-react';

interface Holiday {
  id: string;
  title: string;
  location: string;
  country: string;
  price: number;
  duration: number;
  difficulty: string;
  theme: string;
  rating: number;
  reviewCount: number;
  description: string;
  longDescription: string;
  images: string[];
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
    rating: number;
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
  const searchParams = useSearchParams();
  const holidayId = searchParams.get('id');
  const [holiday, setHoliday] = useState<Holiday | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedHolidays, setRelatedHolidays] = useState([]);

  useEffect(() => {
    const fetchHoliday = async () => {
      try {
        // TODO: Replace with actual API call
        // const response = await fetch(`/api/holidays/${holidayId}`);
        // const data = await response.json();
        
        // Mock data for development
        const mockHoliday: Holiday = {
          id: holidayId || '1',
          title: 'Transylvania Vampire Tour',
          location: 'Transylvania',
          country: 'Romania',
          price: 1299,
          duration: 7,
          difficulty: 'Moderate',
          theme: 'Vampires & Gothic',
          rating: 4.8,
          reviewCount: 127,
          description: 'Explore the legendary home of Dracula in this spine-chilling week-long adventure through Transylvania.',
          longDescription: `Embark on a haunting journey through the misty mountains and ancient castles of Transylvania. This immersive experience takes you deep into vampire lore, from Bran Castle (Dracula's Castle) to the medieval streets of Sighișoara, Vlad the Impaler's birthplace.

You'll explore Gothic architecture, attend a vampire-themed ball, participate in nighttime cemetery tours, and learn about the real history behind the legends. Expert guides will share tales of folklore, superstition, and the historical figures that inspired Bram Stoker's iconic novel.

This tour is perfect for horror enthusiasts, history buffs, and anyone seeking an unforgettable adventure in one of Europe's most mysterious regions.`,
          images: [
            'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200',
            'https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?w=1200',
            'https://images.unsplash.com/photo-1565008576549-57569a49371d?w=1200',
            'https://images.unsplash.com/photo-1604869515882-4d10fa4b0492?w=1200',
          ],
          maxGuests: 12,
          availability: [
            '2025-12-01',
            '2025-12-15',
            '2026-01-05',
            '2026-01-20',
            '2026-02-10',
          ],
          itinerary: [
            {
              day: 1,
              title: 'Arrival in Bucharest',
              description: 'Welcome to Romania! Transfer to hotel and evening orientation.',
              activities: [
                'Airport pickup and transfer',
                'Check-in at Gothic-themed hotel',
                'Welcome dinner with traditional Romanian cuisine',
                'Evening walk through Old Town Bucharest',
              ],
            },
            {
              day: 2,
              title: 'Bran Castle & Brașov',
              description: 'Visit the legendary Dracula\'s Castle and explore medieval Brașov.',
              activities: [
                'Guided tour of Bran Castle',
                'Lunch in Brașov Old Town',
                'Explore Black Church and Council Square',
                'Evening ghost stories session',
              ],
            },
            {
              day: 3,
              title: 'Sighișoara - Birthplace of Vlad',
              description: 'Discover the medieval citadel where Vlad the Impaler was born.',
              activities: [
                'Walking tour of Sighișoara Citadel',
                'Visit Vlad Dracul House',
                'Climb the Clock Tower',
                'Dinner at medieval restaurant',
              ],
            },
            {
              day: 4,
              title: 'Poenari Fortress',
              description: 'Hike to Vlad\'s real fortress high in the mountains.',
              activities: [
                'Scenic drive through Carpathian Mountains',
                'Climb 1,480 steps to Poenari Fortress',
                'Picnic lunch with mountain views',
                'Visit Curtea de Argeș Monastery',
              ],
            },
            {
              day: 5,
              title: 'Vampire Ball & Cemetery Tour',
              description: 'Dress in Gothic attire for an unforgettable vampire ball.',
              activities: [
                'Free morning for relaxation',
                'Afternoon costume preparation',
                'Vampire Ball at historic castle',
                'Midnight cemetery tour',
              ],
            },
            {
              day: 6,
              title: 'Folklore & Traditions',
              description: 'Learn about Romanian vampire folklore and superstitions.',
              activities: [
                'Visit Village Museum',
                'Workshop on vampire folklore',
                'Traditional craft demonstrations',
                'Farewell dinner with live music',
              ],
            },
            {
              day: 7,
              title: 'Departure',
              description: 'Transfer to airport for your journey home.',
              activities: [
                'Breakfast at hotel',
                'Last-minute souvenir shopping',
                'Airport transfer',
                'Departure',
              ],
            },
          ],
          accommodation: {
            name: 'Castle Hotel Dracula',
            type: 'Gothic Castle Hotel',
            rating: 4.5,
            description: 'Stay in an authentic Gothic castle hotel with period furnishings, candlelit corridors, and stunning mountain views. Each room is uniquely decorated with antique furniture and vampire-themed artwork.',
            amenities: [
              'Free WiFi',
              'Restaurant & Bar',
              'Spa & Wellness Center',
              'Gothic Library',
              'Castle Tours',
              'Room Service',
              'Parking',
              'Airport Shuttle',
            ],
            images: [
              'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
              'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
            ],
          },
          included: [
            { text: '6 nights accommodation in Gothic castle hotel', included: true },
            { text: 'All breakfasts and 4 dinners', included: true },
            { text: 'Professional English-speaking guide', included: true },
            { text: 'All entrance fees to castles and museums', included: true },
            { text: 'Private transportation throughout', included: true },
            { text: 'Vampire Ball costume and entry', included: true },
            { text: 'Airport transfers', included: true },
            { text: 'Travel insurance', included: true },
            { text: 'International flights', included: false },
            { text: 'Lunches (except Day 4)', included: false },
            { text: 'Personal expenses and souvenirs', included: false },
            { text: 'Optional activities', included: false },
          ],
          faqs: [
            {
              question: 'Is this tour suitable for children?',
              answer: 'This tour is recommended for ages 16+ due to the horror themes and some physically demanding activities like the Poenari Fortress climb. However, mature teenagers with an interest in history and Gothic culture may enjoy it.',
            },
            {
              question: 'What is the fitness level required?',
              answer: 'Moderate fitness is required. The most challenging activity is climbing 1,480 steps to Poenari Fortress on Day 4. Most other activities involve walking on cobblestone streets and castle stairs.',
            },
            {
              question: 'What should I pack?',
              answer: 'Comfortable walking shoes, layers for varying temperatures, rain jacket, camera, and Gothic/formal attire for the Vampire Ball. We provide a detailed packing list upon booking.',
            },
            {
              question: 'Are vegetarian/vegan options available?',
              answer: 'Yes! Please inform us of any dietary requirements when booking, and we\'ll ensure all meals accommodate your needs.',
            },
            {
              question: 'What is the cancellation policy?',
              answer: 'Free cancellation up to 30 days before departure. 50% refund for cancellations 15-30 days before. No refund for cancellations within 14 days of departure.',
            },
            {
              question: 'Is travel insurance included?',
              answer: 'Basic travel insurance is included, but we recommend purchasing comprehensive coverage for medical emergencies and trip interruption.',
            },
          ],
        };

        setHoliday(mockHoliday);

        // Fetch related holidays
        // const relatedResponse = await fetch(`/api/holidays?theme=${mockHoliday.theme}&limit=3`);
        // const relatedData = await relatedResponse.json();
        // setRelatedHolidays(relatedData);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching holiday:', error);
        setLoading(false);
      }
    };

    if (holidayId) {
      fetchHoliday();
    }
  }, [holidayId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading holiday details...</p>
        </div>
      </div>
    );
  }

  if (!holiday) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Holiday Not Found</h1>
          <p className="text-gray-400 mb-8">The holiday you're looking for doesn't exist.</p>
          <a
            href="/holidays"
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors"
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
    { label: holiday.title, href: `/holidays/detail?id=${holiday.id}` },
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Breadcrumb */}
      <div className="bg-gray-900 border-b border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>

      {/* Hero Section with Image Gallery */}
      <div className="container mx-auto px-4 py-8">
        <ImageGallery images={holiday.images} alt={holiday.title} />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title and Quick Info */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {holiday.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-gray-300 mb-6">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-red-500" />
                  <span>{holiday.location}, {holiday.country}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  <span>{holiday.rating} ({holiday.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-500" />
                  <span>{holiday.duration} days</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-green-500" />
                  <span>Max {holiday.maxGuests} guests</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-purple-500" />
                  <span>{holiday.difficulty}</span>
                </div>
              </div>

              {/* Social Share */}
              <SocialShare
                url={`https://eerie-escapes.vercel.app/holidays/detail?id=${holiday.id}`}
                title={holiday.title}
                description={holiday.description}
              />
            </div>

            {/* Description */}
            <div className="bg-gray-900 border border-red-900/30 rounded-xl p-8">
              <h2 className="text-3xl font-bold text-white mb-4">About This Experience</h2>
              <div className="text-gray-300 space-y-4 whitespace-pre-line">
                {holiday.longDescription}
              </div>
            </div>

            {/* Itinerary */}
            <ItinerarySection itinerary={holiday.itinerary} />

            {/* Accommodation */}
            <AccommodationDetails accommodation={holiday.accommodation} />

            {/* What's Included */}
            <WhatsIncludedSection included={holiday.included} />

            {/* FAQ */}
            <FAQAccordion faqs={holiday.faqs} />
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
      </div>

      {/* Related Holidays */}
      <div className="container mx-auto px-4 py-16">
        <RelatedHolidays
          currentHolidayId={holiday.id}
          theme={holiday.theme}
          holidays={relatedHolidays}
        />
      </div>
    </div>
  );
}
