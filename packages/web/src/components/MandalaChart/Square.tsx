import { useEntryContext } from '@/contexts/EntryContext'
import { useTheme } from '@/contexts/ThemeContext'
import useI18n from '@/hooks/useI18n'
import { useEffect, useRef, useState } from 'react'
import DisplayingSquare from './DisplayingSquare'
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

  const handleTextAreaChange: React.ChangeEventHandler<
    HTMLTextAreaElement
  > = e => {
    handleGridValue(gridIndex, squareIndex, e.target.value)
  }
  // change to DisplayingSquare when it is clicked
  const [isClicked, setIsClicked] = useState(false)

  const onBlurTextArea: React.FocusEventHandler<HTMLTextAreaElement> = e => {
    handleGridValue(gridIndex, squareIndex, e.target.value.trim())
    setIsClicked(false)
  }

  const handleClick = () => {
    setIsClicked(true)
  }

  const ref = useRef<HTMLTextAreaElement>(null)
  useEffect(() => {
    if (isClicked) {
      const textarea = ref.current as HTMLTextAreaElement
      textarea.focus()
    }
  }, [isClicked])

  return (
    <div onClick={handleClick}>
      {isClicked ? (
        <div
          className={`${isMobile ? 'size-20' : 'size-24'} border ${
            themeStyle.borderColor
          } flex items-center justify-center overflow-hidden ${
            isGridValid ? '' : 'pointer-events-none'
          } ${
            isGridValid && !isCenterGrid && isCenterSquare
              ? 'pointer-events-none'
              : ''
          }`}
        >
          <textarea
            value={value}
            ref={ref}
            onChange={handleTextAreaChange}
            onBlur={onBlurTextArea}
            onDoubleClick={handleDoubleClick}
            disabled={!isGridValid || (!isCenterGrid && isCenterSquare)}
            className={`w-full h-full text-center ${textColor} ${textBold} 
          ${themeStyle.backgroundColor} p-0 cursor-text resize-none
          overflow-auto focus:outline-none ${
            isGridValid ? '' : 'bg-opacity-25'
          }`}
            style={{ whiteSpace: 'pre-wrap' }}
          />
        </div>
      ) : (
        <DisplayingSquare
          value={value}
          gridIndex={gridIndex}
          squareIndex={squareIndex}
          placeHolder={placeHolder}
        />
      )}
    </div>
  )
}

export default Square
