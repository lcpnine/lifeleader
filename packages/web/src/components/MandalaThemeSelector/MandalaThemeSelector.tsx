import { MandalaTheme } from '@/constants/mandalaThemes'
import { useTheme } from '@/contexts/theme/ThemeContext'
import Flicking from '@egjs/react-flicking'
import '@egjs/react-flicking/dist/flicking.css'

const themeIcons = {
  [MandalaTheme.DEFAULT]: '🌟',
  [MandalaTheme.DARK]: '🌙',
  [MandalaTheme.LIGHT]: '🌞',
  [MandalaTheme.NATURE]: '🌿',
  [MandalaTheme.FUTURISTIC]: '🚀',
  [MandalaTheme.OCEAN]: '🌊',
  [MandalaTheme.SUNSET]: '🌇',
  [MandalaTheme.SPACE]: '🌌',
  [MandalaTheme.PASTEL]: '🎨',
  [MandalaTheme.MONOCHROME]: '⚫',
}

const MandalaThemeSelector = () => {
  const { theme, setTheme } = useTheme()
  const mandalaThemes = Object.values(MandalaTheme)

  return (
    <div className="flex flex-col items-center justify-center pt-4">
      <p className="mb-4 font-semibold">
        Select a theme to personalize your Mandala Chart
      </p>
      <div className="w-3/4">
        <Flicking align="prev" bound={true}>
          {mandalaThemes.map(themeName => {
            const isSelected = themeName === theme
            return (
              <button
                key={themeName + isSelected}
                onClick={() => setTheme(themeName)}
                className={`mr-2 flex items-center justify-center px-4 py-2 border rounded transition duration-300 ${
                  isSelected ? 'bg-blue-500 text-white' : ''
                }`}
                title={themeName}
                aria-selected={isSelected}
              >
                {themeIcons[themeName]}{' '}
                <span className="ml-2">{themeName}</span>
              </button>
            )
          })}
        </Flicking>
      </div>
    </div>
  )
}

export default MandalaThemeSelector
