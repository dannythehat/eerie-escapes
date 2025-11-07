import { notFound } from 'next/navigation';
import Breadcrumb from '@/components/Breadcrumb';
import ImageGallery from '@/components/holidays/ImageGallery';
import ItinerarySection from '@/components/holidays/ItinerarySection';
import AccommodationDetails from '@/components/holidays/AccommodationDetails';

// Mock data - will be replaced with API call
const getHolidayById = async (id: string) => {
  // TODO: Replace with actual API call
  const mockHoliday = {
    id,
    title: 'Transylvania Vampire Tour',
    location: 'Transylvania, Romania',
    price: 1299,
    duration: '7 days',
    difficulty: 'Moderate',
    description: 'Experience the chilling legends of Dracula in the heart of Transylvania. Visit Bran Castle, explore medieval towns, and immerse yourself in vampire folklore.',
    images: [
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800',
      'https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?w=800',
      'https://images.unsplash.com/photo-1565031491910-e57fac031c41?w=800',
      'https://images.unsplash.com/photo-1604869515882-4d10fa4b0492?w=800',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Bucharest',
        activities: [
          'Airport pickup and transfer to hotel',
          'Welcome dinner with traditional Romanian cuisine',
          'Evening ghost walk through Old Town Bucharest',
        ],
      },
      {
        day: 2,
        title: 'Journey to Transylvania',
        activities: [
          'Scenic drive through the Carpathian Mountains',
          'Visit Peles Castle',
          'Arrive in Brasov and check into medieval hotel',
          'Sunset tour of Brasov Old Town',
        ],
      },
      {
        day: 3,
        title: 'Bran Castle - Dracula\'s Lair',
        activities: [
          'Guided tour of Bran Castle',
          'Explore the secret passages and torture chambers',
          'Lunch at a traditional Romanian tavern',
          'Visit Rasnov Fortress',
        ],
      },
      {
        day: 4,
        title: 'Sighisoara - Dracula\'s Birthplace',
        activities: [
          'Visit the birthplace of Vlad the Impaler',
          'Explore the medieval citadel',
          'Climb the Clock Tower for panoramic views',
          'Evening vampire folklore storytelling session',
        ],
      },
      {
        day: 5,
        title: 'Haunted Forests and Villages',
        activities: [
          'Trek through Hoia Baciu Forest (Romania\'s Bermuda Triangle)',
          'Visit abandoned Saxon villages',
          'Traditional Romanian cooking class',
          'Nighttime paranormal investigation',
        ],
      },
      {
        day: 6,
        title: 'Corvin Castle',
        activities: [
          'Explore one of Europe\'s largest Gothic castles',
          'Learn about Vlad the Impaler\'s imprisonment',
          'Visit the torture chamber and dungeons',
          'Farewell dinner with live medieval entertainment',
        ],
      },
      {
        day: 7,
        title: 'Departure',
        activities: [
          'Breakfast at hotel',
          'Last-minute souvenir shopping',
          'Transfer to Bucharest airport',
        ],
      },
    ],
    accommodation: {
      name: 'Castle Dracula Hotel',
      type: '4-Star Gothic Castle Hotel',
      description: 'Stay in an authentic Transylvanian castle with medieval decor, modern amenities, and stunning mountain views. Each room features period furniture, stone walls, and atmospheric lighting.',
      amenities: [
        'Free WiFi',
        'Traditional Romanian breakfast included',
        'On-site restaurant with medieval theme',
        'Spa and wellness center',
        'Gothic-themed rooms',
        'Mountain view balconies',
        'Heated indoor pool',
        '24/7 concierge service',
      ],
      images: [
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
      ],
    },
    included: [
      'Airport transfers',
      'All accommodation (6 nights)',
      'Daily breakfast',
      '3 dinners',
      'All entrance fees to castles and attractions',
      'Professional English-speaking guide',
      'Transportation in air-conditioned vehicle',
      'Paranormal investigation equipment',
    ],
    notIncluded: [
      'International flights',
      'Travel insurance',
      'Lunches (except Day 3)',
      'Personal expenses',
      'Tips and gratuities',
    ],
  };

  return mockHoliday;
};

export default async function HolidayDetailPage({ params }: { params: { id: string } }) {
  const holiday = await getHolidayById(params.id);

  if (!holiday) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Breadcrumb Navigation */}
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Holidays', href: '/holidays' },
          { label: holiday.title, href: `/holidays/${holiday.id}` },
        ]}
      />

      {/* Hero Section with Title */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {holiday.title}
          </h1>
          <div className="flex flex-wrap gap-4 text-gray-300">
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {holiday.location}
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {holiday.duration}
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              {holiday.difficulty}
            </span>
            <span className="text-2xl font-bold text-red-500">
              ${holiday.price}
            </span>
          </div>
        </div>

        {/* Image Gallery */}
        <ImageGallery images={holiday.images} title={holiday.title} />

        {/* Description */}
        <div className="my-12">
          <h2 className="text-3xl font-bold text-white mb-4">About This Experience</h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            {holiday.description}
          </p>
        </div>

        {/* Itinerary Section */}
        <ItinerarySection itinerary={holiday.itinerary} />

        {/* Accommodation Details */}
        <AccommodationDetails accommodation={holiday.accommodation} />

        {/* What's Included/Not Included */}
        <div className="grid md:grid-cols-2 gap-8 my-12">
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              What's Included
            </h3>
            <ul className="space-y-2">
              {holiday.included.map((item, index) => (
                <li key={index} className="text-gray-300 flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Not Included
            </h3>
            <ul className="space-y-2">
              {holiday.notIncluded.map((item, index) => (
                <li key={index} className="text-gray-300 flex items-start gap-2">
                  <span className="text-red-500 mt-1">✗</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Booking CTA */}
        <div className="bg-gradient-to-r from-red-900 to-purple-900 rounded-lg p-8 text-center my-12">
          <h3 className="text-3xl font-bold text-white mb-4">Ready for Your Eerie Escape?</h3>
          <p className="text-gray-200 mb-6">Book now and secure your spot on this unforgettable journey</p>
          <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors">
            Book Now - ${holiday.price}
          </button>
        </div>
      </div>
    </div>
  );
}
