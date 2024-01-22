//Author: Torjus A.M
import type { ReactElement, ReactNode } from 'react'
import AnimatedBackground from './animatedBackground'
import Clock from './clock'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>Visma GAT Stemplingsskjerm</title>
      </head>
      <Clock />
      <body>
        <AnimatedBackground />
        {children}
      </body>
    </html>
  )
}
