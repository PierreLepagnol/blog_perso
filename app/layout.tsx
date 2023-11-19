
import { Header } from '@/components/Header'
import NavBar from '@/components/Navbar'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Pierre LEPAGNOL',
  description: 'Mon Super Blog Perso',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <Header />
        <NavBar />
        <div className="px-6">{children}</div>
      </body>
    </html>
  )
}
