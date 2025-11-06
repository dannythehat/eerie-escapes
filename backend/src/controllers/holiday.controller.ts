import { Request, Response } from 'express';
import { PrismaClient, HolidayTheme, HolidayStatus } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Get all holidays with pagination and filtering
 * GET /api/v1/holidays
 */
export const getAllHolidays = async (req: Request, res: Response) => {
  try {
    // Pagination
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    // Filters
    const { country, city, theme, startDate, endDate, minPrice, maxPrice, status } = req.query;

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

    // Status filter (default to PUBLISHED for public API)
    if (status && Object.values(HolidayStatus).includes(status as HolidayStatus)) {
      where.status = status as HolidayStatus;
    } else {
      where.status = HolidayStatus.PUBLISHED;
    }

    // Execute query with pagination
    const [holidays, total] = await Promise.all([
      prisma.holiday.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
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
 * Search holidays with full-text search
 * GET /api/v1/holidays/search
 */
export const searchHolidays = async (req: Request, res: Response) => {
  try {
    const { q, page = 1, limit = 10 } = req.query;

    if (!q || typeof q !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Search query is required',
      });
    }

    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    const searchTerm = q.toLowerCase();

    const [holidays, total] = await Promise.all([
      prisma.holiday.findMany({
        where: {
          status: HolidayStatus.PUBLISHED,
          OR: [
            { title: { contains: searchTerm, mode: 'insensitive' } },
            { description: { contains: searchTerm, mode: 'insensitive' } },
            { city: { contains: searchTerm, mode: 'insensitive' } },
            { country: { contains: searchTerm, mode: 'insensitive' } },
          ],
        },
        skip,
        take: limitNum,
        orderBy: { averageRating: 'desc' },
        select: {
          id: true,
          slug: true,
          title: true,
          shortDescription: true,
          theme: true,
          country: true,
          city: true,
          basePrice: true,
          currency: true,
          coverImage: true,
          averageRating: true,
          reviewCount: true,
        },
      }),
      prisma.holiday.count({
        where: {
          status: HolidayStatus.PUBLISHED,
          OR: [
            { title: { contains: searchTerm, mode: 'insensitive' } },
            { description: { contains: searchTerm, mode: 'insensitive' } },
            { city: { contains: searchTerm, mode: 'insensitive' } },
            { country: { contains: searchTerm, mode: 'insensitive' } },
          ],
        },
      }),
    ]);

    const totalPages = Math.ceil(total / limitNum);

    res.json({
      success: true,
      data: holidays,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages,
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
