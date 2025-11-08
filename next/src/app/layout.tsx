import type { Metadata } from 'next'
import { Inter, Roboto_Slab } from 'next/font/google'
import '../styles/globals.scss'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ChatBot from '@/components/ChatBot'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const robotoSlab = Roboto_Slab({
  subsets: ['latin'],
  variable: '--font-roboto-slab',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Tienda XCP - Equipos y Soluciones para Construcción',
  description: 'XCP (Xtreme Construction Products) - Tienda especializada en equipos para construcción, minería, agroindustria y sistemas hidráulicos.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es-CO">
      <body className={`${inter.variable} ${robotoSlab.variable}`}>
        <div id="app">
          <Header />
          <main className="main-content">{children}</main>
          <Footer />
          <ChatBot />
        </div>
      </body>
    </html>
  )
}
