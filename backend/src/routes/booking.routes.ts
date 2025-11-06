import { Router } from 'express';

const router = Router();

// GET /api/v1/bookings - Get user bookings
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Get bookings endpoint - Coming soon',
    data: [],
  });
});

// POST /api/v1/bookings - Create booking
router.post('/', (req, res) => {
  res.json({
    success: true,
    message: 'Create booking endpoint - Coming soon',
    data: null,
  });
});

export default router;
