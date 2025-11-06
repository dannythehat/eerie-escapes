import request from 'supertest';
import { PrismaClient, UserRole, HolidayStatus } from '@prisma/client';
import jwt from 'jsonwebtoken';
import app from '../../src/app';

const prisma = new PrismaClient();

// Helper function to generate JWT token
const generateToken = (userId: string, email: string, role: UserRole) => {
  const jwtSecret = process.env.JWT_SECRET || 'your-secret-key';
  return jwt.sign({ userId, email, role }, jwtSecret, { expiresIn: '1h' });
};

describe('Holiday API CRUD Integration Tests', () => {
  let adminToken: string;
  let partnerToken: string;
  let userToken: string;
  let partnerId: string;
  let testHolidayId: string;

  beforeAll(async () => {
    // Create test users
    const admin = await prisma.user.upsert({
      where: { email: 'admin@test.com' },
      update: {},
      create: {
        email: 'admin@test.com',
        password: 'hashedpassword',
        role: UserRole.ADMIN,
        firstName: 'Admin',
        lastName: 'User',
      },
    });

    const partnerUser = await prisma.user.upsert({
      where: { email: 'partner@test.com' },
      update: {},
      create: {
        email: 'partner@test.com',
        password: 'hashedpassword',
        role: UserRole.PARTNER,
        firstName: 'Partner',
        lastName: 'User',
      },
    });

    const regularUser = await prisma.user.upsert({
      where: { email: 'user@test.com' },
      update: {},
      create: {
        email: 'user@test.com',
        password: 'hashedpassword',
        role: UserRole.USER,
        firstName: 'Regular',
        lastName: 'User',
      },
    });

    // Create partner profile
    const partner = await prisma.partner.upsert({
      where: { userId: partnerUser.id },
      update: {},
      create: {
        userId: partnerUser.id,
        companyName: 'Test Tours Inc',
        description: 'Test tour company',
        website: 'https://test.com',
        verified: true,
      },
    });

    partnerId = partner.id;

    // Generate tokens
    adminToken = generateToken(admin.id, admin.email, admin.role);
    partnerToken = generateToken(partnerUser.id, partnerUser.email, partnerUser.role);
    userToken = generateToken(regularUser.id, regularUser.email, regularUser.role);
  });

  afterAll(async () => {
    // Clean up test data
    await prisma.holiday.deleteMany({
      where: {
        title: {
          contains: 'TEST_HOLIDAY',
        },
      },
    });
    await prisma.$disconnect();
  });

  describe('POST /api/v1/holidays', () => {
    const validHolidayData = {
      title: 'TEST_HOLIDAY Haunted Castle Tour',
      description: 'Experience the most haunted castle in Europe with our expert guides. This tour includes exclusive access to restricted areas.',
      theme: 'HAUNTED_TOURS',
      difficulty: 'MODERATE',
      country: 'Romania',
      city: 'Transylvania',
      basePrice: 499.99,
      durationDays: 3,
      durationNights: 2,
      maxParticipants: 15,
      coverImage: 'https://example.com/castle.jpg',
    };

    it('should create a holiday as admin', async () => {
      const response = await request(app)
        .post('/api/v1/holidays')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(validHolidayData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('id');
      expect(response.body.data.title).toBe(validHolidayData.title);
      expect(response.body.data.slug).toBe('test-holiday-haunted-castle-tour');
      
      testHolidayId = response.body.data.id;
    });

    it('should create a holiday as partner', async () => {
      const response = await request(app)
        .post('/api/v1/holidays')
        .set('Authorization', `Bearer ${partnerToken}`)
        .send({
          ...validHolidayData,
          title: 'TEST_HOLIDAY Partner Tour',
        })
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.partnerId).toBe(partnerId);
    });

    it('should reject creation without authentication', async () => {
      const response = await request(app)
        .post('/api/v1/holidays')
        .send(validHolidayData)
        .expect(401);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('Authentication required');
    });

    it('should reject creation as regular user', async () => {
      const response = await request(app)
        .post('/api/v1/holidays')
        .set('Authorization', `Bearer ${userToken}`)
        .send(validHolidayData)
        .expect(403);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('Insufficient permissions');
    });

    it('should reject invalid data', async () => {
      const response = await request(app)
        .post('/api/v1/holidays')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          title: 'Too short',
          description: 'Too short',
        })
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('Validation failed');
      expect(response.body.errors).toBeDefined();
    });

    it('should reject duplicate title', async () => {
      const response = await request(app)
        .post('/api/v1/holidays')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(validHolidayData)
        .expect(409);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('already exists');
    });

    it('should reject discount price >= base price', async () => {
      const response = await request(app)
        .post('/api/v1/holidays')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          ...validHolidayData,
          title: 'TEST_HOLIDAY Invalid Pricing',
          basePrice: 100,
          discountPrice: 150,
        })
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('Discount price must be less than base price');
    });

    it('should reject end date before start date', async () => {
      const response = await request(app)
        .post('/api/v1/holidays')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          ...validHolidayData,
          title: 'TEST_HOLIDAY Invalid Dates',
          startDate: '2025-12-31T00:00:00Z',
          endDate: '2025-01-01T00:00:00Z',
        })
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('End date must be after start date');
    });

    it('should create holiday with itinerary, inclusions, and exclusions', async () => {
      const response = await request(app)
        .post('/api/v1/holidays')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          ...validHolidayData,
          title: 'TEST_HOLIDAY Complete Package',
          itinerary: [
            {
              day: 1,
              title: 'Arrival Day',
              description: 'Check-in and welcome dinner',
              activities: ['Check-in', 'Welcome dinner'],
              meals: ['Dinner'],
            },
          ],
          inclusions: [
            {
              item: 'Accommodation',
              description: '2 nights in haunted hotel',
            },
          ],
          exclusions: [
            {
              item: 'Flights',
              description: 'International flights not included',
            },
          ],
        })
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.itinerary).toHaveLength(1);
      expect(response.body.data.inclusions).toHaveLength(1);
      expect(response.body.data.exclusions).toHaveLength(1);
    });
  });

  describe('PUT /api/v1/holidays/:id', () => {
    it('should update holiday as admin', async () => {
      const response = await request(app)
        .put(`/api/v1/holidays/${testHolidayId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          title: 'TEST_HOLIDAY Updated Castle Tour',
          basePrice: 599.99,
        })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.title).toBe('TEST_HOLIDAY Updated Castle Tour');
      expect(response.body.data.basePrice).toBe('599.99');
      expect(response.body.data.slug).toBe('test-holiday-updated-castle-tour');
    });

    it('should reject update without authentication', async () => {
      const response = await request(app)
        .put(`/api/v1/holidays/${testHolidayId}`)
        .send({ title: 'Updated Title' })
        .expect(401);

      expect(response.body.success).toBe(false);
    });

    it('should reject update as regular user', async () => {
      const response = await request(app)
        .put(`/api/v1/holidays/${testHolidayId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({ title: 'Updated Title' })
        .expect(403);

      expect(response.body.success).toBe(false);
    });

    it('should reject update of non-existent holiday', async () => {
      const response = await request(app)
        .put('/api/v1/holidays/non-existent-id')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ title: 'Updated Title' })
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('not found');
    });

    it('should update status to PUBLISHED and set publishedAt', async () => {
      const response = await request(app)
        .put(`/api/v1/holidays/${testHolidayId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          status: 'PUBLISHED',
        })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.status).toBe('PUBLISHED');
      expect(response.body.data.publishedAt).toBeDefined();
    });

    it('should allow partner to update own holiday', async () => {
      // First create a holiday as partner
      const createResponse = await request(app)
        .post('/api/v1/holidays')
        .set('Authorization', `Bearer ${partnerToken}`)
        .send({
          title: 'TEST_HOLIDAY Partner Owned Tour',
          description: 'A tour owned by partner for testing update permissions',
          theme: 'HAUNTED_TOURS',
          difficulty: 'EASY',
          country: 'USA',
          city: 'Salem',
          basePrice: 299.99,
          durationDays: 2,
          durationNights: 1,
          maxParticipants: 10,
          coverImage: 'https://example.com/tour.jpg',
        })
        .expect(201);

      const partnerHolidayId = createResponse.body.data.id;

      // Now update it
      const updateResponse = await request(app)
        .put(`/api/v1/holidays/${partnerHolidayId}`)
        .set('Authorization', `Bearer ${partnerToken}`)
        .send({
          basePrice: 349.99,
        })
        .expect(200);

      expect(updateResponse.body.success).toBe(true);
      expect(updateResponse.body.data.basePrice).toBe('349.99');
    });
  });

  describe('DELETE /api/v1/holidays/:id', () => {
    let deleteTestHolidayId: string;

    beforeEach(async () => {
      // Create a holiday to delete
      const response = await request(app)
        .post('/api/v1/holidays')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          title: 'TEST_HOLIDAY To Be Deleted',
          description: 'This holiday will be deleted in tests',
          theme: 'HAUNTED_TOURS',
          difficulty: 'EASY',
          country: 'USA',
          city: 'Boston',
          basePrice: 199.99,
          durationDays: 1,
          durationNights: 0,
          maxParticipants: 20,
          coverImage: 'https://example.com/delete.jpg',
        })
        .expect(201);

      deleteTestHolidayId = response.body.data.id;
    });

    it('should delete holiday as admin (soft delete)', async () => {
      const response = await request(app)
        .delete(`/api/v1/holidays/${deleteTestHolidayId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toContain('deleted successfully');

      // Verify it's archived, not actually deleted
      const holiday = await prisma.holiday.findUnique({
        where: { id: deleteTestHolidayId },
      });

      expect(holiday).toBeDefined();
      expect(holiday?.status).toBe(HolidayStatus.ARCHIVED);
    });

    it('should reject delete without authentication', async () => {
      const response = await request(app)
        .delete(`/api/v1/holidays/${deleteTestHolidayId}`)
        .expect(401);

      expect(response.body.success).toBe(false);
    });

    it('should reject delete as regular user', async () => {
      const response = await request(app)
        .delete(`/api/v1/holidays/${deleteTestHolidayId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(403);

      expect(response.body.success).toBe(false);
    });

    it('should reject delete of non-existent holiday', async () => {
      const response = await request(app)
        .delete('/api/v1/holidays/non-existent-id')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('not found');
    });
  });
});
