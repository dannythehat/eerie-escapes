import { Router } from 'express';

const router = Router();

// GET /api/v1/reviews - Get reviews
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Get reviews endpoint - Coming soon',
    data: [],
  });
});

// POST /api/v1/reviews - Create review
router.post('/', (req, res) => {
  res.json({
    success: true,
    message: 'Create review endpoint - Coming soon',
    data: null,
  });
});

export default router;
