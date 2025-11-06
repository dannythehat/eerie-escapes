'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/holidays', label: 'Holidays' },
  { href: '/about', label: 'About' },
  { href: '/partners', label: 'Partners' },
  { href: '/contact', label: 'Contact' },
]

interface NavigationProps {
  mobile?: boolean
  onNavigate?: () => void
}

export function Navigation({ mobile = false, onNavigate }: NavigationProps) {
  const pathname = usePathname()

  const linkClasses = (isActive: boolean) =>
    cn(
      'transition-colors hover:text-blood-500',
      mobile
        ? 'block py-2 text-base'
        : 'text-sm font-medium',
      isActive
        ? 'text-blood-500'
        : 'text-gray-300'
    )

  return (
    <nav className={mobile ? 'space-y-1' : 'flex items-center space-x-6'}>
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={linkClasses(pathname === item.href)}
          onClick={onNavigate}
        >
          {item.label}
        </Link>
      ))}
      <Link
        href="/auth/signin"
        className={cn(
          'inline-flex items-center justify-center rounded-md bg-blood-600 px-4 py-2 text-sm font-medium text-white hover:bg-blood-700 transition-colors',
          mobile && 'mt-4 w-full'
        )}
        onClick={onNavigate}
      >
        Sign In
      </Link>
    </nav>
  )
}
