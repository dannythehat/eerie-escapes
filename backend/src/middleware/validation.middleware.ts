import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';
import { HolidayTheme, DifficultyLevel, HolidayStatus } from '@prisma/client';

/**
 * Validation schema for creating a holiday
 */
export const createHolidaySchema = z.object({
  title: z.string().min(5).max(200),
  subtitle: z.string().max(300).optional(),
  description: z.string().min(50),
  shortDescription: z.string().max(500).optional(),
  theme: z.nativeEnum(HolidayTheme),
  difficulty: z.nativeEnum(DifficultyLevel),
  status: z.nativeEnum(HolidayStatus).optional().default(HolidayStatus.DRAFT),
  country: z.string().min(2).max(100),
  city: z.string().min(2).max(100),
  region: z.string().max(100).optional(),
  address: z.string().max(500).optional(),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
  basePrice: z.number().positive(),
  currency: z.string().length(3).default('USD'),
  discountPrice: z.number().positive().optional(),
  installmentAvailable: z.boolean().default(false),
  durationDays: z.number().int().positive(),
  durationNights: z.number().int().min(0),
  minParticipants: z.number().int().positive().default(1),
  maxParticipants: z.number().int().positive(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  isYearRound: z.boolean().default(false),
  coverImage: z.string().url(),
  images: z.array(z.string().url()).default([]),
  videoUrl: z.string().url().optional(),
  metaTitle: z.string().max(60).optional(),
  metaDescription: z.string().max(160).optional(),
  keywords: z.array(z.string()).default([]),
  itinerary: z.array(z.object({
    day: z.number().int().positive(),
    title: z.string().min(3).max(200),
    description: z.string().min(10),
    activities: z.array(z.string()).default([]),
    meals: z.array(z.string()).default([]),
  })).optional(),
  inclusions: z.array(z.object({
    item: z.string().min(3).max(200),
    description: z.string().max(500).optional(),
  })).optional(),
  exclusions: z.array(z.object({
    item: z.string().min(3).max(200),
    description: z.string().max(500).optional(),
  })).optional(),
});

/**
 * Validation schema for updating a holiday
 */
export const updateHolidaySchema = z.object({
  title: z.string().min(5).max(200).optional(),
  subtitle: z.string().max(300).optional(),
  description: z.string().min(50).optional(),
  shortDescription: z.string().max(500).optional(),
  theme: z.nativeEnum(HolidayTheme).optional(),
  difficulty: z.nativeEnum(DifficultyLevel).optional(),
  status: z.nativeEnum(HolidayStatus).optional(),
  country: z.string().min(2).max(100).optional(),
  city: z.string().min(2).max(100).optional(),
  region: z.string().max(100).optional(),
  address: z.string().max(500).optional(),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
  basePrice: z.number().positive().optional(),
  currency: z.string().length(3).optional(),
  discountPrice: z.number().positive().optional(),
  installmentAvailable: z.boolean().optional(),
  durationDays: z.number().int().positive().optional(),
  durationNights: z.number().int().min(0).optional(),
  minParticipants: z.number().int().positive().optional(),
  maxParticipants: z.number().int().positive().optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  isYearRound: z.boolean().optional(),
  coverImage: z.string().url().optional(),
  images: z.array(z.string().url()).optional(),
  videoUrl: z.string().url().optional(),
  metaTitle: z.string().max(60).optional(),
  metaDescription: z.string().max(160).optional(),
  keywords: z.array(z.string()).optional(),
});

/**
 * Middleware to validate request body against a Zod schema
 */
export const validate = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        }));

        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors,
        });
      }

      return res.status(500).json({
        success: false,
        message: 'Validation error',
      });
    }
  };
};

/**
 * Custom validation: Ensure discount price is less than base price
 */
export const validatePricing = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { basePrice, discountPrice } = req.body;

  if (discountPrice && basePrice && discountPrice >= basePrice) {
    return res.status(400).json({
      success: false,
      message: 'Discount price must be less than base price',
    });
  }

  next();
};

/**
 * Custom validation: Ensure end date is after start date
 */
export const validateDates = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { startDate, endDate } = req.body;

  if (startDate && endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (end <= start) {
      return res.status(400).json({
        success: false,
        message: 'End date must be after start date',
      });
    }
  }

  next();
};

/**
 * Custom validation: Ensure duration nights is less than or equal to duration days
 */
export const validateDuration = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { durationDays, durationNights } = req.body;

  if (durationDays && durationNights && durationNights > durationDays) {
    return res.status(400).json({
      success: false,
      message: 'Duration nights cannot exceed duration days',
    });
  }

  next();
};

/**
 * Custom validation: Ensure max participants is greater than min participants
 */
export const validateParticipants = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { minParticipants, maxParticipants } = req.body;

  if (minParticipants && maxParticipants && maxParticipants < minParticipants) {
    return res.status(400).json({
      success: false,
      message: 'Max participants must be greater than or equal to min participants',
    });
  }

  next();
};
