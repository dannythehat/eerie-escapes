import { Router } from 'express';

const router = Router();

// GET /api/v1/partners - Get partners
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Get partners endpoint - Coming soon',
    data: [],
  });
});

// POST /api/v1/partners - Apply as partner
router.post('/', (req, res) => {
  res.json({
    success: true,
    message: 'Partner application endpoint - Coming soon',
    data: null,
  });
});

export default router;
