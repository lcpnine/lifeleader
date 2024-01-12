import { useEntryContext } from '@/contexts/EntryContext'
import { useTheme } from '@/contexts/ThemeContext'

interface Props {
  value: string
  gridIndex: number
  squareIndex: number
  placeHolder?: string
}

const DisplayingSquare = ({
  value,
  gridIndex,
  squareIndex,
  placeHolder = '',
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

  return (
    <div
      className={`${isMobile ? 'size-20' : 'size-24'} border ${
        themeStyle.borderColor
      } flex items-center justify-center overflow-hidden ${
        themeStyle.backgroundColor
      }`}
    >
      <span
        className={`w-full max-h-${
          isMobile ? '20' : '24'
        } text-center ${textColor} ${textBold} p-0 cursor-text inline-block focus:outline-none
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
  )
}

export default DisplayingSquare
