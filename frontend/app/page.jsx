import HeroSection from '@/components/HeroSection';
import FeaturedHolidaysCarousel from '@/components/FeaturedHolidaysCarousel';

// Mock data for featured holidays (replace with API call)
const featuredHolidays = [
  {
    id: '1',
    slug: 'transylvania-dracula-castle',
    title: "Dracula's Castle: Transylvania Terror",
    shortDescription: 'Spend three nights in the legendary Bran Castle, exploring the dark history of Vlad the Impaler and experiencing authentic vampire folklore.',
    theme: 'HAUNTED_TOURS',
    city: 'Brașov',
    country: 'Romania',
    durationDays: 3,
    durationNights: 2,
    basePrice: 899,
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200',
    images: ['https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200'],
  },
  {
    id: '2',
    slug: 'salem-witch-trials',
    title: 'Salem Witch Trials Experience',
    shortDescription: 'Walk the haunted streets of Salem, visit execution sites, and participate in authentic witch trial reenactments.',
    theme: 'DARK_HISTORY',
    city: 'Salem',
    country: 'USA',
    durationDays: 4,
    durationNights: 3,
    basePrice: 1299,
    coverImage: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=1200',
    images: ['https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=1200'],
  },
  {
    id: '3',
    slug: 'paris-catacombs-overnight',
    title: 'Paris Catacombs: Overnight in the Empire of Death',
    shortDescription: 'Exclusive overnight access to the Paris Catacombs, surrounded by the remains of 6 million souls.',
    theme: 'MACABRE_FESTIVALS',
    city: 'Paris',
    country: 'France',
    durationDays: 2,
    durationNights: 1,
    basePrice: 1599,
    coverImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200',
    images: ['https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200'],
  },
  {
    id: '4',
    slug: 'aokigahara-forest-japan',
    title: 'Aokigahara: The Suicide Forest',
    shortDescription: 'Guided exploration of Japan\'s most haunted forest at the base of Mount Fuji, known for its eerie silence and dark history.',
    theme: 'PARANORMAL',
    city: 'Fujikawaguchiko',
    country: 'Japan',
    durationDays: 3,
    durationNights: 2,
    basePrice: 1099,
    coverImage: 'https://images.unsplash.com/photo-1528164344705-47542687000d?w=1200',
    images: ['https://images.unsplash.com/photo-1528164344705-47542687000d?w=1200'],
  },
  {
    id: '5',
    slug: 'edinburgh-underground-vaults',
    title: 'Edinburgh Underground Vaults',
    shortDescription: 'Explore the haunted underground vaults beneath Edinburgh\'s South Bridge, home to countless paranormal encounters.',
    theme: 'HAUNTED_TOURS',
    city: 'Edinburgh',
    country: 'Scotland',
    durationDays: 3,
    durationNights: 2,
    basePrice: 799,
    coverImage: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=1200',
    images: ['https://images.unsplash.com/photo-1583422409516-2895a77efded?w=1200'],
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black">
      {/* Hero Section with Search */}
      <HeroSection />

      {/* Featured Holidays Carousel */}
      <FeaturedHolidaysCarousel holidays={featuredHolidays} />

      {/* Additional sections will be added in Day 12 */}
    </main>
  );
}
