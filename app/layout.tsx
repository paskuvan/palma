import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SOS Sordo',
  description: 'App de emergencias para la comunidad sorda en Chile',
  themeColor: '#D85A30',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
