import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SalaireMètre — Combien devrait-on réellement vous payer ?',
  description: 'Estimez votre salaire brut annuel en France en 2 minutes. Fourchette précise, conseils de négociation, projection 5 ans. Basé sur les données DARES, INSEE et APEC 2023.',
  openGraph: {
    title: 'SalaireMètre — Combien devrait-on réellement vous payer ?',
    description: 'Estimez votre salaire en 2 minutes. Rapport complet à 3,99€.',
    locale: 'fr_FR',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={inter.className}>
      <body className="min-h-screen bg-[#080b14] antialiased">{children}</body>
    </html>
  )
}
