import { Request, Response } from 'express';
import { PrismaClient, HolidayTheme, HolidayStatus, DifficultyLevel } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Generate slug from title
 */
const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

/**
 * Track search analytics
 */
const trackSearchAnalytics = async (
  searchTerm: string,
  resultsCount: number,
  filters: any,
  userId?: string
) => {
  try {
    await prisma.searchAnalytics.create({
      data: {
        searchTerm: searchTerm.toLowerCase(),
        resultsCount,
        filters: JSON.stringify(filters),
        userId,
      },
    });
  } catch (error) {
    console.error('Failed to track search analytics:', error);
  }
};

/**
 * Get all holidays with pagination, filtering, and sorting
 * GET /api/v1/holidays
 */
export const getAllHolidays = async (req: Request, res: Response) => {
  try {
    // Pagination
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    // Filters
    const { 
      country, 
      city, 
      theme, 
      difficulty,
      startDate, 
      endDate, 
      minPrice, 
      maxPrice,
      minDuration,
      maxDuration,
      status,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build where clause
    const where: any = {};

    // Location filters
    if (country) {
      where.country = { contains: country as string, mode: 'insensitive' };
    }
    if (city) {
      where.city = { contains: city as string, mode: 'insensitive' };
    }

    // Theme filter
    if (theme && Object.values(HolidayTheme).includes(theme as HolidayTheme)) {
      where.theme = theme as HolidayTheme;
    }

    // Difficulty filter
    if (difficulty && Object.values(DifficultyLevel).includes(difficulty as DifficultyLevel)) {
      where.difficulty = difficulty as DifficultyLevel;
    }

    // Date range filter
    if (startDate || endDate) {
      where.AND = where.AND || [];
      if (startDate) {
        where.AND.push({
          OR: [
            { startDate: { gte: new Date(startDate as string) } },
            { isYearRound: true }
          ]
        });
      }
      if (endDate) {
        where.AND.push({
          OR: [
            { endDate: { lte: new Date(endDate as string) } },
            { isYearRound: true }
          ]
        });
      }
    }

    // Price range filter
    if (minPrice || maxPrice) {
      where.basePrice = {};
      if (minPrice) {
        where.basePrice.gte = parseFloat(minPrice as string);
      }
      if (maxPrice) {
        where.basePrice.lte = parseFloat(maxPrice as string);
      }
    }

    // Duration filter
    if (minDuration || maxDuration) {
      where.durationDays = {};
      if (minDuration) {
        where.durationDays.gte = parseInt(minDuration as string);
      }
      if (maxDuration) {
        where.durationDays.lte = parseInt(maxDuration as string);
      }
    }

    // Status filter (default to PUBLISHED for public API)
    if (status && Object.values(HolidayStatus).includes(status as HolidayStatus)) {
      where.status = status as HolidayStatus;
    } else {
      where.status = HolidayStatus.PUBLISHED;
    }

    // Build orderBy clause
    const orderBy: any = {};
    const validSortFields = [
      'createdAt', 
      'updatedAt', 
      'publishedAt',
      'basePrice', 
      'averageRating', 
      'reviewCount',
      'bookingCount',
      'viewCount',
      'durationDays',
      'title'
    ];

    if (validSortFields.includes(sortBy as string)) {
      orderBy[sortBy as string] = sortOrder === 'asc' ? 'asc' : 'desc';
    } else {
      orderBy.createdAt = 'desc';
    }

    // Execute query with pagination
    const [holidays, total] = await Promise.all([
      prisma.holiday.findMany({
        where,
        skip,
        take: limit,
        orderBy,
        select: {
          id: true,
          slug: true,
          title: true,
          subtitle: true,
          shortDescription: true,
          theme: true,
          difficulty: true,
          country: true,
          city: true,
          region: true,
          basePrice: true,
          currency: true,
          discountPrice: true,
          durationDays: true,
          durationNights: true,
          coverImage: true,
          averageRating: true,
          reviewCount: true,
          bookingCount: true,
          startDate: true,
          endDate: true,
          isYearRound: true,
          maxParticipants: true,
        },
      }),
      prisma.holiday.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    res.json({
      success: true,
      data: holidays,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
      filters: {
        country,
        city,
        theme,
        difficulty,
        minPrice,
        maxPrice,
        minDuration,
        maxDuration,
        sortBy,
        sortOrder,
      },
    });
  } catch (error) {
    console.error('Error fetching holidays:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch holidays',
      error: process.env.NODE_ENV === 'development' ? error : undefined,
    });
  }
};

/**
 * Get single holiday by ID or slug
 * GET /api/v1/holidays/:id
 */
export const getHolidayById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Try to find by ID first, then by slug
    const holiday = await prisma.holiday.findFirst({
      where: {
        OR: [
          { id },
          { slug: id }
        ],
        status: HolidayStatus.PUBLISHED,
      },
      include: {
        itinerary: {
          orderBy: { day: 'asc' },
        },
        inclusions: true,
        exclusions: true,
        partner: {
          select: {
            id: true,
            companyName: true,
            logo: true,
            rating: true,
            verified: true,
          },
        },
        reviews: {
          take: 5,
          orderBy: { createdAt: 'desc' },
          include: {
            user: {
              select: {
                id: true,
                displayName: true,
                firstName: true,
                lastName: true,
                avatar: true,
              },
            },
          },
        },
      },
    });

    if (!holiday) {
      return res.status(404).json({
        success: false,
        message: 'Holiday not found',
      });
    }

    // Increment view count asynchronously
    prisma.holiday.update({
      where: { id: holiday.id },
      data: { viewCount: { increment: 1 } },
    }).catch(err => console.error('Failed to increment view count:', err));

    res.json({
      success: true,
      data: holiday,
    });
  } catch (error) {
    console.error('Error fetching holiday:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch holiday',
      error: process.env.NODE_ENV === 'development' ? error : undefined,
    });
  }
};

/**
 * Advanced search holidays with full-text search, filters, and relevance scoring
 * GET /api/v1/holidays/search
 */
export const searchHolidays = async (req: Request, res: Response) => {
  try {
    const { 
      q, 
      page = 1, 
      limit = 10,
      theme,
      difficulty,
      country,
      city,
      minPrice,
      maxPrice,
      minDuration,
      maxDuration,
      minRating,
      sortBy = 'relevance',
      sortOrder = 'desc'
    } = req.query;

    if (!q || typeof q !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Search query is required',
      });
    }

    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    const searchTerm = q.toLowerCase().trim();
    const searchWords = searchTerm.split(/\s+/);

    // Build where clause with filters
    const where: any = {
      status: HolidayStatus.PUBLISHED,
      AND: [],
    };

    // Full-text search across multiple fields
    const searchConditions = {
      OR: [
        { title: { contains: searchTerm, mode: 'insensitive' } },
        { description: { contains: searchTerm, mode: 'insensitive' } },
        { shortDescription: { contains: searchTerm, mode: 'insensitive' } },
        { city: { contains: searchTerm, mode: 'insensitive' } },
        { country: { contains: searchTerm, mode: 'insensitive' } },
        { region: { contains: searchTerm, mode: 'insensitive' } },
        // Search for individual words
        ...searchWords.map(word => ({
          OR: [
            { title: { contains: word, mode: 'insensitive' } },
            { description: { contains: word, mode: 'insensitive' } },
            { keywords: { has: word } },
          ]
        }))
      ]
    };

    where.AND.push(searchConditions);

    // Apply additional filters
    if (theme && Object.values(HolidayTheme).includes(theme as HolidayTheme)) {
      where.theme = theme as HolidayTheme;
    }

    if (difficulty && Object.values(DifficultyLevel).includes(difficulty as DifficultyLevel)) {
      where.difficulty = difficulty as DifficultyLevel;
    }

    if (country) {
      where.country = { contains: country as string, mode: 'insensitive' };
    }

    if (city) {
      where.city = { contains: city as string, mode: 'insensitive' };
    }

    // Price range filter
    if (minPrice || maxPrice) {
      where.basePrice = {};
      if (minPrice) {
        where.basePrice.gte = parseFloat(minPrice as string);
      }
      if (maxPrice) {
        where.basePrice.lte = parseFloat(maxPrice as string);
      }
    }

    // Duration filter
    if (minDuration || maxDuration) {
      where.durationDays = {};
      if (minDuration) {
        where.durationDays.gte = parseInt(minDuration as string);
      }
      if (maxDuration) {
        where.durationDays.lte = parseInt(maxDuration as string);
      }
    }

    // Rating filter
    if (minRating) {
      where.averageRating = { gte: parseFloat(minRating as string) };
    }

    // Build orderBy clause
    let orderBy: any = {};
    
    if (sortBy === 'relevance') {
      // For relevance, we'll sort by multiple factors
      orderBy = [
        { averageRating: 'desc' },
        { reviewCount: 'desc' },
        { bookingCount: 'desc' },
      ];
    } else if (sortBy === 'popularity') {
      orderBy = [
        { bookingCount: 'desc' },
        { viewCount: 'desc' },
        { reviewCount: 'desc' },
      ];
    } else if (sortBy === 'price') {
      orderBy = { basePrice: sortOrder === 'asc' ? 'asc' : 'desc' };
    } else if (sortBy === 'rating') {
      orderBy = [
        { averageRating: sortOrder === 'asc' ? 'asc' : 'desc' },
        { reviewCount: 'desc' },
      ];
    } else if (sortBy === 'date') {
      orderBy = { publishedAt: sortOrder === 'asc' ? 'asc' : 'desc' };
    } else if (sortBy === 'duration') {
      orderBy = { durationDays: sortOrder === 'asc' ? 'asc' : 'desc' };
    } else {
      orderBy = { averageRating: 'desc' };
    }

    // Execute search query
    const [holidays, total] = await Promise.all([
      prisma.holiday.findMany({
        where,
        skip,
        take: limitNum,
        orderBy,
        select: {
          id: true,
          slug: true,
          title: true,
          shortDescription: true,
          theme: true,
          difficulty: true,
          country: true,
          city: true,
          region: true,
          basePrice: true,
          currency: true,
          discountPrice: true,
          durationDays: true,
          durationNights: true,
          coverImage: true,
          averageRating: true,
          reviewCount: true,
          bookingCount: true,
          viewCount: true,
        },
      }),
      prisma.holiday.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limitNum);

    // Track search analytics asynchronously
    const filters = {
      theme,
      difficulty,
      country,
      city,
      minPrice,
      maxPrice,
      minDuration,
      maxDuration,
      minRating,
      sortBy,
    };
    
    trackSearchAnalytics(
      searchTerm, 
      total, 
      filters,
      req.user?.id
    ).catch(err => console.error('Analytics tracking failed:', err));

    res.json({
      success: true,
      data: holidays,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages,
        hasNextPage: pageNum < totalPages,
        hasPrevPage: pageNum > 1,
      },
      search: {
        query: q,
        resultsCount: total,
        filters,
      },
    });
  } catch (error) {
    console.error('Error searching holidays:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to search holidays',
      error: process.env.NODE_ENV === 'development' ? error : undefined,
    });
  }
};

/**
 * Get search suggestions based on partial query
 * GET /api/v1/holidays/search/suggestions
 */
export const getSearchSuggestions = async (req: Request, res: Response) => {
  try {
    const { q, limit = 5 } = req.query;

    if (!q || typeof q !== 'string' || q.length < 2) {
      return res.json({
        success: true,
        data: [],
      });
    }

    const searchTerm = q.toLowerCase().trim();
    const limitNum = parseInt(limit as string);

    // Get suggestions from titles, cities, and countries
    const [titleSuggestions, locationSuggestions] = await Promise.all([
      prisma.holiday.findMany({
        where: {
          status: HolidayStatus.PUBLISHED,
          title: { contains: searchTerm, mode: 'insensitive' },
        },
        select: {
          title: true,
          slug: true,
        },
        take: limitNum,
        orderBy: { bookingCount: 'desc' },
      }),
      prisma.holiday.groupBy({
        by: ['city', 'country'],
        where: {
          status: HolidayStatus.PUBLISHED,
          OR: [
            { city: { contains: searchTerm, mode: 'insensitive' } },
            { country: { contains: searchTerm, mode: 'insensitive' } },
          ],
        },
        take: limitNum,
      }),
    ]);

    const suggestions = [
      ...titleSuggestions.map(h => ({
        type: 'holiday',
        text: h.title,
        slug: h.slug,
      })),
      ...locationSuggestions.map(l => ({
        type: 'location',
        text: `${l.city}, ${l.country}`,
      })),
    ].slice(0, limitNum);

    res.json({
      success: true,
      data: suggestions,
    });
  } catch (error) {
    console.error('Error getting search suggestions:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get search suggestions',
      error: process.env.NODE_ENV === 'development' ? error : undefined,
    });
  }
};

/**
 * Get popular search terms
 * GET /api/v1/holidays/search/popular
 */
export const getPopularSearches = async (req: Request, res: Response) => {
  try {
    const { limit = 10 } = req.query;
    const limitNum = parseInt(limit as string);

    const popularSearches = await prisma.searchAnalytics.groupBy({
      by: ['searchTerm'],
      _count: {
        searchTerm: true,
      },
      _avg: {
        resultsCount: true,
      },
      orderBy: {
        _count: {
          searchTerm: 'desc',
        },
      },
      take: limitNum,
      where: {
        createdAt: {
          gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Last 30 days
        },
        resultsCount: {
          gt: 0, // Only include searches that returned results
        },
      },
    });

    res.json({
      success: true,
      data: popularSearches.map(s => ({
        term: s.searchTerm,
        searchCount: s._count.searchTerm,
        avgResults: Math.round(s._avg.resultsCount || 0),
      })),
    });
  } catch (error) {
    console.error('Error getting popular searches:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get popular searches',
      error: process.env.NODE_ENV === 'development' ? error : undefined,
    });
  }
};

/**
 * Create a new holiday
 * POST /api/v1/holidays
 */
export const createHoliday = async (req: Request, res: Response) => {
  try {
    const {
      title,
      subtitle,
      description,
      shortDescription,
      theme,
      difficulty,
      status,
      country,
      city,
      region,
      address,
      latitude,
      longitude,
      basePrice,
      currency,
      discountPrice,
      installmentAvailable,
      durationDays,
      durationNights,
      minParticipants,
      maxParticipants,
      startDate,
      endDate,
      isYearRound,
      coverImage,
      images,
      videoUrl,
      metaTitle,
      metaDescription,
      keywords,
      itinerary,
      inclusions,
      exclusions,
    } = req.body;

    // Generate slug from title
    const slug = generateSlug(title);

    // Check if slug already exists
    const existingHoliday = await prisma.holiday.findUnique({
      where: { slug },
    });

    if (existingHoliday) {
      return res.status(409).json({
        success: false,
        message: 'A holiday with this title already exists',
      });
    }

    // Get partner ID from authenticated user
    const partnerId = req.user?.partnerId || null;

    // Create holiday with related data
    const holiday = await prisma.holiday.create({
      data: {
        slug,
        title,
        subtitle,
        description,
        shortDescription,
        theme,
        difficulty,
        status: status || HolidayStatus.DRAFT,
        country,
        city,
        region,
        address,
        latitude,
        longitude,
        basePrice,
        currency: currency || 'USD',
        discountPrice,
        installmentAvailable: installmentAvailable || false,
        durationDays,
        durationNights,
        minParticipants: minParticipants || 1,
        maxParticipants,
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
        isYearRound: isYearRound || false,
        coverImage,
        images: images || [],
        videoUrl,
        metaTitle,
        metaDescription,
        keywords: keywords || [],
        partnerId,
        publishedAt: status === HolidayStatus.PUBLISHED ? new Date() : null,
        // Create related data
        itinerary: itinerary ? {
          create: itinerary,
        } : undefined,
        inclusions: inclusions ? {
          create: inclusions,
        } : undefined,
        exclusions: exclusions ? {
          create: exclusions,
        } : undefined,
      },
      include: {
        itinerary: true,
        inclusions: true,
        exclusions: true,
        partner: {
          select: {
            id: true,
            companyName: true,
            logo: true,
          },
        },
      },
    });

    res.status(201).json({
      success: true,
      message: 'Holiday created successfully',
      data: holiday,
    });
  } catch (error) {
    console.error('Error creating holiday:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create holiday',
      error: process.env.NODE_ENV === 'development' ? error : undefined,
    });
  }
};

/**
 * Update an existing holiday
 * PUT /api/v1/holidays/:id
 */
export const updateHoliday = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Check if holiday exists
    const existingHoliday = await prisma.holiday.findUnique({
      where: { id },
    });

    if (!existingHoliday) {
      return res.status(404).json({
        success: false,
        message: 'Holiday not found',
      });
    }

    // If title is being updated, regenerate slug
    if (updateData.title && updateData.title !== existingHoliday.title) {
      const newSlug = generateSlug(updateData.title);
      
      // Check if new slug conflicts with another holiday
      const slugConflict = await prisma.holiday.findFirst({
        where: {
          slug: newSlug,
          id: { not: id },
        },
      });

      if (slugConflict) {
        return res.status(409).json({
          success: false,
          message: 'A holiday with this title already exists',
        });
      }

      updateData.slug = newSlug;
    }

    // Convert date strings to Date objects
    if (updateData.startDate) {
      updateData.startDate = new Date(updateData.startDate);
    }
    if (updateData.endDate) {
      updateData.endDate = new Date(updateData.endDate);
    }

    // If status is being changed to PUBLISHED, set publishedAt
    if (updateData.status === HolidayStatus.PUBLISHED && !existingHoliday.publishedAt) {
      updateData.publishedAt = new Date();
    }

    // Update holiday
    const holiday = await prisma.holiday.update({
      where: { id },
      data: updateData,
      include: {
        itinerary: true,
        inclusions: true,
        exclusions: true,
        partner: {
          select: {
            id: true,
            companyName: true,
            logo: true,
          },
        },
      },
    });

    res.json({
      success: true,
      message: 'Holiday updated successfully',
      data: holiday,
    });
  } catch (error) {
    console.error('Error updating holiday:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update holiday',
      error: process.env.NODE_ENV === 'development' ? error : undefined,
    });
  }
};

/**
 * Delete a holiday (soft delete by setting status to ARCHIVED)
 * DELETE /api/v1/holidays/:id
 */
export const deleteHoliday = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Check if holiday exists
    const existingHoliday = await prisma.holiday.findUnique({
      where: { id },
    });

    if (!existingHoliday) {
      return res.status(404).json({
        success: false,
        message: 'Holiday not found',
      });
    }

    // Soft delete by setting status to ARCHIVED
    await prisma.holiday.update({
      where: { id },
      data: {
        status: HolidayStatus.ARCHIVED,
      },
    });

    res.json({
      success: true,
      message: 'Holiday deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting holiday:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete holiday',
      error: process.env.NODE_ENV === 'development' ? error : undefined,
    });
  }
};
