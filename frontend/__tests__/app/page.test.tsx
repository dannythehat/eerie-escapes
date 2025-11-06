import { render, screen } from '@testing-library/react'
import HomePage from '@/app/page'

describe('HomePage', () => {
  it('renders the main heading', () => {
    render(<HomePage />)
    
    const heading = screen.getByText('Eerie Escapes')
    expect(heading).toBeInTheDocument()
  })

  it('renders the tagline', () => {
    render(<HomePage />)
    
    const tagline = screen.getByText('Where Travel Meets Terror')
    expect(tagline).toBeInTheDocument()
  })

  it('renders the description', () => {
    render(<HomePage />)
    
    const description = screen.getByText(/Experience the world's most spine-chilling holidays/i)
    expect(description).toBeInTheDocument()
  })
})
