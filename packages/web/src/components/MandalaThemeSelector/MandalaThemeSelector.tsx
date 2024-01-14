import { MandalaTheme } from '@/constants/mandalaChart'
import { useEntryContext } from '@/contexts/EntryContext'
import { useTheme } from '@/contexts/ThemeContext'
import useI18n from '@/hooks/useI18n'
import Flicking from '@egjs/react-flicking'
import '@egjs/react-flicking/dist/flicking.css'
import TRANSLATIONS from './MandalaThemeSelector.i18n'

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
  const { getTranslation } = useI18n()
  const { isMobile } = useEntryContext()
  const trasnlate = getTranslation(TRANSLATIONS)
  const mandalaThemes = Object.values(MandalaTheme)

  return (
    <div className="relative flex flex-col items-center justify-center whitespace-nowrap h-max">
      <p className="mb-4 font-semibold">{trasnlate('description')}</p>
      <Flicking
        align="prev"
        bound={false}
        className={`${isMobile ? 'max-w-64' : 'max-w-[32rem]'}`}
        cameraClass="space-x-4"
      >
        {mandalaThemes.map(themeName => {
          const isSelected = themeName === theme
          return (
            <button
              key={themeName + isSelected}
              onClick={() => setTheme(themeName)}
              className={`flex items-center justify-center z-0 px-4 py-2 border rounded transition duration-300 ${
                isSelected ? 'bg-blue-500 text-white' : 'bg-stone-200'
              }`}
              title={themeName}
              aria-selected={isSelected}
            >
              {themeIcons[themeName]} <span className="ml-2">{themeName}</span>
            </button>
          )
        })}
      </Flicking>
    </div>
  )
}

export default MandalaThemeSelector
