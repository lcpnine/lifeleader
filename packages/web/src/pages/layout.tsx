import Footer from '@/components/Layout/Footer'
import Header from '@/components/Layout/Header'
import { SCREENSHOT_ROOT_ID } from '@/hooks/useScreenshot'
import { Analytics } from '@vercel/analytics/react'
import { ReactNode } from 'react'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 tracking-[-1px]">
      <Header />
      <main className="max-w-[720px]">{children}</main>
      <Footer />
      <div id="modal-root"></div>
      <div
        id={SCREENSHOT_ROOT_ID}
        className="absolute hidden left-[9999px]"
      ></div>
      <Analytics />
    </div>
  )
}

export default Layout
