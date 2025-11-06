import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import {
  getAllHolidays,
  getHolidayById,
  searchHolidays,
} from '../../src/controllers/holiday.controller';

// Mock Prisma Client
jest.mock('@prisma/client', () => {
  const mockPrismaClient = {
    holiday: {
      findMany: jest.fn(),
      count: jest.fn(),
      findFirst: jest.fn(),
      update: jest.fn(),
    },
    $disconnect: jest.fn(),
  };
  return {
    PrismaClient: jest.fn(() => mockPrismaClient),
    HolidayTheme: {
      HAUNTED_TOURS: 'HAUNTED_TOURS',
      CRIME_SCENES: 'CRIME_SCENES',
      PARANORMAL: 'PARANORMAL',
    },
    HolidayStatus: {
      DRAFT: 'DRAFT',
      PUBLISHED: 'PUBLISHED',
      ARCHIVED: 'ARCHIVED',
      SOLD_OUT: 'SOLD_OUT',
    },
  };
});

const prisma = new PrismaClient();

describe('Holiday Controller Unit Tests', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let responseObject: any;

  beforeEach(() => {
    mockRequest = {
      query: {},
      params: {},
    };
    responseObject = {
      success: false,
      data: null,
      message: '',
    };
    mockResponse = {
      json: jest.fn().mockReturnValue(responseObject),
      status: jest.fn().mockReturnThis(),
    };
    jest.clearAllMocks();
  });

  describe('getAllHolidays', () => {
    it('should return paginated holidays with default parameters', async () => {
      const mockHolidays = [
        {
          id: '1',
          slug: 'haunted-salem-tour',
          title: 'Haunted Salem Tour',
          theme: 'HAUNTED_TOURS',
          country: 'USA',
          city: 'Salem',
          basePrice: 299.99,
        },
      ];

      (prisma.holiday.findMany as jest.Mock).mockResolvedValue(mockHolidays);
      (prisma.holiday.count as jest.Mock).mockResolvedValue(1);

      await getAllHolidays(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.json).toHaveBeenCalledWith({
        success: true,
        data: mockHolidays,
        pagination: {
          page: 1,
          limit: 10,
          total: 1,
          totalPages: 1,
          hasNextPage: false,
          hasPrevPage: false,
        },
      });
    });

    it('should apply pagination parameters correctly', async () => {
      mockRequest.query = { page: '2', limit: '5' };

      (prisma.holiday.findMany as jest.Mock).mockResolvedValue([]);
      (prisma.holiday.count as jest.Mock).mockResolvedValue(15);

      await getAllHolidays(mockRequest as Request, mockResponse as Response);

      expect(prisma.holiday.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          skip: 5,
          take: 5,
        })
      );

      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          pagination: expect.objectContaining({
            page: 2,
            limit: 5,
            total: 15,
            totalPages: 3,
          }),
        })
      );
    });

    it('should filter by country', async () => {
      mockRequest.query = { country: 'USA' };

      (prisma.holiday.findMany as jest.Mock).mockResolvedValue([]);
      (prisma.holiday.count as jest.Mock).mockResolvedValue(0);

      await getAllHolidays(mockRequest as Request, mockResponse as Response);

      expect(prisma.holiday.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            country: { contains: 'USA', mode: 'insensitive' },
          }),
        })
      );
    });

    it('should filter by theme', async () => {
      mockRequest.query = { theme: 'HAUNTED_TOURS' };

      (prisma.holiday.findMany as jest.Mock).mockResolvedValue([]);
      (prisma.holiday.count as jest.Mock).mockResolvedValue(0);

      await getAllHolidays(mockRequest as Request, mockResponse as Response);

      expect(prisma.holiday.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            theme: 'HAUNTED_TOURS',
          }),
        })
      );
    });

    it('should filter by price range', async () => {
      mockRequest.query = { minPrice: '100', maxPrice: '500' };

      (prisma.holiday.findMany as jest.Mock).mockResolvedValue([]);
      (prisma.holiday.count as jest.Mock).mockResolvedValue(0);

      await getAllHolidays(mockRequest as Request, mockResponse as Response);

      expect(prisma.holiday.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            basePrice: {
              gte: 100,
              lte: 500,
            },
          }),
        })
      );
    });

    it('should handle errors gracefully', async () => {
      (prisma.holiday.findMany as jest.Mock).mockRejectedValue(
        new Error('Database error')
      );

      await getAllHolidays(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          message: 'Failed to fetch holidays',
        })
      );
    });
  });

  describe('getHolidayById', () => {
    it('should return a holiday by ID', async () => {
      const mockHoliday = {
        id: '1',
        slug: 'haunted-salem-tour',
        title: 'Haunted Salem Tour',
        description: 'A spooky tour',
        itinerary: [],
        inclusions: [],
        exclusions: [],
        partner: null,
        reviews: [],
      };

      mockRequest.params = { id: '1' };
      (prisma.holiday.findFirst as jest.Mock).mockResolvedValue(mockHoliday);
      (prisma.holiday.update as jest.Mock).mockResolvedValue({});

      await getHolidayById(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.json).toHaveBeenCalledWith({
        success: true,
        data: mockHoliday,
      });
    });

    it('should return a holiday by slug', async () => {
      const mockHoliday = {
        id: '1',
        slug: 'haunted-salem-tour',
        title: 'Haunted Salem Tour',
      };

      mockRequest.params = { id: 'haunted-salem-tour' };
      (prisma.holiday.findFirst as jest.Mock).mockResolvedValue(mockHoliday);
      (prisma.holiday.update as jest.Mock).mockResolvedValue({});

      await getHolidayById(mockRequest as Request, mockResponse as Response);

      expect(prisma.holiday.findFirst).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            OR: [{ id: 'haunted-salem-tour' }, { slug: 'haunted-salem-tour' }],
          }),
        })
      );
    });

    it('should return 404 when holiday not found', async () => {
      mockRequest.params = { id: 'non-existent' };
      (prisma.holiday.findFirst as jest.Mock).mockResolvedValue(null);

      await getHolidayById(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        message: 'Holiday not found',
      });
    });

    it('should increment view count', async () => {
      const mockHoliday = {
        id: '1',
        title: 'Test Holiday',
      };

      mockRequest.params = { id: '1' };
      (prisma.holiday.findFirst as jest.Mock).mockResolvedValue(mockHoliday);
      (prisma.holiday.update as jest.Mock).mockResolvedValue({});

      await getHolidayById(mockRequest as Request, mockResponse as Response);

      // Wait a bit for async update
      await new Promise(resolve => setTimeout(resolve, 100));

      expect(prisma.holiday.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: { viewCount: { increment: 1 } },
      });
    });

    it('should handle errors gracefully', async () => {
      mockRequest.params = { id: '1' };
      (prisma.holiday.findFirst as jest.Mock).mockRejectedValue(
        new Error('Database error')
      );

      await getHolidayById(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          message: 'Failed to fetch holiday',
        })
      );
    });
  });

  describe('searchHolidays', () => {
    it('should search holidays by query', async () => {
      const mockHolidays = [
        {
          id: '1',
          title: 'Haunted Tour',
          slug: 'haunted-tour',
        },
      ];

      mockRequest.query = { q: 'haunted' };
      (prisma.holiday.findMany as jest.Mock).mockResolvedValue(mockHolidays);
      (prisma.holiday.count as jest.Mock).mockResolvedValue(1);

      await searchHolidays(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.json).toHaveBeenCalledWith({
        success: true,
        data: mockHolidays,
        pagination: {
          page: 1,
          limit: 10,
          total: 1,
          totalPages: 1,
        },
      });
    });

    it('should return 400 without search query', async () => {
      mockRequest.query = {};

      await searchHolidays(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: false,
        message: 'Search query is required',
      });
    });

    it('should search across multiple fields', async () => {
      mockRequest.query = { q: 'salem' };
      (prisma.holiday.findMany as jest.Mock).mockResolvedValue([]);
      (prisma.holiday.count as jest.Mock).mockResolvedValue(0);

      await searchHolidays(mockRequest as Request, mockResponse as Response);

      expect(prisma.holiday.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            OR: expect.arrayContaining([
              { title: { contains: 'salem', mode: 'insensitive' } },
              { description: { contains: 'salem', mode: 'insensitive' } },
              { city: { contains: 'salem', mode: 'insensitive' } },
              { country: { contains: 'salem', mode: 'insensitive' } },
            ]),
          }),
        })
      );
    });

    it('should handle errors gracefully', async () => {
      mockRequest.query = { q: 'test' };
      (prisma.holiday.findMany as jest.Mock).mockRejectedValue(
        new Error('Database error')
      );

      await searchHolidays(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          message: 'Failed to search holidays',
        })
      );
    });
  });
});
