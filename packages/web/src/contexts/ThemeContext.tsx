import { MANDALA_THEMES, MandalaTheme } from '@/constants/mandalaChart'
import { ReactNode, createContext, useContext, useState } from 'react'

const DefaultThemeContext = {
  theme: MandalaTheme.DEFAULT,
  setTheme: (theme: MandalaTheme) => {},
  themeStyle: MANDALA_THEMES[MandalaTheme.DEFAULT],
}

const ThemeContext = createContext(DefaultThemeContext)

export const useTheme = () => useContext(ThemeContext)

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState(MandalaTheme.DEFAULT)

  const value = {
    theme,
    setTheme,
    themeStyle: MANDALA_THEMES[theme],
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
