const prisma = require('../lib/prisma');
const { uploadToStorage } = require('../services/storageService');

/**
 * Get user profile
 * GET /api/users/profile
 */
exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        avatar: true,
        bio: true,
        location: true,
        preferences: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
};

/**
 * Update user profile
 * PUT /api/users/profile
 */
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, bio, location } = req.body;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        bio,
        location,
        updatedAt: new Date(),
      },
      select: {
        id: true,
        email: true,
        name: true,
        avatar: true,
        bio: true,
        location: true,
        preferences: true,
        updatedAt: true,
      },
    });

    res.json({ 
      message: 'Profile updated successfully',
      user: updatedUser 
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
};

/**
 * Upload user avatar
 * POST /api/users/avatar
 */
exports.uploadAvatar = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Upload to storage service (S3, Cloudinary, etc.)
    const avatarUrl = await uploadToStorage(req.file, `avatars/${userId}`);

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        avatar: avatarUrl,
        updatedAt: new Date(),
      },
      select: {
        id: true,
        avatar: true,
      },
    });

    res.json({ 
      message: 'Avatar uploaded successfully',
      avatar: updatedUser.avatar 
    });
  } catch (error) {
    console.error('Upload avatar error:', error);
    res.status(500).json({ error: 'Failed to upload avatar' });
  }
};

/**
 * Update user preferences
 * PUT /api/users/preferences
 */
exports.updatePreferences = async (req, res) => {
  try {
    const userId = req.user.id;
    const preferences = req.body;

    // Validate preferences structure
    const validPreferences = {
      emailNotifications: preferences.emailNotifications ?? true,
      pushNotifications: preferences.pushNotifications ?? true,
      newsletter: preferences.newsletter ?? true,
      themes: preferences.themes || [],
      priceRange: preferences.priceRange || { min: 0, max: 10000 },
      travelStyle: preferences.travelStyle || 'moderate',
      language: preferences.language || 'en',
    };

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        preferences: validPreferences,
        updatedAt: new Date(),
      },
      select: {
        id: true,
        preferences: true,
      },
    });

    res.json({ 
      message: 'Preferences updated successfully',
      preferences: updatedUser.preferences 
    });
  } catch (error) {
    console.error('Update preferences error:', error);
    res.status(500).json({ error: 'Failed to update preferences' });
  }
};

/**
 * Get saved holidays
 * GET /api/users/saved-holidays
 */
exports.getSavedHolidays = async (req, res) => {
  try {
    const userId = req.user.id;
    const { page = 1, limit = 12 } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [savedHolidays, total] = await Promise.all([
      prisma.savedHoliday.findMany({
        where: { userId },
        include: {
          holiday: {
            select: {
              id: true,
              title: true,
              slug: true,
              description: true,
              location: true,
              country: true,
              price: true,
              duration: true,
              difficulty: true,
              theme: true,
              images: true,
              rating: true,
              reviewCount: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: parseInt(limit),
      }),
      prisma.savedHoliday.count({ where: { userId } }),
    ]);

    res.json({
      savedHolidays: savedHolidays.map(sh => sh.holiday),
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error('Get saved holidays error:', error);
    res.status(500).json({ error: 'Failed to fetch saved holidays' });
  }
};

/**
 * Save a holiday
 * POST /api/users/saved-holidays/:holidayId
 */
exports.saveHoliday = async (req, res) => {
  try {
    const userId = req.user.id;
    const { holidayId } = req.params;

    // Check if holiday exists
    const holiday = await prisma.holiday.findUnique({
      where: { id: holidayId },
    });

    if (!holiday) {
      return res.status(404).json({ error: 'Holiday not found' });
    }

    // Check if already saved
    const existing = await prisma.savedHoliday.findUnique({
      where: {
        userId_holidayId: {
          userId,
          holidayId,
        },
      },
    });

    if (existing) {
      return res.status(400).json({ error: 'Holiday already saved' });
    }

    await prisma.savedHoliday.create({
      data: {
        userId,
        holidayId,
      },
    });

    res.json({ message: 'Holiday saved successfully' });
  } catch (error) {
    console.error('Save holiday error:', error);
    res.status(500).json({ error: 'Failed to save holiday' });
  }
};

/**
 * Unsave a holiday
 * DELETE /api/users/saved-holidays/:holidayId
 */
exports.unsaveHoliday = async (req, res) => {
  try {
    const userId = req.user.id;
    const { holidayId } = req.params;

    await prisma.savedHoliday.delete({
      where: {
        userId_holidayId: {
          userId,
          holidayId,
        },
      },
    });

    res.json({ message: 'Holiday removed from saved list' });
  } catch (error) {
    console.error('Unsave holiday error:', error);
    res.status(500).json({ error: 'Failed to remove saved holiday' });
  }
};
