import Footer from '@/components/Footer/Footer'
import Header from '@/components/Header/Header'
import { Analytics } from '@vercel/analytics/react'
import { ReactNode } from 'react'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Header />
      <main>{children}</main>
      <Footer />
      <div id="modal-root"></div>
      <Analytics />
    </div>
  )
}

export default Layout
