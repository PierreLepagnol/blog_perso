import '../styles/globals.css'

import { Header } from '../components/Header'
import NavBar from '@/components/Navbar'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <title>Pierre LEPAGNOL</title>
        <link rel="icon" type="image/x-icon" href="/favicon.png" />
      </head>
      <body>
        <Header />
        <NavBar />
        <div className="px-6">{children}</div>
      </body>
    </html>
  )
}
