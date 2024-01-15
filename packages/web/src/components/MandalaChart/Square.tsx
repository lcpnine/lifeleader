import { useEntryContext } from '@/contexts/EntryContext'
import { useTheme } from '@/contexts/ThemeContext'
import { useEffect, useRef, useState } from 'react'

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
  placeHolder: string
}

const Square = ({
  value,
  handleGridValue,
  handleDoubleClick = () => {},
  isGridValid,
  gridIndex,
  squareIndex,
  placeHolder,
}: Props) => {
  const isCenterGrid = gridIndex === 4
  const isCenterSquare = squareIndex === 4
  const { themeStyle } = useTheme()
  const { isMobile } = useEntryContext()

  const textBold = isCenterSquare ? 'font-bold' : ''

  const textColor = !isCenterSquare
    ? themeStyle.defualtTextColor
    : isCenterGrid
      ? themeStyle.centerGridCenterSquareTextColor
      : themeStyle.edgeGridCenterSquareTextColor

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
        <div
          className={`${isMobile ? 'size-20' : 'size-24'} border ${
            themeStyle.borderColor
          } flex items-center justify-center overflow-hidden ${
            themeStyle.backgroundColor
          } ${isGridValid ? 'cursor-text' : 'bg-opacity-25'}`}
        >
          <span
            className={`w-full max-h-${
              isMobile ? '20' : '24'
            } text-center ${textColor} ${textBold} p-0 inline-block focus:outline-none
            ${
              !value && placeHolder
                ? squareIndex === 4
                  ? 'text-opacity-75'
                  : 'text-opacity-25'
                : ''
            }
            `}
            style={{ whiteSpace: 'pre-wrap' }}
          >
            {value ? value : placeHolder}
          </span>
        </div>
      )}
    </div>
  )
}

export default Square
