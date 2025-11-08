/**
 * Performance Monitoring Utilities
 * Tracks Core Web Vitals and custom metrics
 */

export interface PerformanceMetric {
  name: string
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
  delta?: number
  id?: string
  navigationType?: string
}

// Core Web Vitals thresholds
const THRESHOLDS = {
  LCP: { good: 2500, poor: 4000 }, // Largest Contentful Paint
  FID: { good: 100, poor: 300 }, // First Input Delay
  CLS: { good: 0.1, poor: 0.25 }, // Cumulative Layout Shift
  FCP: { good: 1800, poor: 3000 }, // First Contentful Paint
  TTFB: { good: 800, poor: 1800 }, // Time to First Byte
  INP: { good: 200, poor: 500 }, // Interaction to Next Paint
}

/**
 * Get rating based on value and thresholds
 */
function getRating(value: number, thresholds: { good: number; poor: number }): 'good' | 'needs-improvement' | 'poor' {
  if (value <= thresholds.good) return 'good'
  if (value <= thresholds.poor) return 'needs-improvement'
  return 'poor'
}

/**
 * Report metric to analytics
 */
function reportMetric(metric: PerformanceMetric) {
  // Send to analytics service (Google Analytics, custom endpoint, etc.)
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', metric.name, {
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      metric_id: metric.id,
      metric_value: metric.value,
      metric_delta: metric.delta,
      metric_rating: metric.rating,
    })
  }

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`📊 ${metric.name}:`, {
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
    })
  }

  // Send to custom analytics endpoint
  if (process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT) {
    fetch(process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(metric),
      keepalive: true,
    }).catch((err) => console.error('Analytics error:', err))
  }
}

/**
 * Measure Largest Contentful Paint (LCP)
 */
export function measureLCP() {
  if (typeof window === 'undefined') return

  try {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      const lastEntry = entries[entries.length - 1] as any

      const metric: PerformanceMetric = {
        name: 'LCP',
        value: lastEntry.renderTime || lastEntry.loadTime,
        rating: getRating(lastEntry.renderTime || lastEntry.loadTime, THRESHOLDS.LCP),
        id: lastEntry.id,
      }

      reportMetric(metric)
    })

    observer.observe({ type: 'largest-contentful-paint', buffered: true })
  } catch (err) {
    console.error('LCP measurement error:', err)
  }
}

/**
 * Measure First Input Delay (FID)
 */
export function measureFID() {
  if (typeof window === 'undefined') return

  try {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      const firstInput = entries[0] as any

      const metric: PerformanceMetric = {
        name: 'FID',
        value: firstInput.processingStart - firstInput.startTime,
        rating: getRating(firstInput.processingStart - firstInput.startTime, THRESHOLDS.FID),
        id: firstInput.id,
      }

      reportMetric(metric)
    })

    observer.observe({ type: 'first-input', buffered: true })
  } catch (err) {
    console.error('FID measurement error:', err)
  }
}

/**
 * Measure Cumulative Layout Shift (CLS)
 */
export function measureCLS() {
  if (typeof window === 'undefined') return

  try {
    let clsValue = 0
    let clsEntries: any[] = []

    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries() as any[]) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value
          clsEntries.push(entry)
        }
      }

      const metric: PerformanceMetric = {
        name: 'CLS',
        value: clsValue,
        rating: getRating(clsValue, THRESHOLDS.CLS),
      }

      reportMetric(metric)
    })

    observer.observe({ type: 'layout-shift', buffered: true })
  } catch (err) {
    console.error('CLS measurement error:', err)
  }
}

/**
 * Measure First Contentful Paint (FCP)
 */
export function measureFCP() {
  if (typeof window === 'undefined') return

  try {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      const fcpEntry = entries[0] as any

      const metric: PerformanceMetric = {
        name: 'FCP',
        value: fcpEntry.startTime,
        rating: getRating(fcpEntry.startTime, THRESHOLDS.FCP),
      }

      reportMetric(metric)
    })

    observer.observe({ type: 'paint', buffered: true })
  } catch (err) {
    console.error('FCP measurement error:', err)
  }
}

/**
 * Measure Time to First Byte (TTFB)
 */
export function measureTTFB() {
  if (typeof window === 'undefined') return

  try {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      const navigationEntry = entries[0] as any

      const ttfb = navigationEntry.responseStart - navigationEntry.requestStart

      const metric: PerformanceMetric = {
        name: 'TTFB',
        value: ttfb,
        rating: getRating(ttfb, THRESHOLDS.TTFB),
        navigationType: navigationEntry.type,
      }

      reportMetric(metric)
    })

    observer.observe({ type: 'navigation', buffered: true })
  } catch (err) {
    console.error('TTFB measurement error:', err)
  }
}

/**
 * Initialize all Core Web Vitals measurements
 */
export function initPerformanceMonitoring() {
  if (typeof window === 'undefined') return

  measureLCP()
  measureFID()
  measureCLS()
  measureFCP()
  measureTTFB()

  console.log('📊 Performance monitoring initialized')
}

/**
 * Custom performance marker
 */
export function markPerformance(name: string) {
  if (typeof window === 'undefined') return

  try {
    performance.mark(name)
  } catch (err) {
    console.error('Performance mark error:', err)
  }
}

/**
 * Measure custom performance metric
 */
export function measurePerformance(name: string, startMark: string, endMark?: string) {
  if (typeof window === 'undefined') return

  try {
    if (endMark) {
      performance.measure(name, startMark, endMark)
    } else {
      performance.measure(name, startMark)
    }

    const measure = performance.getEntriesByName(name)[0]
    
    const metric: PerformanceMetric = {
      name,
      value: measure.duration,
      rating: 'good', // Custom metrics don't have standard thresholds
    }

    reportMetric(metric)

    return measure.duration
  } catch (err) {
    console.error('Performance measure error:', err)
    return 0
  }
}

/**
 * Get all performance entries
 */
export function getPerformanceEntries() {
  if (typeof window === 'undefined') return []

  return performance.getEntries()
}

/**
 * Clear performance entries
 */
export function clearPerformanceEntries() {
  if (typeof window === 'undefined') return

  performance.clearMarks()
  performance.clearMeasures()
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    gtag?: (...args: any[]) => void
  }
}
