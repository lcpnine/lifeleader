import { MandalaTheme } from '@/constants/mandalaThemes'
import { useTheme } from '@/contexts/theme/ThemeContext'

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
  const { setTheme } = useTheme()
  const mandalaThemes = Object.values(MandalaTheme)

  return (
    <div className="text-center p-4">
      <p className="mb-4 font-semibold">
        Select a theme to personalize your Mandala Chart
      </p>
      <div className="flex justify-center space-x-2">
        {mandalaThemes.map(themeName => (
          <button
            key={themeName}
            onClick={() => setTheme(themeName)}
            className="flex items-center justify-center px-4 py-2 border rounded hover:bg-gray-100 transition duration-300"
            title={themeName}
          >
            {themeIcons[themeName]} <span className="ml-2">{themeName}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default MandalaThemeSelector
