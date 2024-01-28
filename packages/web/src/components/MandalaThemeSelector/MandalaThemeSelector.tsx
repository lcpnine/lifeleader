import { MandalaTheme } from '@/constants/mandalaChart'
import { useTheme } from '@/contexts/ThemeContext'
import useI18n from '@/hooks/useI18n'
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
  const translate = getTranslation(TRANSLATIONS)
  const mandalaThemes = Object.values(MandalaTheme)
  const options = mandalaThemes.map(mandalaTheme => ({
    value: mandalaTheme,
    label: `${themeIcons[mandalaTheme as MandalaTheme]}  ${mandalaTheme}`,
  }))

  return (
    <div className="relative flex flex-col items-center justify-center h-max">
      <label
        htmlFor="theme"
        className="flex flex-col items-center mb-4 text-gray-700"
      >
        <p className="font-semibold mb-1 text-center">
          {translate('Description')}
        </p>
        <p className="text-xs italic text-center">
          {translate('SmallDescription')}
        </p>
      </label>
      <select
        name="theme"
        className="w-48 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        value={theme}
        onChange={e => setTheme(e.target.value as MandalaTheme)}
      >
        {options.map(({ value, label }) => (
          <option key={value} value={value} className="text-gray-700">
            {label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default MandalaThemeSelector
