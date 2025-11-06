'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Ghost } from 'lucide-react'
import { Navigation } from './Navigation'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-blood-900/20 bg-midnight-900/95 backdrop-blur supports-[backdrop-filter]:bg-midnight-900/80">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <Ghost className="h-8 w-8 text-blood-500 group-hover:text-blood-400 transition-colors" />
            <span className="text-2xl font-bold text-blood-500 font-[family-name:var(--font-creepster)] group-hover:text-blood-400 transition-colors">
              Eerie Escapes
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Navigation />
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-midnight-800 hover:text-blood-500 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-blood-900/20">
            <Navigation mobile onNavigate={() => setMobileMenuOpen(false)} />
          </div>
        )}
      </div>
    </header>
  )
}
