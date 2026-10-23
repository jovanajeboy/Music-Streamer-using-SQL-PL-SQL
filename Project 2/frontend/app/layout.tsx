import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'sonicly — your sound, remixed',
  description: 'A colorful music space for discovering tracks, artists, and playlists.',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>
}
