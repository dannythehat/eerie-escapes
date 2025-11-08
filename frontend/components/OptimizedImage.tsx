import Image, { ImageProps } from 'next/image'
import { useState } from 'react'

interface OptimizedImageProps extends Omit<ImageProps, 'src'> {
  src: string
  alt: string
  fallbackSrc?: string
  aspectRatio?: string
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
}

/**
 * Optimized Image Component with:
 * - Automatic WebP conversion
 * - Lazy loading
 * - Blur placeholder
 * - Error fallback
 * - Responsive sizing
 */
export function OptimizedImage({
  src,
  alt,
  fallbackSrc = '/images/placeholder.jpg',
  aspectRatio,
  objectFit = 'cover',
  className = '',
  priority = false,
  quality = 85,
  ...props
}: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [isLoading, setIsLoading] = useState(true)

  const handleError = () => {
    console.error(`Failed to load image: ${src}`)
    setImgSrc(fallbackSrc)
  }

  const handleLoad = () => {
    setIsLoading(false)
  }

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      <Image
        src={imgSrc}
        alt={alt}
        fill={!props.width && !props.height}
        quality={quality}
        loading={priority ? undefined : 'lazy'}
        priority={priority}
        onError={handleError}
        onLoad={handleLoad}
        className={`
          transition-opacity duration-300
          ${isLoading ? 'opacity-0' : 'opacity-100'}
          ${objectFit === 'cover' ? 'object-cover' : ''}
          ${objectFit === 'contain' ? 'object-contain' : ''}
        `}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAB//2Q=="
        {...props}
      />
      {isLoading && (
        <div className="absolute inset-0 bg-gray-800 animate-pulse" />
      )}
    </div>
  )
}

/**
 * Generate srcset for responsive images
 */
export function generateSrcSet(src: string, widths: number[] = [640, 750, 828, 1080, 1200, 1920, 2048, 3840]) {
  return widths
    .map((width) => {
      const url = new URL(src, 'https://eerie-escapes.vercel.app')
      url.searchParams.set('w', width.toString())
      url.searchParams.set('q', '85')
      return `${url.toString()} ${width}w`
    })
    .join(', ')
}

/**
 * Convert image URL to WebP format
 */
export function toWebP(src: string): string {
  if (src.startsWith('data:')) return src
  
  const url = new URL(src, 'https://eerie-escapes.vercel.app')
  url.searchParams.set('format', 'webp')
  return url.toString()
}

/**
 * Get optimized image URL with specific dimensions
 */
export function getOptimizedImageUrl(
  src: string,
  options: {
    width?: number
    height?: number
    quality?: number
    format?: 'webp' | 'jpeg' | 'png'
  } = {}
): string {
  const { width, height, quality = 85, format = 'webp' } = options
  
  const url = new URL(src, 'https://eerie-escapes.vercel.app')
  
  if (width) url.searchParams.set('w', width.toString())
  if (height) url.searchParams.set('h', height.toString())
  url.searchParams.set('q', quality.toString())
  url.searchParams.set('format', format)
  
  return url.toString()
}

/**
 * Preload critical images
 */
export function preloadImage(src: string, priority: 'high' | 'low' = 'high') {
  if (typeof window === 'undefined') return

  const link = document.createElement('link')
  link.rel = 'preload'
  link.as = 'image'
  link.href = src
  link.fetchPriority = priority
  document.head.appendChild(link)
}

/**
 * Lazy load images with Intersection Observer
 */
export function useLazyLoad(threshold = 0.1) {
  const [isVisible, setIsVisible] = useState(false)
  const [node, setNode] = useState<HTMLElement | null>(null)

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
        if (node) observer.unobserve(node)
      }
    },
    { threshold }
  )

  const ref = (element: HTMLElement | null) => {
    if (element) {
      setNode(element)
      observer.observe(element)
    }
  }

  return { ref, isVisible }
}
