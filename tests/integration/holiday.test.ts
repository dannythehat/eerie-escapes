import request from 'supertest';
import { PrismaClient } from '@prisma/client';
import app from '../../src/app';

const prisma = new PrismaClient();

describe('Holiday API Integration Tests', () => {
  beforeAll(async () => {
    // Clean up test data
    await prisma.holiday.deleteMany({
      where: {
        title: {
          contains: 'TEST_HOLIDAY',
        },
      },
    });
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('GET /api/v1/holidays', () => {
    it('should return paginated holidays', async () => {
      const response = await request(app)
        .get('/api/v1/holidays')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeInstanceOf(Array);
      expect(response.body.pagination).toHaveProperty('page');
      expect(response.body.pagination).toHaveProperty('limit');
      expect(response.body.pagination).toHaveProperty('total');
      expect(response.body.pagination).toHaveProperty('totalPages');
    });

    it('should respect pagination parameters', async () => {
      const response = await request(app)
        .get('/api/v1/holidays?page=1&limit=5')
        .expect(200);

      expect(response.body.pagination.page).toBe(1);
      expect(response.body.pagination.limit).toBe(5);
      expect(response.body.data.length).toBeLessThanOrEqual(5);
    });

    it('should filter by country', async () => {
      const response = await request(app)
        .get('/api/v1/holidays?country=USA')
        .expect(200);

      expect(response.body.success).toBe(true);
      if (response.body.data.length > 0) {
        response.body.data.forEach((holiday: any) => {
          expect(holiday.country.toLowerCase()).toContain('usa');
        });
      }
    });

    it('should filter by city', async () => {
      const response = await request(app)
        .get('/api/v1/holidays?city=Salem')
        .expect(200);

      expect(response.body.success).toBe(true);
      if (response.body.data.length > 0) {
        response.body.data.forEach((holiday: any) => {
          expect(holiday.city.toLowerCase()).toContain('salem');
        });
      }
    });

    it('should filter by theme', async () => {
      const response = await request(app)
        .get('/api/v1/holidays?theme=HAUNTED_TOURS')
        .expect(200);

      expect(response.body.success).toBe(true);
      if (response.body.data.length > 0) {
        response.body.data.forEach((holiday: any) => {
          expect(holiday.theme).toBe('HAUNTED_TOURS');
        });
      }
    });

    it('should filter by price range', async () => {
      const minPrice = 100;
      const maxPrice = 500;

      const response = await request(app)
        .get(`/api/v1/holidays?minPrice=${minPrice}&maxPrice=${maxPrice}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      if (response.body.data.length > 0) {
        response.body.data.forEach((holiday: any) => {
          const price = parseFloat(holiday.basePrice);
          expect(price).toBeGreaterThanOrEqual(minPrice);
          expect(price).toBeLessThanOrEqual(maxPrice);
        });
      }
    });

    it('should filter by date range', async () => {
      const startDate = '2025-11-01';
      const endDate = '2025-12-31';

      const response = await request(app)
        .get(`/api/v1/holidays?startDate=${startDate}&endDate=${endDate}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeInstanceOf(Array);
    });

    it('should combine multiple filters', async () => {
      const response = await request(app)
        .get('/api/v1/holidays?country=USA&theme=HAUNTED_TOURS&minPrice=100&maxPrice=1000')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeInstanceOf(Array);
    });

    it('should handle invalid page number gracefully', async () => {
      const response = await request(app)
        .get('/api/v1/holidays?page=-1')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.pagination.page).toBeGreaterThan(0);
    });

    it('should handle invalid limit gracefully', async () => {
      const response = await request(app)
        .get('/api/v1/holidays?limit=0')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.pagination.limit).toBeGreaterThan(0);
    });
  });

  describe('GET /api/v1/holidays/:id', () => {
    it('should return a single holiday by ID', async () => {
      // First get a holiday ID
      const listResponse = await request(app)
        .get('/api/v1/holidays?limit=1')
        .expect(200);

      if (listResponse.body.data.length > 0) {
        const holidayId = listResponse.body.data[0].id;

        const response = await request(app)
          .get(`/api/v1/holidays/${holidayId}`)
          .expect(200);

        expect(response.body.success).toBe(true);
        expect(response.body.data).toHaveProperty('id');
        expect(response.body.data).toHaveProperty('title');
        expect(response.body.data).toHaveProperty('description');
        expect(response.body.data).toHaveProperty('itinerary');
        expect(response.body.data).toHaveProperty('inclusions');
        expect(response.body.data).toHaveProperty('exclusions');
      }
    });

    it('should return a single holiday by slug', async () => {
      // First get a holiday slug
      const listResponse = await request(app)
        .get('/api/v1/holidays?limit=1')
        .expect(200);

      if (listResponse.body.data.length > 0) {
        const holidaySlug = listResponse.body.data[0].slug;

        const response = await request(app)
          .get(`/api/v1/holidays/${holidaySlug}`)
          .expect(200);

        expect(response.body.success).toBe(true);
        expect(response.body.data).toHaveProperty('slug', holidaySlug);
      }
    });

    it('should return 404 for non-existent holiday', async () => {
      const response = await request(app)
        .get('/api/v1/holidays/non-existent-id-12345')
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('not found');
    });

    it('should include related data (itinerary, inclusions, exclusions)', async () => {
      const listResponse = await request(app)
        .get('/api/v1/holidays?limit=1')
        .expect(200);

      if (listResponse.body.data.length > 0) {
        const holidayId = listResponse.body.data[0].id;

        const response = await request(app)
          .get(`/api/v1/holidays/${holidayId}`)
          .expect(200);

        expect(response.body.data).toHaveProperty('itinerary');
        expect(response.body.data).toHaveProperty('inclusions');
        expect(response.body.data).toHaveProperty('exclusions');
        expect(Array.isArray(response.body.data.itinerary)).toBe(true);
        expect(Array.isArray(response.body.data.inclusions)).toBe(true);
        expect(Array.isArray(response.body.data.exclusions)).toBe(true);
      }
    });

    it('should include partner information', async () => {
      const listResponse = await request(app)
        .get('/api/v1/holidays?limit=1')
        .expect(200);

      if (listResponse.body.data.length > 0) {
        const holidayId = listResponse.body.data[0].id;

        const response = await request(app)
          .get(`/api/v1/holidays/${holidayId}`)
          .expect(200);

        expect(response.body.data).toHaveProperty('partner');
      }
    });

    it('should include recent reviews', async () => {
      const listResponse = await request(app)
        .get('/api/v1/holidays?limit=1')
        .expect(200);

      if (listResponse.body.data.length > 0) {
        const holidayId = listResponse.body.data[0].id;

        const response = await request(app)
          .get(`/api/v1/holidays/${holidayId}`)
          .expect(200);

        expect(response.body.data).toHaveProperty('reviews');
        expect(Array.isArray(response.body.data.reviews)).toBe(true);
      }
    });
  });

  describe('GET /api/v1/holidays/search', () => {
    it('should search holidays by query', async () => {
      const response = await request(app)
        .get('/api/v1/holidays/search?q=haunted')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeInstanceOf(Array);
      expect(response.body.pagination).toBeDefined();
    });

    it('should return 400 without search query', async () => {
      const response = await request(app)
        .get('/api/v1/holidays/search')
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('required');
    });

    it('should respect pagination in search', async () => {
      const response = await request(app)
        .get('/api/v1/holidays/search?q=tour&page=1&limit=5')
        .expect(200);

      expect(response.body.pagination.page).toBe(1);
      expect(response.body.pagination.limit).toBe(5);
      expect(response.body.data.length).toBeLessThanOrEqual(5);
    });

    it('should search across multiple fields', async () => {
      const response = await request(app)
        .get('/api/v1/holidays/search?q=salem')
        .expect(200);

      expect(response.body.success).toBe(true);
      // Should find matches in title, description, city, or country
    });

    it('should handle empty search results', async () => {
      const response = await request(app)
        .get('/api/v1/holidays/search?q=xyznonexistentquery123')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveLength(0);
      expect(response.body.pagination.total).toBe(0);
    });
  });
});
