import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Eerie Escapes - Where Travel Meets Terror',
  description: 'Experience the world\'s most spine-chilling holidays and morbid vacations. From haunted tours to paranormal investigations.',
  keywords: ['horror travel', 'haunted tours', 'dark tourism', 'paranormal experiences', 'scary vacations'],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
