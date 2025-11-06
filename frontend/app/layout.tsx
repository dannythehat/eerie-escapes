import type { Metadata } from 'next'
import { Inter, Creepster } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const creepster = Creepster({ 
  weight: '400',
  subsets: ['latin'], 
  variable: '--font-creepster' 
})

export const metadata: Metadata = {
  title: 'Eerie Escapes - Where Travel Meets Terror',
  description: 'Experience the world\'s most spine-chilling holidays and morbid vacations. From haunted tours to macabre festivals, discover unforgettable scare-cations worldwide.',
  keywords: ['horror travel', 'haunted tours', 'scary vacations', 'macabre festivals', 'paranormal experiences'],
  authors: [{ name: 'Eerie Escapes' }],
  openGraph: {
    title: 'Eerie Escapes - Where Travel Meets Terror',
    description: 'Experience the world\'s most spine-chilling holidays and morbid vacations.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Eerie Escapes',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Eerie Escapes - Where Travel Meets Terror',
    description: 'Experience the world\'s most spine-chilling holidays and morbid vacations.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${creepster.variable} font-sans antialiased`}>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
