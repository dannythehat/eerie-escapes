import { render, screen } from '@testing-library/react'
import { Navigation } from '@/components/layout/Navigation'

// Mock usePathname
jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}))

describe('Navigation', () => {
  it('renders all navigation links', () => {
    render(<Navigation />)
    
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Holidays')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Partners')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })

  it('renders sign in button', () => {
    render(<Navigation />)
    
    const signInButton = screen.getByText('Sign In')
    expect(signInButton).toBeInTheDocument()
  })

  it('applies mobile styles when mobile prop is true', () => {
    render(<Navigation mobile />)
    
    const nav = screen.getByRole('navigation')
    expect(nav).toHaveClass('space-y-1')
  })
})
