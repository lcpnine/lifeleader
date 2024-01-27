import { useEntryContext } from '@/contexts/EntryContext'
import { useTheme } from '@/contexts/ThemeContext'
import useI18n from '@/hooks/useI18n'
import useModal from '@/hooks/useModal'
import TextInputModal from '../Modal/TextInput'
import TRANSLATIONS from './MandalaChart.i18n'

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
  const { getTranslation } = useI18n()
  const translation = getTranslation(TRANSLATIONS)

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
      // TODO: useModal에 들어가는 modalProps가 변경이 되지 않아 open시에 넣어주는 방식으로 우선 적용
      openTextInputModal({ state: value })
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

  const getSquarePlaceHolder = () => {
    if (type === SquareType.DISPLAY) return ''
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

  const placeHolder = getSquarePlaceHolder()

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
          ${isCenterGrid && isCenterSquare && 'main-goal'}
        `}
        style={{ whiteSpace: 'pre-wrap' }}
      >
        {value ? value : placeHolder}
      </span>
      {TextInputModalComponent && <TextInputModalComponent key={value} />}
    </div>
  )
}

export default Square
