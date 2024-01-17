import { useEntryContext } from '@/contexts/EntryContext'
import { useTheme } from '@/contexts/ThemeContext'
import useModal from '@/hooks/useModal'
import TextInputModal from '../Modal/TextInput'

export enum SquareType {
  DISPLAY = 'DISPLAY',
  MANUAL = 'MANUAL',
  AI = 'AI',
}

export interface DisplaySquareProps {
  type: SquareType.DISPLAY
  value: string
  gridIndex: number
  squareIndex: number
  isGridValid: boolean
}

export interface ManualSquareProps {
  type: SquareType.MANUAL
  value: string
  gridIndex: number
  squareIndex: number
  isGridValid: boolean
  placeHolder?: string
  handleGridValue: (
    gridIndex: number,
    squareIndex: number,
    newValue: string
  ) => void
}

export interface AISquareProps {
  type: SquareType.AI
  value: string
  gridIndex: number
  squareIndex: number
  isGridValid: boolean
  placeHolder?: string
  handleGridValueOnAIMode: (gridIndex: number, squareIndex: number) => void
}

export type SquareProps = DisplaySquareProps | ManualSquareProps | AISquareProps

const Square = (props: SquareProps) => {
  const { type, value, gridIndex, squareIndex, isGridValid } = props

  // ManualSquareProps
  const setSquareValue = (newValue: string) => {
    if (type === SquareType.MANUAL)
      props.handleGridValue(gridIndex, squareIndex, newValue)
  }
  const {
    openModal: openTextInputModal,
    ModalComponent: TextInputModalComponent,
  } = useModal({
    Modal: TextInputModal,
    modalProps: {
      state: value,
      setState: setSquareValue,
    },
  })

  const onClickSquare = () => {
    if (type === SquareType.AI) {
      props.handleGridValueOnAIMode(gridIndex, squareIndex)
    } else {
      openTextInputModal()
    }
  }

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

  const placeHolder =
    type === SquareType.MANUAL || type === SquareType.AI
      ? props.placeHolder
      : ''

  return (
    <div
      className={`${isMobile ? 'size-20' : 'size-24'} border ${
        themeStyle.borderColor
      } flex items-center justify-center overflow-hidden ${
        themeStyle.backgroundColor
      } ${isGridValid ? 'cursor-text' : 'bg-opacity-25'}`}
      onClick={() => onClickSquare()}
    >
      <span
        className={`w-full max-h-${
          isMobile ? '20' : '24'
        } text-center ${textColor} ${textBold} p-0 inline-block focus:outline-none
        ${
          !value && placeHolder !== ''
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
      {TextInputModalComponent && <TextInputModalComponent />}
    </div>
  )
}

export default Square
