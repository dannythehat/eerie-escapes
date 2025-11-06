import { Router } from 'express';
import {
  getAllHolidays,
  getHolidayById,
  searchHolidays,
  createHoliday,
  updateHoliday,
  deleteHoliday,
} from '../controllers/holiday.controller';
import { authenticate, authorize, authorizeOwnerOrAdmin } from '../middleware/auth.middleware';
import {
  validate,
  createHolidaySchema,
  updateHolidaySchema,
  validatePricing,
  validateDates,
  validateDuration,
  validateParticipants,
} from '../middleware/validation.middleware';
import { UserRole } from '@prisma/client';

const router = Router();

// GET /api/v1/holidays/search - Search holidays (public)
router.get('/search', searchHolidays);

// GET /api/v1/holidays - Get all holidays with pagination and filters (public)
router.get('/', getAllHolidays);

// GET /api/v1/holidays/:id - Get single holiday by ID or slug (public)
router.get('/:id', getHolidayById);

// POST /api/v1/holidays - Create holiday (admin/partner only)
router.post(
  '/',
  authenticate,
  authorize(UserRole.ADMIN, UserRole.PARTNER),
  validate(createHolidaySchema),
  validatePricing,
  validateDates,
  validateDuration,
  validateParticipants,
  createHoliday
);

// PUT /api/v1/holidays/:id - Update holiday (admin or owner only)
router.put(
  '/:id',
  authenticate,
  authorizeOwnerOrAdmin('partnerId'),
  validate(updateHolidaySchema),
  validatePricing,
  validateDates,
  validateDuration,
  validateParticipants,
  updateHoliday
);

// DELETE /api/v1/holidays/:id - Delete holiday (admin or owner only)
router.delete(
  '/:id',
  authenticate,
  authorizeOwnerOrAdmin('partnerId'),
  deleteHoliday
);

export default router;
