import type { Metadata } from 'next'
import './globals.css'
import NavBar from '@/components/NavBar'

export const metadata: Metadata = {
  title: 'Management System',
  description: 'Manage codes and orders efficiently',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className='bg-gray-300'>
        <div className='max-w-7xl mx-auto h-[100vh] flex bg-white'>
          <NavBar />
          <main className='w-full'>{children}</main>
        </div>
      </body>
    </html>
  )
}
