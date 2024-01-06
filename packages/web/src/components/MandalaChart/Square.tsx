import { useTheme } from '@/contexts/theme/ThemeContext'

interface Props {
  value: string
  onChange: (newValue: string) => void
  isCenterGrid: boolean
  isCenterSquare: boolean
}

const Square = ({ value, onChange, isCenterGrid, isCenterSquare }: Props) => {
  const { themeStyle } = useTheme()

  const textBold = isCenterSquare ? 'font-bold' : ''

  const textColor = !isCenterSquare
    ? themeStyle.defualtTextColor
    : isCenterGrid
      ? themeStyle.centerGridCenterSquareTextColor
      : themeStyle.edgeGridCenterSquareTextColor

  return (
    <div
      className={`w-24 h-24 border ${themeStyle.borderColor} flex items-center justify-center`}
    >
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        className={`w-full h-full text-center ${textColor} ${textBold} ${themeStyle.backgroundColor}`}
      />
    </div>
  )
}

export default Square
