import { ThemeProvider } from '@/contexts/theme/ThemeContext'
import type { AppProps } from 'next/app'
import './globals.css'
import Layout from './layout'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  )
}

export default App
