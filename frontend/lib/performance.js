/**
 * Performance monitoring and optimization utilities
 */

/**
 * Measure and log Core Web Vitals
 */
export function reportWebVitals(metric) {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(metric);
  }

  // Send to analytics in production
  if (process.env.NODE_ENV === 'production') {
    // TODO: Send to analytics service (Google Analytics, Vercel Analytics, etc.)
    const body = JSON.stringify(metric);
    const url = '/api/analytics';

    // Use `navigator.sendBeacon()` if available, falling back to `fetch()`
    if (navigator.sendBeacon) {
      navigator.sendBeacon(url, body);
    } else {
      fetch(url, { body, method: 'POST', keepalive: true });
    }
  }
}

/**
 * Debounce function for performance optimization
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function}
 */
export function debounce(func, wait = 300) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function for performance optimization
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function}
 */
export function throttle(func, limit = 300) {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Lazy load component with dynamic import
 * @param {Function} importFunc - Dynamic import function
 * @returns {Promise}
 */
export async function lazyLoadComponent(importFunc) {
  const component = await importFunc();
  return component.default || component;
}

/**
 * Prefetch route for faster navigation
 * @param {string} href - Route to prefetch
 */
export function prefetchRoute(href) {
  if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
    requestIdleCallback(() => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = href;
      document.head.appendChild(link);
    });
  }
}

/**
 * Check if user prefers reduced motion
 * @returns {boolean}
 */
export function prefersReducedMotion() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Get connection speed
 * @returns {string} - 'slow', 'medium', or 'fast'
 */
export function getConnectionSpeed() {
  if (typeof navigator === 'undefined' || !navigator.connection) {
    return 'medium';
  }

  const connection = navigator.connection;
  const effectiveType = connection.effectiveType;

  if (effectiveType === 'slow-2g' || effectiveType === '2g') {
    return 'slow';
  } else if (effectiveType === '3g') {
    return 'medium';
  } else {
    return 'fast';
  }
}

/**
 * Optimize animations based on device performance
 * @returns {boolean} - Whether to enable animations
 */
export function shouldEnableAnimations() {
  // Disable animations if user prefers reduced motion
  if (prefersReducedMotion()) return false;

  // Disable animations on slow connections
  if (getConnectionSpeed() === 'slow') return false;

  // Check device memory (if available)
  if (typeof navigator !== 'undefined' && navigator.deviceMemory) {
    // Disable animations on low-memory devices (< 4GB)
    if (navigator.deviceMemory < 4) return false;
  }

  return true;
}

/**
 * Measure page load time
 * @returns {number} - Load time in milliseconds
 */
export function getPageLoadTime() {
  if (typeof window === 'undefined' || !window.performance) return 0;

  const perfData = window.performance.timing;
  return perfData.loadEventEnd - perfData.navigationStart;
}

/**
 * Monitor long tasks (tasks taking > 50ms)
 */
export function monitorLongTasks() {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
    return;
  }

  try {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        console.warn('Long task detected:', {
          duration: entry.duration,
          startTime: entry.startTime,
        });
      }
    });

    observer.observe({ entryTypes: ['longtask'] });
  } catch (e) {
    // PerformanceObserver not supported
  }
}

/**
 * Cache API response
 * @param {string} key - Cache key
 * @param {any} data - Data to cache
 * @param {number} ttl - Time to live in milliseconds
 */
export function cacheData(key, data, ttl = 5 * 60 * 1000) {
  if (typeof window === 'undefined') return;

  const item = {
    data,
    expiry: Date.now() + ttl,
  };

  try {
    localStorage.setItem(key, JSON.stringify(item));
  } catch (e) {
    console.error('Failed to cache data:', e);
  }
}

/**
 * Get cached data
 * @param {string} key - Cache key
 * @returns {any} - Cached data or null
 */
export function getCachedData(key) {
  if (typeof window === 'undefined') return null;

  try {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) return null;

    const item = JSON.parse(itemStr);
    
    // Check if expired
    if (Date.now() > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }

    return item.data;
  } catch (e) {
    console.error('Failed to get cached data:', e);
    return null;
  }
}
