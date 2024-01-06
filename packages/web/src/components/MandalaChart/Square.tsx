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

  const handleSpanChange: React.ChangeEventHandler<HTMLSpanElement> = e => {
    onChange(e.target.innerText)
  }

  const onBlurSpan: React.FocusEventHandler<HTMLSpanElement> = e => {
    onChange(e.target.innerText.trim())
  }

  return (
    <div
      className={`w-24 h-24 border ${
        themeStyle.borderColor
      } flex items-center justify-center ${themeStyle.backgroundColor} ${
        isGridValid ? '' : 'bg-opacity-25'
      }`}
    >
      <span
        contentEditable
        suppressContentEditableWarning
        onChange={handleSpanChange}
        onBlur={onBlurSpan}
        className={`w-full max-h-24 text-center ${textColor} ${textBold} p-0 cursor-text inline-block`}
        data-placeholder={placeHolder}
        style={{ whiteSpace: 'pre-wrap' }}
      >
        {value}
      </span>
    </div>
  )
}

export default Square
