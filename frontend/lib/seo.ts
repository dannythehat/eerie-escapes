import { Metadata } from 'next'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  url?: string
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  author?: string
  section?: string
}

const defaultMetadata = {
  title: 'Eerie Escapes - Where Travel Meets Terror',
  description: 'Experience the world\'s most spine-chilling holidays and morbid vacations. From haunted tours to macabre festivals, discover unforgettable horror experiences worldwide.',
  keywords: [
    'horror travel',
    'haunted tours',
    'scary vacations',
    'dark tourism',
    'macabre holidays',
    'paranormal experiences',
    'ghost tours',
    'horror festivals',
    'spooky destinations',
    'eerie escapes'
  ],
  image: 'https://eerie-escapes.vercel.app/og-image.jpg',
  url: 'https://eerie-escapes.vercel.app',
  siteName: 'Eerie Escapes',
  twitterHandle: '@eerieescapes'
}

export function generateSEOMetadata({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
  section
}: SEOProps = {}): Metadata {
  const seoTitle = title ? `${title} | Eerie Escapes` : defaultMetadata.title
  const seoDescription = description || defaultMetadata.description
  const seoImage = image || defaultMetadata.image
  const seoUrl = url || defaultMetadata.url
  const seoKeywords = keywords || defaultMetadata.keywords

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: seoKeywords,
    authors: author ? [{ name: author }] : [{ name: 'Eerie Escapes Team' }],
    creator: 'Eerie Escapes',
    publisher: 'Eerie Escapes',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(defaultMetadata.url),
    alternates: {
      canonical: seoUrl,
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: seoUrl,
      siteName: defaultMetadata.siteName,
      images: [
        {
          url: seoImage,
          width: 1200,
          height: 630,
          alt: seoTitle,
        },
      ],
      locale: 'en_US',
      type: type,
      ...(type === 'article' && {
        publishedTime,
        modifiedTime,
        authors: author ? [author] : undefined,
        section,
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDescription,
      site: defaultMetadata.twitterHandle,
      creator: defaultMetadata.twitterHandle,
      images: [seoImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
      yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
      bing: process.env.NEXT_PUBLIC_BING_VERIFICATION,
    },
  }
}

export function generateHolidayMetadata(holiday: {
  title: string
  description: string
  location: string
  coverImage: string
  slug: string
  price: number
  duration: number
  theme: string
}) {
  return generateSEOMetadata({
    title: holiday.title,
    description: holiday.description,
    keywords: [
      holiday.title,
      holiday.location,
      holiday.theme,
      'horror travel',
      'scary vacation',
      'haunted tour',
    ],
    image: holiday.coverImage,
    url: `https://eerie-escapes.vercel.app/holidays/${holiday.slug}`,
    type: 'article',
    section: 'Horror Travel',
  })
}

export const defaultSEO = generateSEOMetadata()
