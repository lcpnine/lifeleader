import { useEntryContext } from '@/contexts/EntryContext'
import { useTheme } from '@/contexts/ThemeContext'
import useI18n from '@/hooks/useI18n'
import TRANSLATIONS from './Square.i18n'

interface Props {
  value: string
  handleGridValue: (
    gridIndex: number,
    squareIndex: number,
    newValue: string
  ) => void
  handleDoubleClick?: () => void
  isGridValid: boolean
  gridIndex: number
  squareIndex: number
}

const Square = ({
  value,
  handleGridValue,
  handleDoubleClick = () => {},
  isGridValid,
  gridIndex,
  squareIndex,
}: Props) => {
  const isCenterGrid = gridIndex === 4
  const isCenterSquare = squareIndex === 4
  const { themeStyle } = useTheme()
  const { getTranslation } = useI18n()
  const { isMobile } = useEntryContext()
  const translation = getTranslation(TRANSLATIONS)

  const textBold = isCenterSquare ? 'font-bold' : ''

  const textColor = !isCenterSquare
    ? themeStyle.defualtTextColor
    : isCenterGrid
      ? themeStyle.centerGridCenterSquareTextColor
      : themeStyle.edgeGridCenterSquareTextColor

  const getPlaceHolder = (
    isCenterGrid: boolean,
    isCenterSquare: boolean,
    gridIndex: number,
    squareIndex: number
  ) => {
    if (isCenterGrid && isCenterSquare) return translation('mainGoal')
    if (isCenterGrid && !isCenterSquare)
      return `${translation('subGoal')} ${
        squareIndex < 4 ? squareIndex + 1 : squareIndex
      }`
    if (!isCenterGrid && isCenterSquare)
      return `${translation('subGoal')} ${
        gridIndex < 4 ? gridIndex + 1 : gridIndex
      }`
    return ''
  }

  const placeHolder = getPlaceHolder(
    isCenterGrid,
    isCenterSquare,
    gridIndex,
    squareIndex
  )

  const handleSpanChange: React.ChangeEventHandler<HTMLSpanElement> = e => {
    handleGridValue(gridIndex, squareIndex, e.target.innerText)
  }

  const onBlurSpan: React.FocusEventHandler<HTMLSpanElement> = e => {
    handleGridValue(gridIndex, squareIndex, e.target.innerText.trim())
  }

  return (
    <div
      className={`${isMobile ? 'size-16' : 'size-24'} border ${
        themeStyle.borderColor
      } flex items-center justify-center overflow-hidden ${
        themeStyle.backgroundColor
      } ${isGridValid ? '' : 'bg-opacity-25 pointer-events-none'} ${
        isGridValid && !isCenterGrid && isCenterSquare
          ? 'pointer-events-none'
          : ''
      }`}
    >
      <span
        contentEditable={isGridValid && !(!isCenterGrid && isCenterSquare)}
        suppressContentEditableWarning
        onDoubleClick={handleDoubleClick}
        onChange={handleSpanChange}
        onBlur={onBlurSpan}
        className={`w-full max-h-${
          isMobile ? '16' : '24'
        } text-center ${textColor} ${textBold} p-0 cursor-text inline-block focus:outline-none`}
        data-placeholder={placeHolder}
        style={{ whiteSpace: 'pre-wrap' }}
      >
        {value}
      </span>
    </div>
  )
}

export default Square
