import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import AnimatedBackground from './components/animatedBackground'
import Clock from './components/clock'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Visma GAT Stemplingsskjerm',
  description: 'Visma GAT Stemplingsskjerm',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AnimatedBackground />
        <Clock />
        <div className="content-container">{children}</div>
      </body>
    </html>
  )
}
