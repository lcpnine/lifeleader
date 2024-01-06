import { useTheme } from '@/contexts/theme/ThemeContext'

interface Props {
  value: string
  onChange: (newValue: string) => void
  isGridValid: boolean
  gridIndex: number
  squareIndex: number
}

const getPlaceHolder = (
  isCenterGrid: boolean,
  isCenterSquare: boolean,
  gridIndex: number,
  squareIndex: number
) => {
  if (isCenterGrid && isCenterSquare) return 'Main Goal'
  if (isCenterGrid && !isCenterSquare)
    return `Sub Goal ${squareIndex < 4 ? squareIndex + 1 : squareIndex}`
  if (!isCenterGrid && isCenterSquare)
    return `Sub Goal ${gridIndex < 4 ? gridIndex + 1 : gridIndex}`
  return ''
}

const Square = ({
  value,
  onChange,
  isGridValid,
  gridIndex,
  squareIndex,
}: Props) => {
  const isCenterGrid = gridIndex === 4
  const isCenterSquare = squareIndex === 4
  const { themeStyle } = useTheme()

  const textBold = isCenterSquare ? 'font-bold' : ''

  const textColor = !isCenterSquare
    ? themeStyle.defualtTextColor
    : isCenterGrid
      ? themeStyle.centerGridCenterSquareTextColor
      : themeStyle.edgeGridCenterSquareTextColor

  const placeHolder = getPlaceHolder(
    isCenterGrid,
    isCenterSquare,
    gridIndex,
    squareIndex
  )

  return (
    <div
      className={`w-24 h-24 border ${themeStyle.borderColor} flex items-center justify-center`}
    >
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        className={`w-full h-full text-center ${textColor} ${textBold} ${
          themeStyle.backgroundColor
        } ${isGridValid ? '' : 'bg-opacity-25'}`}
        placeholder={placeHolder}
      />
    </div>
  )
}

export default Square
