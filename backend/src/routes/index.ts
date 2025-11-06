import { Router } from 'express';
import holidayRoutes from './holiday.routes';
import userRoutes from './user.routes';
import bookingRoutes from './booking.routes';
import reviewRoutes from './review.routes';
import partnerRoutes from './partner.routes';

const router = Router();

// API routes
router.use('/holidays', holidayRoutes);
router.use('/users', userRoutes);
router.use('/bookings', bookingRoutes);
router.use('/reviews', reviewRoutes);
router.use('/partners', partnerRoutes);

// API info endpoint
router.get('/', (req, res) => {
  res.json({
    message: 'Eerie Escapes API v1',
    version: '1.0.0',
    endpoints: {
      holidays: '/api/v1/holidays',
      users: '/api/v1/users',
      bookings: '/api/v1/bookings',
      reviews: '/api/v1/reviews',
      partners: '/api/v1/partners',
    },
  });
});

export default router;
