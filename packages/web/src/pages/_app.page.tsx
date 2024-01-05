import { ThemeProvider } from '@/contexts/theme/ThemeContext'
import type { AppProps } from 'next/app'
import './globals.css'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default App
