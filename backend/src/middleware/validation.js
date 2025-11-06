const { z } = require('zod');

/**
 * Profile validation schema
 */
const profileSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  bio: z.string().max(500).optional(),
  location: z.string().max(100).optional(),
});

/**
 * Preferences validation schema
 */
const preferencesSchema = z.object({
  emailNotifications: z.boolean().optional(),
  pushNotifications: z.boolean().optional(),
  newsletter: z.boolean().optional(),
  themes: z.array(z.string()).optional(),
  priceRange: z.object({
    min: z.number().min(0),
    max: z.number().min(0),
  }).optional(),
  travelStyle: z.enum(['budget', 'moderate', 'luxury']).optional(),
  language: z.string().length(2).optional(),
});

/**
 * Validate profile update
 */
const validateProfile = (req, res, next) => {
  try {
    profileSchema.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json({ 
      error: 'Validation failed',
      details: error.errors 
    });
  }
};

/**
 * Validate preferences update
 */
const validatePreferences = (req, res, next) => {
  try {
    preferencesSchema.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json({ 
      error: 'Validation failed',
      details: error.errors 
    });
  }
};

module.exports = {
  validateProfile,
  validatePreferences,
};
