import { Router } from 'express';

const router = Router();

// GET /api/v1/holidays - Get all holidays
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Get all holidays endpoint - Coming in Day 6',
    data: [],
  });
});

// GET /api/v1/holidays/:id - Get single holiday
router.get('/:id', (req, res) => {
  res.json({
    success: true,
    message: 'Get single holiday endpoint - Coming in Day 6',
    data: null,
  });
});

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
