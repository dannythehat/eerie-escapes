import { Request, Response, NextFunction } from 'express'
import Redis from 'ioredis'

// Initialize Redis client
const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  password: process.env.REDIS_PASSWORD,
  retryStrategy: (times) => {
    const delay = Math.min(times * 50, 2000)
    return delay
  },
})

redis.on('error', (err) => {
  console.error('Redis Client Error:', err)
})

redis.on('connect', () => {
  console.log('✅ Redis connected successfully')
})

// Cache duration constants (in seconds)
export const CACHE_DURATION = {
  SHORT: 60, // 1 minute
  MEDIUM: 300, // 5 minutes
  LONG: 3600, // 1 hour
  DAY: 86400, // 24 hours
  WEEK: 604800, // 7 days
}

/**
 * Cache middleware for Express routes
 */
export function cacheMiddleware(duration: number = CACHE_DURATION.MEDIUM) {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Skip caching for non-GET requests
    if (req.method !== 'GET') {
      return next()
    }

    // Generate cache key from URL and query params
    const cacheKey = `cache:${req.originalUrl || req.url}`

    try {
      // Check if cached data exists
      const cachedData = await redis.get(cacheKey)

      if (cachedData) {
        console.log(`✅ Cache HIT: ${cacheKey}`)
        return res.json(JSON.parse(cachedData))
      }

      console.log(`❌ Cache MISS: ${cacheKey}`)

      // Store original res.json function
      const originalJson = res.json.bind(res)

      // Override res.json to cache the response
      res.json = function (data: any) {
        // Cache the response
        redis.setex(cacheKey, duration, JSON.stringify(data)).catch((err) => {
          console.error('Redis cache set error:', err)
        })

        // Call original json function
        return originalJson(data)
      }

      next()
    } catch (error) {
      console.error('Cache middleware error:', error)
      next()
    }
  }
}

/**
 * Invalidate cache by pattern
 */
export async function invalidateCache(pattern: string): Promise<number> {
  try {
    const keys = await redis.keys(pattern)
    if (keys.length === 0) return 0

    const deleted = await redis.del(...keys)
    console.log(`🗑️  Invalidated ${deleted} cache entries matching: ${pattern}`)
    return deleted
  } catch (error) {
    console.error('Cache invalidation error:', error)
    return 0
  }
}

/**
 * Clear all cache
 */
export async function clearAllCache(): Promise<void> {
  try {
    await redis.flushdb()
    console.log('🗑️  All cache cleared')
  } catch (error) {
    console.error('Clear cache error:', error)
  }
}

/**
 * Get cached data
 */
export async function getCache<T>(key: string): Promise<T | null> {
  try {
    const data = await redis.get(key)
    return data ? JSON.parse(data) : null
  } catch (error) {
    console.error('Get cache error:', error)
    return null
  }
}

/**
 * Set cached data
 */
export async function setCache(key: string, data: any, duration: number = CACHE_DURATION.MEDIUM): Promise<void> {
  try {
    await redis.setex(key, duration, JSON.stringify(data))
  } catch (error) {
    console.error('Set cache error:', error)
  }
}

/**
 * Delete cached data
 */
export async function deleteCache(key: string): Promise<void> {
  try {
    await redis.del(key)
  } catch (error) {
    console.error('Delete cache error:', error)
  }
}

/**
 * Cache decorator for service methods
 */
export function Cacheable(duration: number = CACHE_DURATION.MEDIUM) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value

    descriptor.value = async function (...args: any[]) {
      const cacheKey = `method:${target.constructor.name}:${propertyKey}:${JSON.stringify(args)}`

      // Try to get from cache
      const cached = await getCache(cacheKey)
      if (cached) {
        console.log(`✅ Method cache HIT: ${propertyKey}`)
        return cached
      }

      console.log(`❌ Method cache MISS: ${propertyKey}`)

      // Execute original method
      const result = await originalMethod.apply(this, args)

      // Cache the result
      await setCache(cacheKey, result, duration)

      return result
    }

    return descriptor
  }
}

/**
 * Rate limiting with Redis
 */
export async function checkRateLimit(
  identifier: string,
  maxRequests: number = 100,
  windowSeconds: number = 60
): Promise<{ allowed: boolean; remaining: number; resetAt: number }> {
  const key = `ratelimit:${identifier}`

  try {
    const current = await redis.incr(key)

    if (current === 1) {
      await redis.expire(key, windowSeconds)
    }

    const ttl = await redis.ttl(key)
    const resetAt = Date.now() + ttl * 1000

    return {
      allowed: current <= maxRequests,
      remaining: Math.max(0, maxRequests - current),
      resetAt,
    }
  } catch (error) {
    console.error('Rate limit check error:', error)
    return { allowed: true, remaining: maxRequests, resetAt: Date.now() + windowSeconds * 1000 }
  }
}

/**
 * Session storage with Redis
 */
export class RedisSessionStore {
  private prefix = 'session:'

  async get(sessionId: string): Promise<any | null> {
    return getCache(`${this.prefix}${sessionId}`)
  }

  async set(sessionId: string, data: any, duration: number = CACHE_DURATION.DAY): Promise<void> {
    await setCache(`${this.prefix}${sessionId}`, data, duration)
  }

  async destroy(sessionId: string): Promise<void> {
    await deleteCache(`${this.prefix}${sessionId}`)
  }

  async touch(sessionId: string, duration: number = CACHE_DURATION.DAY): Promise<void> {
    const data = await this.get(sessionId)
    if (data) {
      await this.set(sessionId, data, duration)
    }
  }
}

export const sessionStore = new RedisSessionStore()

export default redis
