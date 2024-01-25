import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toast } from '@/components/Toast' 

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Movie Searcher 3000',
  description: 'Next.js Web App that lets user search for movies.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>  <Toast /> {children}</body>
    </html>
  )
}
