import { Router } from 'express';
import {
  getAllHolidays,
  getHolidayById,
  searchHolidays,
} from '../controllers/holiday.controller';

const router = Router();

// GET /api/v1/holidays/search - Search holidays
router.get('/search', searchHolidays);

// GET /api/v1/holidays - Get all holidays with pagination and filters
router.get('/', getAllHolidays);

// GET /api/v1/holidays/:id - Get single holiday by ID or slug
router.get('/:id', getHolidayById);

// POST /api/v1/holidays - Create holiday (admin/partner only)
router.post('/', (req, res) => {
  res.json({
    success: true,
    message: 'Create holiday endpoint - Coming in Day 7',
    data: null,
  });
});

// PUT /api/v1/holidays/:id - Update holiday
router.put('/:id', (req, res) => {
  res.json({
    success: true,
    message: 'Update holiday endpoint - Coming in Day 7',
    data: null,
  });
});

// DELETE /api/v1/holidays/:id - Delete holiday
router.delete('/:id', (req, res) => {
  res.json({
    success: true,
    message: 'Delete holiday endpoint - Coming in Day 7',
    data: null,
  });
});

export default router;
