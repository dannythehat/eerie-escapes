/**
 * Image optimization utilities for Eerie Escapes
 */

/**
 * Generate optimized image URL with transformations
 * @param {string} url - Original image URL
 * @param {Object} options - Transformation options
 * @returns {string} - Optimized image URL
 */
export function getOptimizedImageUrl(url, options = {}) {
  const {
    width,
    height,
    quality = 80,
    format = 'webp',
  } = options;

  // For Unsplash images, use their transformation API
  if (url.includes('unsplash.com')) {
    const params = new URLSearchParams();
    if (width) params.append('w', width);
    if (height) params.append('h', height);
    if (quality) params.append('q', quality);
    params.append('fm', format);
    params.append('fit', 'crop');
    
    return `${url}&${params.toString()}`;
  }

  // For other images, return as-is (Next.js Image component will optimize)
  return url;
}

/**
 * Generate srcset for responsive images
 * @param {string} url - Original image URL
 * @param {Array<number>} widths - Array of widths for srcset
 * @returns {string} - srcset string
 */
export function generateSrcSet(url, widths = [640, 750, 828, 1080, 1200, 1920]) {
  return widths
    .map(width => {
      const optimizedUrl = getOptimizedImageUrl(url, { width });
      return `${optimizedUrl} ${width}w`;
    })
    .join(', ');
}

/**
 * Get blur data URL for image placeholder
 * @param {string} url - Original image URL
 * @returns {string} - Blur data URL
 */
export function getBlurDataUrl(url) {
  // Generate a tiny blurred version for placeholder
  return getOptimizedImageUrl(url, {
    width: 10,
    quality: 10,
    format: 'webp',
  });
}

/**
 * Preload critical images
 * @param {Array<string>} urls - Array of image URLs to preload
 */
export function preloadImages(urls) {
  if (typeof window === 'undefined') return;

  urls.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = url;
    document.head.appendChild(link);
  });
}

/**
 * Lazy load images with Intersection Observer
 * @param {HTMLElement} element - Image element to lazy load
 * @param {string} src - Image source URL
 */
export function lazyLoadImage(element, src) {
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          element.src = src;
          element.classList.add('loaded');
          observer.unobserve(element);
        }
      });
    });

    observer.observe(element);
  } else {
    // Fallback for browsers without Intersection Observer
    element.src = src;
  }
}

/**
 * Image loading priorities
 */
export const ImagePriority = {
  HIGH: 'high',
  LOW: 'low',
  AUTO: 'auto',
};

/**
 * Get image dimensions from URL (for aspect ratio)
 * @param {string} url - Image URL
 * @returns {Promise<{width: number, height: number}>}
 */
export async function getImageDimensions(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.width, height: img.height });
    };
    img.onerror = reject;
    img.src = url;
  });
}

/**
 * Convert image to WebP format (client-side)
 * @param {File} file - Image file
 * @param {number} quality - Quality (0-1)
 * @returns {Promise<Blob>}
 */
export async function convertToWebP(file, quality = 0.8) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const img = new Image();
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        
        canvas.toBlob(
          (blob) => resolve(blob),
          'image/webp',
          quality
        );
      };
      
      img.onerror = reject;
      img.src = e.target.result;
    };
    
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
