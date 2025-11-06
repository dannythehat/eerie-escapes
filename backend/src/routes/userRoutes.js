const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticate } = require('../middleware/auth');
const { upload } = require('../middleware/upload');
const { validateProfile, validatePreferences } = require('../middleware/validation');

// All routes require authentication
router.use(authenticate);

// Profile management
router.get('/profile', userController.getProfile);
router.put('/profile', validateProfile, userController.updateProfile);

// Avatar upload
router.post('/avatar', upload.single('avatar'), userController.uploadAvatar);

// Preferences
router.put('/preferences', validatePreferences, userController.updatePreferences);

// Saved holidays
router.get('/saved-holidays', userController.getSavedHolidays);
router.post('/saved-holidays/:holidayId', userController.saveHoliday);
router.delete('/saved-holidays/:holidayId', userController.unsaveHoliday);

module.exports = router;
