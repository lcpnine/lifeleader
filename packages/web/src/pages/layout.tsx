import Footer from '@/components/Footer/Footer'
import { ReactNode } from 'react'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout