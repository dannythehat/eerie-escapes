import { Router } from 'express';

const router = Router();

// GET /api/v1/users/profile - Get user profile
router.get('/profile', (req, res) => {
  res.json({
    success: true,
    message: 'Get user profile endpoint - Coming in Day 10',
    data: null,
  });
});

// PUT /api/v1/users/profile - Update user profile
router.put('/profile', (req, res) => {
  res.json({
    success: true,
    message: 'Update user profile endpoint - Coming in Day 10',
    data: null,
  });
});

export default router;
