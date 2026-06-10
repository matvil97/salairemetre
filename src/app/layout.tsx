import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SalaireMètre — Estimez votre salaire en France',
  description: 'Obtenez une estimation précise de votre salaire brut annuel en France. Basé sur les données DARES, INSEE et APEC 2023.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={inter.className}>
      <body className="min-h-screen bg-[#080b14] antialiased">{children}</body>
    </html>
  )
}
