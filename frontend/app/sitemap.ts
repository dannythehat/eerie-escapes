import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://eerie-escapes.vercel.app'

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/holidays`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/partners`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]

  // Fetch dynamic holiday pages
  // In production, this would fetch from your API
  // For now, we'll return static pages
  // TODO: Uncomment when API is ready
  /*
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/holidays`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    })
    const holidays = await response.json()

    const holidayPages: MetadataRoute.Sitemap = holidays.map((holiday: any) => ({
      url: `${baseUrl}/holidays/${holiday.slug}`,
      lastModified: new Date(holiday.updatedAt),
      changeFrequency: 'weekly',
      priority: 0.8,
    }))

    return [...staticPages, ...holidayPages]
  } catch (error) {
    console.error('Error fetching holidays for sitemap:', error)
    return staticPages
  }
  */

  return staticPages
}
