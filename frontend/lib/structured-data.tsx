// JSON-LD Structured Data Utilities for SEO

export interface Organization {
  '@context': 'https://schema.org'
  '@type': 'Organization'
  name: string
  url: string
  logo: string
  description: string
  sameAs: string[]
  contactPoint: {
    '@type': 'ContactPoint'
    telephone: string
    contactType: string
    email: string
  }
}

export interface WebSite {
  '@context': 'https://schema.org'
  '@type': 'WebSite'
  name: string
  url: string
  description: string
  potentialAction: {
    '@type': 'SearchAction'
    target: string
    'query-input': string
  }
}

export interface TouristAttraction {
  '@context': 'https://schema.org'
  '@type': 'TouristAttraction'
  name: string
  description: string
  image: string[]
  url: string
  address: {
    '@type': 'PostalAddress'
    addressLocality: string
    addressCountry: string
  }
  geo?: {
    '@type': 'GeoCoordinates'
    latitude: number
    longitude: number
  }
  offers: {
    '@type': 'Offer'
    price: number
    priceCurrency: string
    availability: string
    validFrom: string
  }
  aggregateRating?: {
    '@type': 'AggregateRating'
    ratingValue: number
    reviewCount: number
    bestRating: number
    worstRating: number
  }
}

export interface BreadcrumbList {
  '@context': 'https://schema.org'
  '@type': 'BreadcrumbList'
  itemListElement: Array<{
    '@type': 'ListItem'
    position: number
    name: string
    item: string
  }>
}

export function generateOrganizationSchema(): Organization {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Eerie Escapes',
    url: 'https://eerie-escapes.vercel.app',
    logo: 'https://eerie-escapes.vercel.app/logo.png',
    description: 'Experience the world\'s most spine-chilling holidays and morbid vacations.',
    sameAs: [
      'https://twitter.com/eerieescapes',
      'https://facebook.com/eerieescapes',
      'https://instagram.com/eerieescapes',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-555-EERIE-00',
      contactType: 'Customer Service',
      email: 'hello@eerieescapes.com',
    },
  }
}

export function generateWebSiteSchema(): WebSite {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Eerie Escapes',
    url: 'https://eerie-escapes.vercel.app',
    description: 'Discover spine-chilling horror travel experiences worldwide',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://eerie-escapes.vercel.app/holidays?search={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  }
}

export function generateHolidaySchema(holiday: {
  title: string
  description: string
  coverImage: string
  images: string[]
  slug: string
  location: string
  country: string
  price: number
  duration: number
  rating?: number
  reviewCount?: number
  latitude?: number
  longitude?: number
}): TouristAttraction {
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    name: holiday.title,
    description: holiday.description,
    image: [holiday.coverImage, ...holiday.images],
    url: `https://eerie-escapes.vercel.app/holidays/${holiday.slug}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: holiday.location,
      addressCountry: holiday.country,
    },
    ...(holiday.latitude &&
      holiday.longitude && {
        geo: {
          '@type': 'GeoCoordinates',
          latitude: holiday.latitude,
          longitude: holiday.longitude,
        },
      }),
    offers: {
      '@type': 'Offer',
      price: holiday.price,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      validFrom: new Date().toISOString(),
    },
    ...(holiday.rating &&
      holiday.reviewCount && {
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: holiday.rating,
          reviewCount: holiday.reviewCount,
          bestRating: 5,
          worstRating: 1,
        },
      }),
  }
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>): BreadcrumbList {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

// Helper component to inject JSON-LD into page
export function StructuredData({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
