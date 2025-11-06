const path = require('path');
const fs = require('fs').promises;
const crypto = require('crypto');

/**
 * Storage service for handling file uploads
 * In production, this should be replaced with S3, Cloudinary, or similar
 */

const UPLOAD_DIR = process.env.UPLOAD_DIR || './uploads';

/**
 * Initialize upload directory
 */
async function initializeStorage() {
  try {
    await fs.mkdir(UPLOAD_DIR, { recursive: true });
    await fs.mkdir(path.join(UPLOAD_DIR, 'avatars'), { recursive: true });
  } catch (error) {
    console.error('Failed to initialize storage:', error);
  }
}

/**
 * Upload file to storage
 * @param {Object} file - Multer file object
 * @param {string} folder - Destination folder
 * @returns {Promise<string>} - URL of uploaded file
 */
async function uploadToStorage(file, folder = '') {
  try {
    // Generate unique filename
    const fileExt = path.extname(file.originalname);
    const fileName = `${crypto.randomBytes(16).toString('hex')}${fileExt}`;
    const filePath = path.join(UPLOAD_DIR, folder, fileName);

    // Ensure directory exists
    await fs.mkdir(path.dirname(filePath), { recursive: true });

    // Write file
    await fs.writeFile(filePath, file.buffer);

    // Return URL (in production, this would be a CDN URL)
    const baseUrl = process.env.BASE_URL || 'http://localhost:3001';
    return `${baseUrl}/uploads/${folder}/${fileName}`;
  } catch (error) {
    console.error('Upload error:', error);
    throw new Error('Failed to upload file');
  }
}

/**
 * Delete file from storage
 * @param {string} fileUrl - URL of file to delete
 */
async function deleteFromStorage(fileUrl) {
  try {
    // Extract file path from URL
    const urlPath = new URL(fileUrl).pathname;
    const filePath = path.join(UPLOAD_DIR, urlPath.replace('/uploads/', ''));

    await fs.unlink(filePath);
  } catch (error) {
    console.error('Delete error:', error);
    // Don't throw - file might not exist
  }
}

/**
 * Validate file type
 * @param {Object} file - Multer file object
 * @param {Array<string>} allowedTypes - Allowed MIME types
 * @returns {boolean}
 */
function validateFileType(file, allowedTypes = ['image/jpeg', 'image/png', 'image/webp']) {
  return allowedTypes.includes(file.mimetype);
}

/**
 * Validate file size
 * @param {Object} file - Multer file object
 * @param {number} maxSize - Maximum size in bytes
 * @returns {boolean}
 */
function validateFileSize(file, maxSize = 5 * 1024 * 1024) { // 5MB default
  return file.size <= maxSize;
}

module.exports = {
  initializeStorage,
  uploadToStorage,
  deleteFromStorage,
  validateFileType,
  validateFileSize,
};
